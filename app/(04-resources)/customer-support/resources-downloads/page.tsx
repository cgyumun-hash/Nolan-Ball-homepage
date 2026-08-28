import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import type { SiteLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import { DOWNLOADS, RESOURCES_PAGES, SUBHEADER_BG } from "@/lib/site";
import { EN_DOWNLOADS, EN_RESOURCES_PAGES } from "@/lib/site.en";
import { CN_DOWNLOADS, CN_RESOURCES_PAGES } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";

const title = "자료실";

export const metadata: Metadata = {
  title: `${title}`,
  description:
    "놀란볼코리아 Nolan Ball 카탈로그, 제품소개서, 시험성적서를 내려받을 수 있습니다.",
  alternates: getLanguageAlternates("/customer-support/resources-downloads"),
};

/**
 * 자료정리 6장 "기존 자료의 홈페이지 배치 계획" 을 그대로 구현합니다.
 *
 * 목록은 lib/site.ts 의 DOWNLOADS 에서 옵니다.
 * ready:false 인 항목은 md 가 지정한 "공개 전 조치"가 아직 끝나지 않은 자료라
 * 다운로드 버튼 대신 사유를 표시합니다. 조치가 끝나면 파일을
 * public/downloads/ 에 넣고 ready 를 true 로 바꾸면 바로 열립니다.
 *
 * 레이아웃은 기존 게시판(NoticeBoard) 대신 자료 목록 형태로 바꿨습니다.
 * 서브헤더·푸터·본문 폭 규칙은 다른 서브페이지와 같습니다.
 */
export function ResourcesDownloadsPageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, DOWNLOADS, EN_DOWNLOADS, CN_DOWNLOADS);
  const pages = selectLocale(locale, RESOURCES_PAGES, EN_RESOURCES_PAGES, CN_RESOURCES_PAGES);
  const pageTitle = locale === "en" ? "Downloads" : locale === "cn" ? "资料下载" : title;

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
          <h2
            className="gfont mb-[50px] text-[40px] font-bold text-ink-900
                       max-b1080:text-[30px] max-b520:text-[24px]"
          >
            {content.heading}
          </h2>

          <ul className="border-t border-ink-900">
            {content.items.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-6 border-b border-line py-[30px]
                           max-b860:flex-col max-b860:items-start max-b860:gap-3"
              >
                {/* 문서 아이콘 (원본 아이콘 파일이 없어 인라인 SVG 로 그립니다) */}
                <span
                  className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[10px] ${
                    item.ready ? "bg-brand-500/10 text-sky-700" : "bg-line/60 text-ink-500"
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
                    className="gfont shrink-0 rounded-[50px] bg-ink-900 px-[26px] py-3 text-[15px]
                               font-extrabold text-white transition-colors hover:bg-brand-500
                               max-b520:px-5 max-b520:py-2.5 max-b520:text-[13px]"
                  >
                    {locale === "en" ? "Download PDF" : locale === "cn" ? "下载PDF" : "PDF 내려받기"} <span className="ml-1 font-normal">({item.size})</span>
                  </a>
                ) : (
                  <span
                    className="shrink-0 rounded-[50px] border border-line px-[26px] py-3
                               text-[15px] text-ink-500 max-b520:px-5 max-b520:py-2.5 max-b520:text-[13px]"
                  >
                    {locale === "en" ? "Coming Soon" : locale === "cn" ? "准备中" : "준비 중"}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className="mt-[30px] text-[15px] leading-[1.7] text-ink-500 max-b520:text-[13px]">
            {content.note}
          </p>
        </div>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}

export default function ResourcesDownloadsPage() {
  return <ResourcesDownloadsPageContent />;
}
