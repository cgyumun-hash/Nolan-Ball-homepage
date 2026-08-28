import path from "node:path";

import sharp from "sharp";

const imageDirectory = path.join(process.cwd(), "public", "images", "product");

await sharp(path.join(imageDirectory, "배너.png"))
  .resize(2167, 725, { fit: "fill" })
  .webp({ quality: 90, smartSubsample: true, effort: 6 })
  .toFile(path.join(imageDirectory, "배너.webp"));

console.log("Converted 배너.png -> 배너.webp");
