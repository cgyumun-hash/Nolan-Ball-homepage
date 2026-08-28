export type SiteLocale = "ko" | "en" | "cn";

const LOCALIZED_PATHS = new Set([
  "/",
  "/products/filter-ball-for-gastroscopes",
  "/products/nolan-ball-3-2mm",
  "/products/filter-ball-for-colonoscopes",
  "/products/endoscopic-valve-port-brush",
  "/about/technology-overview",
  "/how-to-use",
  "/about/certifications",
  "/customer-support/resources-downloads",
  "/about/overview",
  "/about/location",
  "/customer-support/online-inquiry",
]);

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en" || pathname === "/cn") return "/";
  if (pathname.startsWith("/en/") || pathname.startsWith("/cn/")) return pathname.slice(3);
  return pathname || "/";
}

export function getLanguageHref(pathname: string, targetLocale: SiteLocale) {
  const basePath = stripLocalePrefix(pathname);

  if (targetLocale === "ko") return basePath;
  if (!LOCALIZED_PATHS.has(basePath)) return `/${targetLocale}`;

  return basePath === "/" ? `/${targetLocale}` : `/${targetLocale}${basePath}`;
}

export function selectLocale<K, E, C>(locale: SiteLocale, ko: K, en: E, cn: C): K | E | C {
  if (locale === "en") return en;
  if (locale === "cn") return cn;
  return ko;
}
