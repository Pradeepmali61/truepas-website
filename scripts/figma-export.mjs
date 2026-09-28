// Usage: FIGMA_TOKEN=xxx node scripts/figma-export.mjs [pageNodeId] [refDir]
import { mkdir, writeFile } from "node:fs/promises";

const FILE_KEY = "jj854H0LwiYxUmxJOO2NxG";
const PAGE_ID = process.argv[2] ?? "506:2836";
const REF_DIR = process.argv[3] ?? "design-ref/enterprises";
const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) throw new Error("Set FIGMA_TOKEN env var");

const api = async (path) => {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(`https://api.figma.com/v1${path}`, { headers: { "X-Figma-Token": TOKEN } });
    if (res.ok) return res.json();
    if (res.status !== 429 && res.status < 500) throw new Error(`${res.status} ${path}`);
    await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
  }
  throw new Error(`Failed ${path}`);
};
const download = async (url, file) => writeFile(file, Buffer.from(await (await fetch(url)).arrayBuffer()));
const slug = (s) => s.toLowerCase().replace(/\[.*?\]/g, "").trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const { nodes } = await api(`/files/${FILE_KEY}/nodes?ids=${PAGE_ID}`);
const page = nodes[PAGE_ID].document;

// Icons: small vector containers without text, deduplicated by name
const icons = new Map();
const walk = (n) => {
  if (n.visible === false) return;
  const b = n.absoluteBoundingBox;
  const small = b && b.width <= 48 && b.height <= 48;
  const container = ["GROUP", "FRAME", "INSTANCE", "BOOLEAN_OPERATION"].includes(n.type);
  const hasText = JSON.stringify(n).includes('"type":"TEXT"');
  if (small && container && !hasText && !n.name.startsWith("Frame")) {
    const name = slug(n.name) || n.id;
    if (!icons.has(name)) icons.set(name, n.id);
    return;
  }
  (n.children ?? []).forEach(walk);
};
walk(page);

await mkdir("public/icons", { recursive: true });
const ids = [...icons.values()];
for (let i = 0; i < ids.length; i += 20) {
  const batch = ids.slice(i, i + 20);
  const { images } = await api(`/images/${FILE_KEY}?ids=${batch.join(",")}&format=svg&svg_outline_text=false`);
  for (const [name, id] of icons) if (images[id]) await download(images[id], `public/icons/${name}.svg`);
}
console.log("icons:", [...icons.keys()].join(", "));

// Image fills (avatars etc.) excluding the checkerboard placeholder
const PLACEHOLDER_REF = "ece298d0ec2c16f10310d45724b276a6035cb503";
const refs = new Set();
const collect = (n) => {
  (n.fills ?? []).forEach((f) => f.type === "IMAGE" && f.imageRef && f.imageRef !== PLACEHOLDER_REF && refs.add(f.imageRef));
  (n.children ?? []).forEach(collect);
};
collect(page);
if (refs.size) {
  await mkdir("public/images", { recursive: true });
  const { meta } = await api(`/files/${FILE_KEY}/images`);
  for (const ref of refs) if (meta.images[ref]) await download(meta.images[ref], `public/images/${ref.slice(0, 10)}.png`);
  console.log("images:", [...refs].map((r) => r.slice(0, 10)).join(", "));
}

// Reference renders for each top-level section
await mkdir(REF_DIR, { recursive: true });
const sections = page.children.filter((c) => c.visible !== false);
const { images } = await api(`/images/${FILE_KEY}?ids=${[PAGE_ID, ...sections.map((s) => s.id)].join(",")}&format=png&scale=1`);
await download(images[PAGE_ID], `${REF_DIR}/00-full.png`);
for (const [i, s] of sections.entries()) {
  await download(images[s.id], `${REF_DIR}/${String(i + 1).padStart(2, "0")}-${s.id.replace(":", "-")}.png`);
}
console.log("sections:", sections.length);
