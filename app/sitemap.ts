import type { MetadataRoute } from "next";

import {
  getAbsoluteUrl,
  getEnglishPath,
  getChinesePath,
  PUBLIC_PATHS,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PATHS.flatMap((pathname) => {
    const englishPath = getEnglishPath(pathname);
    const chinesePath = getChinesePath(pathname);
    const languages = {
      "ko-KR": getAbsoluteUrl(pathname),
      "en-US": getAbsoluteUrl(englishPath),
      "zh-CN": getAbsoluteUrl(chinesePath),
      "x-default": getAbsoluteUrl(pathname),
    };
    const priority = pathname === "/" ? 1 : 0.8;

    return [
      {
        url: getAbsoluteUrl(pathname),
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: getAbsoluteUrl(englishPath),
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
      {
        url: getAbsoluteUrl(chinesePath),
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages },
      },
    ];
  });
}
