import type { Metadata } from "next";
import Link from "next/link";

import { deleteActivityAction } from "@/app/admin/actions";
import ActivityCard from "@/components/activities/ActivityCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import type { ActivityCategory } from "@/lib/activities";
import type { SiteLocale } from "@/lib/locale";
import { selectLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import { listPublishedActivities } from "@/lib/server/activities";
import { getOptionalAdminSession } from "@/lib/server/optional-admin-session";
import { ACTIVITIES, COMPANY_PAGES, SUBHEADER_BG } from "@/lib/site";
import { EN_ACTIVITIES, EN_COMPANY_PAGES } from "@/lib/site.en";
import { CN_ACTIVITIES, CN_COMPANY_PAGES } from "@/lib/site.cn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "주요활동",
  description: "놀란볼코리아의 전시회, 학회·세미나, 제품 시연 및 해외 협력 활동을 확인하세요.",
  alternates: getLanguageAlternates("/about/activities"),
};

type Query = Record<string, string | string[] | undefined>;

const CATEGORY_KEYS = ["exhibition", "seminar", "demonstration", "overseas", "other"] as const;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getCategory(value: string | undefined): ActivityCategory | undefined {
  return CATEGORY_KEYS.includes(value as ActivityCategory) ? (value as ActivityCategory) : undefined;
}

function queryHref(basePath: string, category: string, sort: string, page = 1) {
  const params = new URLSearchParams();
  if (category && category !== "all") params.set("category", category);
  if (sort === "oldest") params.set("sort", sort);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export async function ActivitiesPageContent({
  locale = "ko",
  searchParams,
}: {
  locale?: SiteLocale;
  searchParams?: Promise<Query>;
}) {
  const query = searchParams ? await searchParams : {};
  const requestedCategory = one(query.category) ?? "all";
  const category = getCategory(requestedCategory);
  const sort = one(query.sort) === "oldest" ? "oldest" : "newest";
  const parsedPage = Number.parseInt(one(query.page) ?? "1", 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.min(parsedPage, 9999) : 1;

  const copy = selectLocale(locale, ACTIVITIES, EN_ACTIVITIES, CN_ACTIVITIES);
  const pages = selectLocale(locale, COMPANY_PAGES, EN_COMPANY_PAGES, CN_COMPANY_PAGES);
  const basePath = locale === "ko" ? "/about/activities" : `/${locale}/about/activities`;
  const filters = ["all", ...CATEGORY_KEYS] as const;
  const resultPromise = listPublishedActivities({ page, category, sort, locale }).catch((error) => {
    console.error("Could not load activities", error);
    return { items: [], total: 0, page, totalPages: 1 } as Awaited<ReturnType<typeof listPublishedActivities>>;
  });
  const [adminSession, result] = await Promise.all([
    getOptionalAdminSession(),
    resultPromise,
  ]);

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />
      <SubHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        pager={pages}
        current={copy.title}
        breadcrumb={[copy.eyebrow, copy.title]}
        bg={SUBHEADER_BG.activities}
        locale={locale}
      />

      <main className="overflow-hidden bg-[#f4f8fc] py-[150px] max-b1080:py-[110px] max-b580:py-20">
        <section className="wrap-in2 min-w-0">
          <header className="mb-16 grid grid-cols-[1fr_minmax(320px,620px)] items-end gap-12 max-b860:grid-cols-1 max-b860:gap-6 max-b580:mb-10">
            <div>
              <p className="mb-4 text-[14px] font-extrabold tracking-[0.28em] text-[#1677c8]">{copy.introEyebrow}</p>
              <h1 className="headline-font text-[54px] leading-[1.15] text-[#102a52] max-b1080:text-[44px] max-b580:text-[34px]">{copy.introTitle}</h1>
            </div>
            <p className="text-[18px] leading-[1.8] text-slate-600 max-b580:text-[16px]">{copy.intro}</p>
          </header>

          <div className="mb-10 flex min-w-0 items-center justify-between gap-6 max-b860:flex-col max-b860:items-stretch">
            <nav aria-label={copy.title} className="flex min-w-0 flex-wrap gap-3">
              {filters.map((key) => {
                const active = key === (category ?? "all");
                return (
                  <Link
                    key={key}
                    href={queryHref(basePath, key, sort)}
                    className={`rounded-full border px-5 py-2.5 text-[14px] font-bold transition max-b580:px-4 ${
                      active
                        ? "border-[#0755a4] bg-[#0755a4] text-white"
                        : "border-[#9cb6cf] bg-white text-[#234466] hover:border-[#0755a4] hover:text-[#0755a4]"
                    }`}
                  >
                    {copy.filters[key]}
                  </Link>
                );
              })}
            </nav>

            <div className="flex shrink-0 gap-2 max-b580:w-full">
              <Link href={queryHref(basePath, category ?? "all", "newest")} className={`rounded-full px-4 py-2 text-[14px] font-bold ${sort === "newest" ? "bg-[#dcecff] text-[#0755a4]" : "text-slate-500"}`}>
                {copy.sortNewest}
              </Link>
              <Link href={queryHref(basePath, category ?? "all", "oldest")} className={`rounded-full px-4 py-2 text-[14px] font-bold ${sort === "oldest" ? "bg-[#dcecff] text-[#0755a4]" : "text-slate-500"}`}>
                {copy.sortOldest}
              </Link>
            </div>
          </div>

          {result.items.length > 0 ? (
            <div className="grid grid-cols-4 gap-6 max-b1200:grid-cols-3 max-b860:grid-cols-2 max-b580:grid-cols-1">
              {result.items.map((item) => (
                <ActivityCard
                  key={item.id}
                  item={item}
                  locale={locale}
                  copy={copy}
                  href={`${basePath}/${item.slug}`}
                  editHref={adminSession ? `/admin/activities/${item.id}/edit` : undefined}
                  deleteAction={adminSession ? deleteActivityAction.bind(null, item.id) : undefined}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#9cb6cf] bg-white px-6 py-24 text-center text-[17px] text-slate-500">
              {copy.empty}
            </div>
          )}

          <div className="relative mt-14 flex min-h-12 items-center justify-center max-b860:flex-col max-b860:gap-5">
            <nav aria-label="Pagination" className="flex items-center justify-center gap-2">
              {result.page > 1 && (
                <Link href={queryHref(basePath, category ?? "all", sort, result.page - 1)} className="grid h-10 w-10 place-items-center rounded-full border border-[#b9cadd] bg-white text-[#0755a4]" aria-label="Previous page">‹</Link>
              )}
              {Array.from({ length: result.totalPages }, (_, index) => index + 1)
                .filter((number) => Math.abs(number - result.page) <= 2 || number === 1 || number === result.totalPages)
                .map((number, index, visible) => (
                  <span key={number} className="contents">
                    {index > 0 && number - visible[index - 1] > 1 && <span className="px-1 text-slate-400">…</span>}
                    <Link href={queryHref(basePath, category ?? "all", sort, number)} className={`grid h-10 w-10 place-items-center rounded-full text-[14px] font-bold ${number === result.page ? "bg-[#0755a4] text-white" : "border border-[#b9cadd] bg-white text-[#234466]"}`}>
                      {number}
                    </Link>
                  </span>
                ))}
              {result.page < result.totalPages && (
                <Link href={queryHref(basePath, category ?? "all", sort, result.page + 1)} className="grid h-10 w-10 place-items-center rounded-full border border-[#b9cadd] bg-white text-[#0755a4]" aria-label="Next page">›</Link>
              )}
            </nav>

            {adminSession && (
              <Link
                href="/admin/activities/new"
                className="absolute right-0 inline-flex items-center rounded-xl bg-[#0755a4] px-5 py-3 text-[14px] font-extrabold text-white shadow-lg shadow-blue-900/10 transition hover:bg-[#064681] max-b860:static max-b860:self-end"
              >
                + 새 주요활동 작성
              </Link>
            )}
          </div>
        </section>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}

export default async function ActivitiesPage({ searchParams }: { searchParams: Promise<Query> }) {
  return <ActivitiesPageContent searchParams={searchParams} />;
}
