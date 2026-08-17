export type SiteLocale = "ko" | "en";

const ENGLISH_PATHS = new Set([
  "/",
  "/products/filter-ball-for-gastroscopes",
  "/products/filter-ball-for-colonoscopes",
  "/products/filter-ball-for-bronchoscopes",
  "/about/technology-overview",
  "/how-to-use",
  "/about/certifications",
  "/customer-support/resources-downloads",
  "/about/overview",
  "/about/location",
  "/customer-support/online-inquiry",
]);

export function stripEnglishPrefix(pathname: string) {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname || "/";
}
export function getLanguageHref(pathname: string, targetLocale: SiteLocale) {
  const koreanPath = stripEnglishPrefix(pathname);

  if (targetLocale === "ko") return koreanPath;
  if (!ENGLISH_PATHS.has(koreanPath)) return "/en";

  return koreanPath === "/" ? "/en" : `/en${koreanPath}`;
}
