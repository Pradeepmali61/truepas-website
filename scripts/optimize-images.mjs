// Usage: node scripts/optimize-images.mjs
// Converts the content team's raw exports (gitignored 5-Oct/ folder in the repo root) into
// resized WebP files under public/images. Add an entry per image as it is placed on the site.
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ENT = "5-Oct/For Enterprises";
const USR = "5-Oct/For Users";

const images = {
  "enterprises/hero.webp": `${ENT}/One Access for Every Customer Journey.jpg`,

  "users/hero.webp": `${USR}/One Face Infinite Places.jpg`,

  "users/step-enter-details.webp": `${USR}/Fold 2 Enter Details.jpg`,
  "users/step-verify-identity.webp": `${USR}/Fold 2 Verify Identity.jpg`,
  "users/step-scan-face.webp": `${USR}/Fold 2 Scan Your Face.jpg`,
  "users/step-approve-data.webp": `${USR}/Fold 2 Approve Data Use.jpg`,
  "users/step-secure-credential.webp": `${USR}/Fold 2 Secure Credential.jpg`,
  "users/step-ready.webp": `${USR}/Fold 2 Ready to Use.jpg`,

  "users/use-case-airports.webp": `${USR}/Fold 4 Airports.jpg`,
  "users/use-case-car-rentals.webp": `${USR}/Fold 4 Car Rentals.jpg`,
  "users/use-case-hotels.webp": `${USR}/Fold 4 Hotels.jpg`,
  "users/use-case-theme-parks.webp": `${USR}/Fold 4 Theme. Parks.jpg`,
  "users/use-case-cruise.webp": `${USR}/Fold 4 Cruise.jpg`,
  "users/use-case-venues.webp": `${USR}/Fold 4 Venues.jpg`,

  "users/feature-face-scan.webp": `${USR}/Fold 6 3D Face Scan Authentication.jpg`,
  "users/feature-documents.webp": `${USR}/Fold 6 Instant Document Access.jpg`,
  "users/feature-invite.webp": `${USR}/Fold 6 Add Invite Family & Friends.jpg`,
  "users/feature-activity.webp": `${USR}/Fold 6 Track Recent Activity.jpg`,
  "users/feature-enrollment.webp": `${USR}/Fold 6 Biometric Enrollment & ID Verification.jpg`,
  "users/feature-speed.webp": `${USR}/Fold 6 Sub-3-Second Authenticatio.jpg`,
  "users/feature-consent.webp": `${USR}/Fold 6 Per-Industry Consent Toggles.jpg`,
  "users/feature-integrations.webp": `${USR}/Fold 6 Deep System Integrations.jpg`,
  "users/feature-opt-out.webp": `${USR}/Fold 6 Easy Opt-Out & Deletions.jpg`,
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
