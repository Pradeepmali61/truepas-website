// Usage: node scripts/optimize-video.mjs [src] [--poster-only]   (needs ffmpeg on PATH)
// Compresses the brand video (default: gitignored 5-Oct/Direct/) for the web and grabs its poster frame.
import { execFileSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import sharp from "sharp";

const args = process.argv.slice(2);
const posterOnly = args.includes("--poster-only");
const SRC = args.find((a) => !a.startsWith("--")) ?? "5-Oct/Direct/Truepas Brand Video.mp4";
const OUT = "public/videos/truepas-brand.mp4";
const POSTER = "public/images/video-poster.webp";
// Seconds: the white TruePas logo card (client's pick, 30 Oct 2026)
const POSTER_AT = "5";
// The logo sits mid-frame, behind the play button: shrink the frame and move its centre up to this
// height so the logo clears the button at every width (incl. the 80px button on phones); the plain
// white edges are repeated to fill the rest
const POSTER_SCALE = 0.75;
const POSTER_LOGO_Y = 0.17;

if (!posterOnly) {
  await mkdir("public/videos", { recursive: true });
  // H.264 + AAC plays in every browser; faststart lets playback begin before the whole file has arrived
  execFileSync("ffmpeg", [
    "-v", "error", "-y", "-i", SRC,
    "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k",
    "-movflags", "+faststart", OUT,
  ], { stdio: "inherit" });
}

const frame = execFileSync("ffmpeg", ["-v", "error", "-ss", POSTER_AT, "-i", SRC, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], {
  maxBuffer: 64 * 1024 * 1024,
});
const { width, height } = await sharp(frame).metadata();
const w = Math.round(width * POSTER_SCALE), h = Math.round(height * POSTER_SCALE);
const cut = Math.round(h / 2 - height * POSTER_LOGO_Y);
const small = await sharp(frame).resize({ width: w, height: h }).png().toBuffer();
const shifted = await sharp(small)
  .extract({ left: 0, top: cut, width: w, height: h - cut })
  .extend({ left: Math.floor((width - w) / 2), right: Math.ceil((width - w) / 2), bottom: height - (h - cut), extendWith: "copy" })
  .png()
  .toBuffer();
await sharp(shifted).resize({ width: 1400 }).webp({ quality: 80 }).toFile(POSTER);

for (const f of posterOnly ? [SRC, POSTER] : [SRC, OUT, POSTER]) console.log(`${f.padEnd(40)} ${((await stat(f)).size / 1024 / 1024).toFixed(1)} MB`);
