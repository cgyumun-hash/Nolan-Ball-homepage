import path from "node:path";

import sharp from "sharp";

const imageDirectory = path.join(process.cwd(), "public", "images", "main");

const banners = [
  { input: "메인1_pc.png", output: "메인1_pc.webp", width: 1672, height: 941 },
  { input: "메인1_moblie.png", output: "메인1_moblie.webp", width: 1122, height: 1402 },
  { input: "메인2_pc.png", output: "메인2_pc.webp", width: 1672, height: 941 },
  { input: "메인2_mobile.png", output: "메인2_mobile.webp", width: 1122, height: 1402 },
  { input: "메인3_pc.png", output: "메인3_pc.webp", width: 1672, height: 941 },
  { input: "메인3_moblie.png", output: "메인3_moblie.webp", width: 1122, height: 1402 },
  { input: "360_pc.png", output: "360_pc.webp", width: 1994, height: 789 },
  { input: "360_moblie.png", output: "360_moblie.webp", width: 941, height: 1672 },
  { input: "4가지기술_pc.png", output: "4가지기술_pc.webp", width: 1672, height: 941 },
  { input: "4가지기술_moblie.png", output: "4가지기술_moblie.webp", width: 1003, height: 1568 },
  { input: "홈페이지_product_pc.png", output: "홈페이지_product_pc.webp", width: 1672, height: 941 },
  { input: "홈페이지_product_moblie.png", output: "홈페이지_product_moblie.webp", width: 941, height: 1672 },
];

for (const banner of banners) {
  await sharp(path.join(imageDirectory, banner.input))
    .resize(banner.width, banner.height, { fit: "fill" })
    .webp({ quality: 90, smartSubsample: true, effort: 6 })
    .toFile(path.join(imageDirectory, banner.output));

  console.log(`Converted ${banner.input} -> ${banner.output}`);
}
