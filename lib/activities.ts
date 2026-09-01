export const ACTIVITY_CATEGORIES = [
  "exhibition",
  "seminar",
  "demonstration",
  "overseas",
  "other",
] as const;

export const ACTIVITY_STATUSES = ["draft", "published"] as const;
export const ACTIVITY_LOCALES = ["ko", "en", "cn"] as const;
export const ACTIVITY_SORTS = ["newest", "oldest"] as const;

export const ACTIVITIES_PAGE_SIZE = 8;

export type ActivityCategory = (typeof ACTIVITY_CATEGORIES)[number];
export type ActivityStatus = (typeof ACTIVITY_STATUSES)[number];
export type ActivityLocale = (typeof ACTIVITY_LOCALES)[number];
export type ActivitySort = (typeof ACTIVITY_SORTS)[number];

export type ActivityGallery = string[];

export type ActivityMutationInput = {
  slug?: string | null;
  titleKo: string;
  titleEn?: string | null;
  titleCn?: string | null;
  excerptKo?: string | null;
  excerptEn?: string | null;
  excerptCn?: string | null;
  contentKo: string;
  contentEn?: string | null;
  contentCn?: string | null;
  category: ActivityCategory;
  coverImageUrl?: string | null;
  coverImagePathname?: string | null;
  coverImageAlt?: string | null;
  gallery?: ActivityGallery | null;
  videoUrl?: string | null;
  location?: string | null;
  eventStartDate?: string | Date | null;
  eventEndDate?: string | Date | null;
  status?: ActivityStatus;
  publishedAt?: string | Date | null;
};

export type NormalizedActivityInput = {
  slug: string | null;
  titleKo: string;
  titleEn: string;
  titleCn: string;
  excerptKo: string;
  excerptEn: string;
  excerptCn: string;
  contentKo: string;
  contentEn: string;
  contentCn: string;
  category: ActivityCategory;
  coverImageUrl: string | null;
  coverImagePathname: string | null;
  coverImageAlt: string;
  gallery: ActivityGallery;
  videoUrl: string | null;
  location: string | null;
  eventStartDate: string | null;
  eventEndDate: string | null;
  status: ActivityStatus;
  publishedAt: string | null;
};

export type ActivityAdminRecord = {
  id: string;
  slug: string;
  titleKo: string;
  titleEn: string;
  titleCn: string;
  excerptKo: string;
  excerptEn: string;
  excerptCn: string;
  contentKo: string;
  contentEn: string;
  contentCn: string;
  category: ActivityCategory;
  coverImageUrl: string | null;
  coverImagePathname: string | null;
  coverImageAlt: string;
  gallery: ActivityGallery;
  videoUrl: string | null;
  location: string | null;
  eventStartDate: string | null;
  eventEndDate: string | null;
  status: ActivityStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ActivityListItem = {
  id: string;
  slug: string;
  category: ActivityCategory;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  coverImageAlt: string;
  eventStartDate: string | null;
  eventEndDate: string | null;
  publishedAt: string;
  location: string | null;
};

export type ActivityDetail = ActivityListItem & {
  content: string;
  gallery: ActivityGallery;
  videoUrl: string | null;
};

export type PublishedActivityList = {
  items: ActivityListItem[];
  total: number;
  page: number;
  totalPages: number;
};

export type PublishedActivityListOptions = {
  page?: number;
  category?: ActivityCategory | "all" | null;
  sort?: ActivitySort;
  locale?: ActivityLocale;
};

export class ActivityValidationError extends Error {
  readonly code = "ACTIVITY_VALIDATION_ERROR";

  constructor(message = "활동 내용을 확인해 주세요.") {
    super(message);
    this.name = "ActivityValidationError";
  }
}

const LIMITS = {
  slug: 180,
  title: 200,
  excerpt: 600,
  content: 100_000,
  coverAlt: 300,
  pathname: 1_024,
  url: 2_048,
  location: 200,
  galleryItems: 20,
} as const;

type LocalizedText = {
  ko: string | null | undefined;
  en: string | null | undefined;
  cn: string | null | undefined;
};

export function isActivityCategory(value: unknown): value is ActivityCategory {
  return typeof value === "string" && ACTIVITY_CATEGORIES.some((item) => item === value);
}

export function isActivityStatus(value: unknown): value is ActivityStatus {
  return typeof value === "string" && ACTIVITY_STATUSES.some((item) => item === value);
}

export function isActivityLocale(value: unknown): value is ActivityLocale {
  return typeof value === "string" && ACTIVITY_LOCALES.some((item) => item === value);
}

export function normalizeActivityLocale(value: unknown): ActivityLocale {
  return isActivityLocale(value) ? value : "ko";
}

export function selectLocalizedActivityText(
  values: LocalizedText,
  locale: ActivityLocale,
): string {
  const preference: ActivityLocale[] = [locale, "ko", "en", "cn"];

  for (const candidate of preference) {
    const value = values[candidate]?.trim();
    if (value) return value;
  }

  return "";
}

export function slugifyActivityTitle(value: string, fallback = "activity"): string {
  const slug = value
    .normalize("NFKC")
    .toLocaleLowerCase("ko-KR")
    .trim()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, LIMITS.slug)
    .replace(/-+$/g, "");

  if (slug) return slug;

  const normalizedFallback = fallback
    .normalize("NFKC")
    .toLocaleLowerCase("en-US")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, LIMITS.slug);

  return normalizedFallback || "activity";
}

export function validateActivityInput(input: ActivityMutationInput): NormalizedActivityInput {
  if (!input || typeof input !== "object") {
    throw new ActivityValidationError();
  }

  const titleKo = requiredText(input.titleKo, "국문 제목", LIMITS.title);
  const titleEn = optionalText(input.titleEn, "영문 제목", LIMITS.title) ?? "";
  const titleCn = optionalText(input.titleCn, "중문 제목", LIMITS.title) ?? "";
  const excerptKo = optionalText(input.excerptKo, "국문 요약", LIMITS.excerpt) ?? "";
  const excerptEn = optionalText(input.excerptEn, "영문 요약", LIMITS.excerpt) ?? "";
  const excerptCn = optionalText(input.excerptCn, "중문 요약", LIMITS.excerpt) ?? "";
  const contentKo = requiredText(input.contentKo, "국문 본문", LIMITS.content);
  const contentEn = optionalText(input.contentEn, "영문 본문", LIMITS.content) ?? "";
  const contentCn = optionalText(input.contentCn, "중문 본문", LIMITS.content) ?? "";

  if (!isActivityCategory(input.category)) {
    throw new ActivityValidationError("활동 분류를 확인해 주세요.");
  }

  const status = input.status ?? "draft";
  if (!isActivityStatus(status)) {
    throw new ActivityValidationError("게시 상태를 확인해 주세요.");
  }

  const slug = optionalText(input.slug, "주소", LIMITS.slug);
  const coverImageUrl = optionalUrl(input.coverImageUrl, "대표 이미지 주소");
  const coverImagePathname = optionalText(
    input.coverImagePathname,
    "대표 이미지 경로",
    LIMITS.pathname,
  );
  const coverImageAlt = optionalText(input.coverImageAlt, "대표 이미지 설명", LIMITS.coverAlt) ?? "";
  const videoUrl = optionalUrl(input.videoUrl, "동영상 주소");
  const location = optionalText(input.location, "장소", LIMITS.location);
  const eventStartDate = optionalDate(input.eventStartDate, "시작일");
  const eventEndDate = optionalDate(input.eventEndDate, "종료일");
  const publishedAt = optionalTimestamp(input.publishedAt, "게시일");

  if (eventStartDate && eventEndDate && eventEndDate < eventStartDate) {
    throw new ActivityValidationError("종료일은 시작일보다 빠를 수 없습니다.");
  }

  const gallery = normalizeGallery(input.gallery);

  return {
    slug: slug ? slugifyActivityTitle(slug) : null,
    titleKo,
    titleEn,
    titleCn,
    excerptKo,
    excerptEn,
    excerptCn,
    contentKo,
    contentEn,
    contentCn,
    category: input.category,
    coverImageUrl,
    coverImagePathname,
    coverImageAlt,
    gallery,
    videoUrl,
    location,
    eventStartDate,
    eventEndDate,
    status,
    publishedAt,
  };
}

export function validatePublishedActivityListOptions(
  options: PublishedActivityListOptions = {},
): Required<Omit<PublishedActivityListOptions, "category">> & {
  category: ActivityCategory | null;
} {
  const rawPage = Number(options.page ?? 1);
  const page = Number.isSafeInteger(rawPage) && rawPage > 0 ? Math.min(rawPage, 10_000) : 1;
  const category = options.category === "all" || options.category == null
    ? null
    : isActivityCategory(options.category)
      ? options.category
      : null;
  const sort = options.sort === "oldest" ? "oldest" : "newest";
  const locale = normalizeActivityLocale(options.locale);

  return { page, category, sort, locale };
}

function requiredText(value: unknown, label: string, maxLength: number): string {
  const normalized = optionalText(value, label, maxLength);
  if (!normalized) {
    throw new ActivityValidationError(`${label}을(를) 입력해 주세요.`);
  }
  return normalized;
}

function optionalText(value: unknown, label: string, maxLength: number): string | null {
  if (value == null || value === "") return null;
  if (typeof value !== "string") {
    throw new ActivityValidationError(`${label} 형식을 확인해 주세요.`);
  }

  const normalized = value.replaceAll("\0", "").trim();
  if (!normalized) return null;
  if (normalized.length > maxLength) {
    throw new ActivityValidationError(`${label}이(가) 너무 깁니다.`);
  }
  return normalized;
}

function optionalUrl(value: unknown, label: string): string | null {
  const normalized = optionalText(value, label, LIMITS.url);
  if (!normalized) return null;

  try {
    const url = new URL(normalized);
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("Unsupported protocol");
    return url.toString();
  } catch {
    throw new ActivityValidationError(`${label} 형식을 확인해 주세요.`);
  }
}

function optionalDate(value: unknown, label: string): string | null {
  if (value == null || value === "") return null;

  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new ActivityValidationError(`${label}을(를) 확인해 주세요.`);
    }
    return value.toISOString().slice(0, 10);
  }

  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new ActivityValidationError(`${label}을(를) 확인해 주세요.`);
  }

  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new ActivityValidationError(`${label}을(를) 확인해 주세요.`);
  }

  return value;
}

function optionalTimestamp(value: unknown, label: string): string | null {
  if (value == null || value === "") return null;
  const date = value instanceof Date ? value : new Date(typeof value === "string" ? value : Number.NaN);

  if (Number.isNaN(date.getTime())) {
    throw new ActivityValidationError(`${label}을(를) 확인해 주세요.`);
  }

  return date.toISOString();
}

function normalizeGallery(value: unknown): ActivityGallery {
  if (value == null) return [];
  if (!Array.isArray(value) || value.length > LIMITS.galleryItems) {
    throw new ActivityValidationError("갤러리 이미지를 확인해 주세요.");
  }

  const uniqueUrls = new Set<string>();
  for (const item of value) {
    const url = optionalUrl(item, "갤러리 이미지 주소");
    if (url) uniqueUrls.add(url);
  }

  return [...uniqueUrls];
}
