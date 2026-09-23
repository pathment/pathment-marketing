import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svg = readFileSync(join(root, "public/favicon.svg"));

const sizes = [
  { name: "assets/favicon-16x16.png", size: 16 },
  { name: "assets/favicon-32x32.png", size: 32 },
  { name: "assets/apple-touch-icon.png", size: 180 },
  { name: "assets/android-chrome-192x192.png", size: 192 },
  { name: "assets/android-chrome-512x512.png", size: 512 },
];

for (const { name, size } of sizes) {
  const png = await sharp(svg, { density: Math.max(72, size * 4) })
    .resize(size, size)
    .png()
    .toBuffer();
  writeFileSync(join(root, "public", name), png);
  console.log(`wrote ${name}`);
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
  icoSizes.map((size) =>
    sharp(svg, { density: size * 4 })
      .resize(size, size)
      .png()
      .toBuffer(),
  ),
);

// ICO directory with PNG payloads for 16, 32, and 48 pixel renderings.
const header = Buffer.alloc(6 + icoSizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(icoSizes.length, 4);
let offset = header.length;
icoImages.forEach((png, index) => {
  const entry = 6 + index * 16;
  header[entry] = icoSizes[index];
  header[entry + 1] = icoSizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(png.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += png.length;
});
writeFileSync(
  join(root, "public/favicon.ico"),
  Buffer.concat([header, ...icoImages]),
);
console.log("wrote favicon.ico");
