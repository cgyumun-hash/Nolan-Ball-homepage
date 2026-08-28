import path from "node:path";

import sharp from "sharp";

const imageDirectory = path.join(process.cwd(), "public", "images", "technology");

const images = [
  { input: "TECHNOLOGY_배너1.png", output: "TECHNOLOGY_배너1.webp", width: 2203, height: 714 },
  { input: "제품구조_pc.png", output: "제품구조_pc.webp", width: 2012, height: 781 },
  { input: "제품구조_moblie.png", output: "제품구조_moblie.webp", width: 1024, height: 1535 },
];

for (const image of images) {
  await sharp(path.join(imageDirectory, image.input))
    .resize(image.width, image.height, { fit: "fill" })
    .webp({ quality: 90, smartSubsample: true, effort: 6 })
    .toFile(path.join(imageDirectory, image.output));

  console.log(`Converted ${image.input} -> ${image.output}`);
}
