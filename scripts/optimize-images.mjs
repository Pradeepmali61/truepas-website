// Usage: node scripts/optimize-images.mjs
// Converts the content team's raw exports (gitignored folders in the repo root) into
// resized WebP files under public/images. Add an entry per image as it is placed on the site.
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ENT = "First 22-20260929T080921Z-1-001/First 22";
const USR = "ForUser 23-20260929T080919Z-1-001/ForUser 23";

const images = {
  "enterprises/hero.webp": `${ENT}/One Access for Every Customer Journey.png`,
  "enterprises/integrations.webp": `${ENT}/Fold 6 - Works With the Systems You Already Run banner.png`,
  "enterprises/dashboard.webp": `${ENT}/Fold 7 - Every Location, One View.png`,

  "users/step-enter-details.webp": `${USR}/For Users Fold 2 Enter Details.png`,
  "users/step-verify-identity.webp": `${USR}/For Users Fold 2 Verify Identity.jpeg`,
  "users/step-scan-face.webp": `${USR}/For Users Fold 2 Scan Your Face.png`,
  "users/step-approve-data.webp": `${USR}/For Users Fold 2 Approve Data Use.jpeg`,
  "users/step-secure-credential.webp": `${USR}/For Users Fold 2 Secure Credential.png`,
  "users/step-ready.webp": `${USR}/For Users Fold 2 Ready to Use.png`,
};

// Largest slot is ~540 CSS px wide; 1400px covers 2x screens with room for crops
const MAX_WIDTH = 1400;

for (const [out, src] of Object.entries(images)) {
  const dest = path.join("public/images", out);
  await mkdir(path.dirname(dest), { recursive: true });
  const info = await sharp(src).resize({ width: MAX_WIDTH, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
  const before = (await stat(src)).size;
  console.log(`${out.padEnd(36)} ${info.width}x${info.height}  ${(before / 1024) | 0}KB -> ${(info.size / 1024) | 0}KB`);
}
