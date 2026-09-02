import type { Metadata } from "next";

export const SITE_URL = "https://nolanballkorea.com";

/**
 * 실제 GNB와 서브메뉴에서 연결되는 공개 페이지입니다.
 * 메뉴에서 제외된 이전 하캄바이오 페이지는 검색 사이트맵에도 포함하지 않습니다.
 */
export const PUBLIC_PATHS = [
  "/",
  "/products/filter-ball-for-gastroscopes",
  "/products/nolan-ball-3-2mm",
  "/products/filter-ball-for-colonoscopes",
  "/products/endoscopic-valve-port-brush",
  "/how-to-use",
  "/about/technology-overview",
  "/about/certifications",
  "/customer-support/resources-downloads",
  "/about/overview",
  "/about/activities",
  "/about/location",
  "/customer-support/online-inquiry",
] as const;

export type SiteLanguage = "ko" | "en" | "cn";

export function getEnglishPath(pathname: string) {
  return pathname === "/" ? "/en" : `/en${pathname}`;
}

export function getChinesePath(pathname: string) {
  return pathname === "/" ? "/cn" : `/cn${pathname}`;
}

export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function getLanguageAlternates(
  pathname: string,
  language: SiteLanguage = "ko",
): NonNullable<Metadata["alternates"]> {
  const englishPath = getEnglishPath(pathname);
  const chinesePath = getChinesePath(pathname);

  return {
    canonical: language === "en" ? englishPath : language === "cn" ? chinesePath : pathname,
    languages: {
      "ko-KR": pathname,
      "en-US": englishPath,
      "zh-CN": chinesePath,
      "x-default": pathname,
    },
  };
}
