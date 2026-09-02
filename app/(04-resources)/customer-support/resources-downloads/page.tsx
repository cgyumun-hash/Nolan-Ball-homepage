import type { Metadata } from "next";
import Link from "next/link";

import {
  createResourceDownloadAction,
  deleteResourceDownloadAction,
  updateResourceDownloadAction,
} from "@/app/admin/content-actions";
import InlineAdminToolbar from "@/components/admin/InlineAdminToolbar";
import ResourceDownloadsManager from "@/components/admin/ResourceDownloadsManager";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import { selectLocale, type SiteLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import { DOWNLOADS, RESOURCES_PAGES, SUBHEADER_BG } from "@/lib/site";
import { CN_DOWNLOADS, CN_RESOURCES_PAGES } from "@/lib/site.cn";
import { EN_DOWNLOADS, EN_RESOURCES_PAGES } from "@/lib/site.en";
import { isDatabaseConfigured } from "@/lib/server/db";
import { getOptionalAdminSession } from "@/lib/server/optional-admin-session";
import {
  listAdminResourceDownloads,
  listPublishedResourceDownloads,
  type ResourceDownload,
  type ResourceDownloadAdminRecord,
} from "@/lib/server/resource-downloads";

const title = "자료실";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title,
  description: "놀란볼코리아 Nolan Ball 카탈로그, 제품소개서, 시험성적서를 내려받을 수 있습니다.",
  alternates: getLanguageAlternates("/customer-support/resources-downloads"),
};

type Query = Record<string, string | string[] | undefined>;

const DOWNLOADS_PAGE_SIZE = 5;

function one(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function paginationHref(basePath: string, page: number) {
  return page > 1 ? `${basePath}?page=${page}` : basePath;
}

export async function ResourcesDownloadsPageContent({
  locale = "ko",
  searchParams,
}: {
  locale?: SiteLocale;
  searchParams?: Promise<Query>;
}) {
  const query = searchParams ? await searchParams : {};
  const parsedPage = Number.parseInt(one(query.page) ?? "1", 10);
  const requestedPage = Number.isFinite(parsedPage) && parsedPage > 0 ? Math.min(parsedPage, 9999) : 1;
  const content = selectLocale(locale, DOWNLOADS, EN_DOWNLOADS, CN_DOWNLOADS);
  const pages = selectLocale(locale, RESOURCES_PAGES, EN_RESOURCES_PAGES, CN_RESOURCES_PAGES);
  const pageTitle = locale === "en" ? "Downloads" : locale === "cn" ? "资料下载" : title;
  const basePath = locale === "ko"
    ? "/customer-support/resources-downloads"
    : `/${locale}/customer-support/resources-downloads`;
  const databaseConfigured = isDatabaseConfigured();
  const adminSession = await getOptionalAdminSession();
  const publishedDownloads: ResourceDownload[] | null = databaseConfigured && !adminSession
    ? await listPublishedResourceDownloads().catch((error) => {
        console.error("Could not load managed resource downloads", {
          name: error instanceof Error ? error.name : "UnknownError",
        });
        return null;
      })
    : null;
  let managedDownloads: ResourceDownload[] = [];
  let adminDownloads: ResourceDownloadAdminRecord[] = [];
  let managedDownloadsLoaded = false;

  if (databaseConfigured) {
    if (adminSession) {
      try {
        adminDownloads = await listAdminResourceDownloads();
        managedDownloads = adminDownloads.filter((item) => item.isPublished);
        managedDownloadsLoaded = true;
      } catch (error) {
        console.error("Could not load managed resource downloads", {
          name: error instanceof Error ? error.name : "UnknownError",
        });
      }
    } else if (publishedDownloads) {
      managedDownloads = publishedDownloads;
      managedDownloadsLoaded = true;
    }
  }

  const localizedManagedDownloads = managedDownloads.map((item) => {
    const bundledIndex = bundledDownloadIndex(item.sourceKey);
    const bundled = bundledIndex == null ? null : content.items[bundledIndex];

    if (bundled) {
      return { ...item, title: bundled.name, description: bundled.desc };
    }
    if (locale !== "ko") {
      return { ...item, title: item.fileName, description: "" };
    }
    return item;
  });
  const bundledDownloads = managedDownloadsLoaded
    ? content.items.filter((item) => !item.ready)
    : content.items;
  const totalItems = localizedManagedDownloads.length + bundledDownloads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / DOWNLOADS_PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * DOWNLOADS_PAGE_SIZE;
  const endIndex = startIndex + DOWNLOADS_PAGE_SIZE;
  const visibleManagedDownloads = localizedManagedDownloads.slice(startIndex, endIndex);
  const bundledStartIndex = Math.max(0, startIndex - localizedManagedDownloads.length);
  const bundledEndIndex = Math.max(0, endIndex - localizedManagedDownloads.length);
  const visibleBundledDownloads = bundledDownloads.slice(bundledStartIndex, bundledEndIndex);

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />
      <SubHeader
        eyebrow="RESOURCES"
        title={pageTitle}
        pager={pages}
        current={pageTitle}
        breadcrumb={["RESOURCES", pageTitle]}
        bg={SUBHEADER_BG.resources}
        locale={locale}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        <div className="wrap-in2">
          {adminSession && <InlineAdminToolbar username={adminSession.username} locale={locale} />}

          <h2 className="gfont mb-[50px] text-[40px] font-bold text-ink-900 max-b1080:text-[30px] max-b520:text-[24px]">
            {content.heading}
          </h2>

          {adminSession && (
            <ResourceDownloadsManager
              items={adminDownloads}
              createAction={createResourceDownloadAction}
              updateAction={updateResourceDownloadAction}
              deleteAction={deleteResourceDownloadAction}
            />
          )}

          <ul className={`${adminSession ? "mt-14" : ""} border-t border-ink-900`}>
            {visibleManagedDownloads.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-6 border-b border-line py-[30px] max-b860:flex-col max-b860:items-start max-b860:gap-3"
              >
                <DocumentIcon ready />
                <div className="min-w-0 flex-1">
                  <h3 className="break-words text-[21px] font-bold text-ink-900 max-b520:text-[18px]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-1 whitespace-pre-line text-[16px] text-ink-500 max-b520:text-[14px]">
                      {item.description}
                    </p>
                  )}
                </div>
                <a
                  href={item.fileUrl}
                  download={item.fileName}
                  className="gfont shrink-0 rounded-[50px] bg-ink-900 px-[26px] py-3 text-[15px] font-extrabold text-white transition-colors hover:bg-brand-500 max-b520:px-5 max-b520:py-2.5 max-b520:text-[13px]"
                >
                  {downloadLabel(locale)} <span className="ml-1 font-normal">({formatBytes(item.fileSizeBytes)})</span>
                </a>
              </li>
            ))}

            {visibleBundledDownloads.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-6 border-b border-line py-[30px] max-b860:flex-col max-b860:items-start max-b860:gap-3"
              >
                <DocumentIcon ready={item.ready} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-[21px] font-bold text-ink-900 max-b520:text-[18px]">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-[16px] text-ink-500 max-b520:text-[14px]">
                    {item.desc}
                  </p>
                  {!item.ready && "pending" in item && (
                    <p className="mt-2 text-[14px] leading-[1.6] text-accent-500 max-b520:text-[13px]">
                      {item.pending}
                    </p>
                  )}
                </div>

                {item.ready ? (
                  <a
                    href={item.file}
                    download
                    className="gfont shrink-0 rounded-[50px] bg-ink-900 px-[26px] py-3 text-[15px] font-extrabold text-white transition-colors hover:bg-brand-500 max-b520:px-5 max-b520:py-2.5 max-b520:text-[13px]"
                  >
                    {locale === "en" ? "Download PDF" : locale === "cn" ? "下载PDF" : "PDF 내려받기"}{" "}
                    <span className="ml-1 font-normal">({item.size})</span>
                  </a>
                ) : (
                  <span className="shrink-0 rounded-[50px] border border-line px-[26px] py-3 text-[15px] text-ink-500 max-b520:px-5 max-b520:py-2.5 max-b520:text-[13px]">
                    {locale === "en" ? "Coming Soon" : locale === "cn" ? "准备中" : "준비 중"}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            {currentPage > 1 && (
              <Link
                href={paginationHref(basePath, currentPage - 1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#b9cadd] bg-white text-[#0755a4]"
                aria-label="Previous page"
              >
                &lsaquo;
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .filter((number) => Math.abs(number - currentPage) <= 2 || number === 1 || number === totalPages)
              .map((number, index, visible) => (
                <span key={number} className="contents">
                  {index > 0 && number - visible[index - 1] > 1 && (
                    <span className="px-1 text-slate-400">&hellip;</span>
                  )}
                  <Link
                    href={paginationHref(basePath, number)}
                    className={`grid h-10 w-10 place-items-center rounded-full text-[14px] font-bold ${
                      number === currentPage
                        ? "bg-[#0755a4] text-white"
                        : "border border-[#b9cadd] bg-white text-[#234466]"
                    }`}
                    aria-current={number === currentPage ? "page" : undefined}
                  >
                    {number}
                  </Link>
                </span>
              ))}
            {currentPage < totalPages && (
              <Link
                href={paginationHref(basePath, currentPage + 1)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#b9cadd] bg-white text-[#0755a4]"
                aria-label="Next page"
              >
                &rsaquo;
              </Link>
            )}
          </nav>

          <p className="mt-[30px] text-[15px] leading-[1.7] text-ink-500 max-b520:text-[13px]">
            {content.note}
          </p>
        </div>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}

export default async function ResourcesDownloadsPage({ searchParams }: { searchParams: Promise<Query> }) {
  return <ResourcesDownloadsPageContent searchParams={searchParams} />;
}

function DocumentIcon({ ready }: { ready: boolean }) {
  return (
    <span
      className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[10px] ${
        ready ? "bg-brand-500/10 text-sky-700" : "bg-line/60 text-ink-500"
      }`}
      aria-hidden
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 2.5H7A1.5 1.5 0 0 0 5.5 4v16A1.5 1.5 0 0 0 7 21.5h10a1.5 1.5 0 0 0 1.5-1.5V7L14 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M13.5 2.5V7.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function downloadLabel(locale: SiteLocale) {
  if (locale === "en") return "Download";
  if (locale === "cn") return "下载";
  return "다운로드";
}

function formatBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) return "파일";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const size = value / 1024 ** index;
  return `${size >= 10 || index === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[index]}`;
}

function bundledDownloadIndex(sourceKey: string | null) {
  if (sourceKey === "bundled-catalog") return 0;
  if (sourceKey === "bundled-product-guide") return 1;
  if (sourceKey === "bundled-test-report") return 2;
  return null;
}
