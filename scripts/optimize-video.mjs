// Usage: node scripts/optimize-video.mjs   (needs ffmpeg on PATH)
// Compresses the brand video (gitignored 5-Oct/Direct/) for the web and grabs its poster frame.
import { execFileSync } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import sharp from "sharp";

const SRC = "5-Oct/Direct/Truepas Brand Video.mp4";
const OUT = "public/videos/truepas-brand.mp4";
const POSTER = "public/images/video-poster.webp";
// Seconds: the biometric-gate shot, which keeps the centre clear for the play button
const POSTER_AT = "120";

await mkdir("public/videos", { recursive: true });
// H.264 + AAC plays in every browser; faststart lets playback begin before the whole file has arrived
execFileSync("ffmpeg", [
  "-v", "error", "-y", "-i", SRC,
  "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p",
  "-c:a", "aac", "-b:a", "128k",
  "-movflags", "+faststart", OUT,
], { stdio: "inherit" });

const frame = execFileSync("ffmpeg", ["-v", "error", "-ss", POSTER_AT, "-i", SRC, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "-"], {
  maxBuffer: 64 * 1024 * 1024,
});
await sharp(frame).resize({ width: 1400 }).webp({ quality: 80 }).toFile(POSTER);

for (const f of [SRC, OUT, POSTER]) console.log(`${f.padEnd(40)} ${((await stat(f)).size / 1024 / 1024).toFixed(1)} MB`);
