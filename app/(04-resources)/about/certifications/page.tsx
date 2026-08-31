import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import type { SiteLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import {
  CERTIFICATIONS,
  RESOURCES_PAGES,
  SUBHEADER_BG,
  TEST_RESULTS,
} from "@/lib/site";
import {
  EN_CERTIFICATIONS,
  EN_RESOURCES_PAGES,
  EN_TEST_RESULTS,
} from "@/lib/site.en";
import { CN_CERTIFICATIONS, CN_RESOURCES_PAGES, CN_TEST_RESULTS } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "시험 결과·성적서",
  description:
    "Nolan Ball 미생물검사 결과와 CFU 시험 결과 및 해석을 확인할 수 있습니다.",
  alternates: getLanguageAlternates("/about/certifications"),
};

function splitResultParagraphs(text: string) {
  return text.split(/(?<=[.!?。])\s+/).filter(Boolean);
}

export function CertificationsPageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, CERTIFICATIONS, EN_CERTIFICATIONS, CN_CERTIFICATIONS);
  const pages = selectLocale(locale, RESOURCES_PAGES, EN_RESOURCES_PAGES, CN_RESOURCES_PAGES);
  const results = selectLocale(locale, TEST_RESULTS, EN_TEST_RESULTS, CN_TEST_RESULTS);
  const downloadPage = pages.find((page) => page.href.includes("resources-downloads"));
  const isEnglish = locale === "en";
  const isChinese = locale === "cn";

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />

      <SubHeader
        eyebrow={content.eyebrow}
        title={content.title}
        pager={pages}
        current={content.title}
        breadcrumb={[content.eyebrow, content.title]}
        bg={SUBHEADER_BG.resources}
        locale={locale}
      />

      <main>
        <section aria-labelledby="test-series-title" className="relative bg-white pb-[70px] pt-[230px] max-b1080:pb-[60px] max-b1080:pt-[150px] max-b580:pb-16 max-b580:pt-[100px]">
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 top-[120px] bg-[#f4f8fb] max-b1080:top-[80px] max-b580:top-[50px]" />
          <div className="wrap-in2 relative z-10">
            <div className="mb-[70px] grid grid-cols-[0.8fr_1.2fr] items-end gap-[80px] max-b1080:grid-cols-1 max-b1080:gap-7 max-b580:mb-12">
              <div>
                <h2 id="test-series-title" className="gfont text-[54px] font-bold text-ink-900 max-b1080:text-[42px] max-b580:text-[32px]">{results.batchesTitle}</h2>
              </div>
              <div>
                <p className="text-[17px] leading-[1.8] text-ink-500 max-b580:text-[14px]">{results.batchesLead}</p>
                {downloadPage && (
                  <Link
                    href={downloadPage.href}
                    className="mt-5 inline-flex min-h-10 items-center gap-3 rounded-full border border-blue-600 bg-white px-5 py-2 text-[13px] font-bold text-blue-700 transition-colors hover:bg-blue-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 max-b580:mt-4 max-b580:min-h-9 max-b580:px-4 max-b580:text-[12px]"
                  >
                    <span>{downloadPage.label}</span>
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8h9" />
                      <path d="m9 4 4 4-4 4" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 max-b1080:grid-cols-1">
              {results.batches.map((batch) => (
                <article key={batch.no} className="overflow-hidden border border-sky-100 bg-white shadow-[0_12px_38px_rgba(9,67,112,0.08)]">
                  <div className="relative aspect-[25/22] overflow-hidden bg-[#eaf1f5]">
                    {batch.images.map((image, index) => {
                      const pageWidth = (22 / 25) * (851 / 1202) * 100;
                      const pageLeft = index * ((100 - pageWidth) / (batch.images.length - 1));

                      return (
                        <div
                          key={image}
                          className="absolute top-0 h-full overflow-hidden border border-line bg-white shadow-[0_8px_24px_rgba(9,67,112,0.18)]"
                          style={{
                            aspectRatio: "851 / 1202",
                            left: `${pageLeft}%`,
                            zIndex: index + 1,
                          }}
                        >
                          <Image
                            src={image}
                            alt={`${batch.title} ${locale === "en" ? "report" : "결과보고서"} ${index + 1}`}
                            fill
                            sizes="(max-width: 1080px) 80vw, 28vw"
                            className="object-contain object-top"
                          />
                        </div>
                      );
                    })}
                    <span className="absolute left-5 top-5 z-10 bg-ink-900 px-4 py-2 text-[12px] font-bold text-white">{batch.count}</span>
                  </div>
                  <div className="flex h-[176px] flex-col p-4 max-b1080:h-auto max-b580:p-4">
                    <div className="mb-2 flex min-h-[46px] items-start justify-between gap-4 max-b1080:min-h-0">
                      <div>
                        <p className="gfont mb-1 text-[11px] font-bold text-ink-900">TEST {batch.no}</p>
                        <h3 className="text-[18px] font-bold leading-[1.35] text-ink-900">{batch.title}</h3>
                      </div>
                    </div>
                    <p className="min-h-[42px] text-[12px] leading-[1.5] text-ink-500 max-b1080:min-h-0">{batch.body}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-2 text-[10px] text-sky-700 max-b1080:mt-2.5 max-b1080:pt-0">
                      <span className="rounded-full bg-sky-50 px-2.5 py-1">{batch.received}</span>
                      <span className="rounded-full bg-sky-50 px-2.5 py-1">{batch.reported}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <dl className="mt-[70px] grid grid-cols-4 border-y border-ink-900 max-b1080:grid-cols-2 max-b580:grid-cols-1">
              {results.details.map((detail) => (
                <div key={detail.label} className="border-r border-line px-7 py-3.5 last:border-r-0 max-b1080:even:border-r-0 max-b580:border-b max-b580:border-r-0 max-b580:last:border-b-0">
                  <dt className="text-[13px] font-bold text-ink-900">{detail.label}</dt>
                  <dd className="mt-2 text-[16px] font-medium leading-[1.55] text-ink-900 max-b580:text-[14px]">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="cfu-summary-title" className="bg-white py-[150px] max-b1080:py-[100px] max-b580:py-16">
          <div className="wrap-in2">
            <div className="relative aspect-[1672/941] overflow-hidden max-b580:hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/revision/resources/cfu-desktop.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className={`absolute text-blue-950 ${isEnglish ? "left-[14.6%] top-[26.4%] w-[29%]" : "left-[14.9%] top-[25.6%] w-[28.2%]"}`}>
                <h2 id="cfu-summary-title" className={`gfont font-extrabold tracking-[-0.04em] ${isEnglish ? "text-[clamp(16px,1.25vw,22px)] leading-[1.12]" : "text-[clamp(22px,1.9vw,34px)] leading-[1.18]"}`}>{results.interpretationTitle}</h2>
                <div className={`${isEnglish ? "mt-[0.85vw] text-[clamp(8.5px,0.64vw,12px)] leading-[1.45]" : "mt-[1.2vw] text-[clamp(9px,0.72vw,13px)] leading-[1.6]"} space-y-[0.25vw] text-slate-700`}>
                  {splitResultParagraphs(results.summary.lead).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                <div className={`${isEnglish ? "mt-[0.85vw] pt-[0.85vw]" : "mt-[1.3vw] pt-[1.2vw]"} border-t border-blue-900/15`}>
                  <p className={`${isEnglish ? "text-[clamp(8.5px,0.64vw,12px)] leading-[1.45]" : "text-[clamp(9px,0.72vw,13px)] leading-[1.6]"} text-slate-700`}>{results.summary.body}</p>
                </div>
              </div>
              <p className={`absolute whitespace-pre-line text-center text-slate-500 ${isEnglish ? "left-[15.8%] top-[72.8%] w-[27%] text-[clamp(7.5px,0.58vw,11px)] leading-[1.45]" : "left-[16.4%] top-[72.5%] w-[25.2%] text-[clamp(8px,0.65vw,12px)] leading-[1.55]"}`}>{results.summary.note}</p>

              <p className="gfont absolute left-[68.5%] top-[20.2%] w-[12.5%] text-center text-[clamp(13px,1.15vw,20px)] font-bold text-blue-700">{results.resultLabel}</p>
              {results.summary.specs.map((spec, index) => (
                <div key={spec.value} className={`absolute top-[66.5%] text-left ${index === 0 ? "left-[65.8%] w-[7.3%]" : "left-[80.8%] w-[8%]"}`}>
                  <strong className="gfont block whitespace-nowrap text-[clamp(12px,1.05vw,19px)] font-bold text-blue-700">{spec.value}</strong>
                  <span className="mt-[0.15vw] block text-[clamp(9px,0.73vw,13px)] leading-[1.35] text-blue-950">{spec.label}</span>
                </div>
              ))}
            </div>

            <div className="relative hidden aspect-[941/1672] overflow-hidden max-b580:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/revision/resources/cfu-mobile.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute left-[4.5%] right-[4.5%] top-[2.5%] flex h-[47.5%] min-w-0 flex-col items-center justify-center rounded-[50%] border border-blue-200/80 bg-[#f4f8ff]/95 px-[6%] py-[2.5%] text-center text-blue-950 shadow-[0_18px_45px_rgba(29,78,216,0.04)]">
                <h2 className={`gfont max-w-full font-extrabold tracking-[-0.045em] [overflow-wrap:anywhere] ${isEnglish ? "text-[clamp(18px,5.5vw,25px)] leading-[1.05]" : isChinese ? "text-[clamp(20px,6vw,27px)] leading-[1.1]" : "text-[clamp(20px,6.5vw,29px)] leading-[1.1]"}`}>
                  {results.interpretationTitle}
                </h2>
                <p className={`mt-[clamp(7px,2vw,10px)] max-w-full text-slate-700 [overflow-wrap:anywhere] ${isEnglish ? "text-[clamp(8px,2.35vw,10px)] leading-[1.4]" : isChinese ? "text-[clamp(8.5px,2.45vw,11px)] leading-[1.5]" : "text-[clamp(8.5px,2.3vw,11px)] leading-[1.4]"}`}>
                  {results.summary.lead}
                </p>
                <p className={`mt-[clamp(6px,1.8vw,9px)] max-w-full border-t border-blue-900/15 pt-[clamp(6px,1.8vw,9px)] text-slate-700 [overflow-wrap:anywhere] ${isEnglish ? "text-[clamp(8px,2.35vw,10px)] leading-[1.4]" : isChinese ? "text-[clamp(8.5px,2.45vw,11px)] leading-[1.5]" : "text-[clamp(8.5px,2.3vw,11px)] leading-[1.4]"}`}>
                  {results.summary.body}
                </p>
                <p className={`mt-[clamp(6px,1.7vw,8px)] max-w-full whitespace-pre-line text-slate-500 [overflow-wrap:anywhere] ${isEnglish ? "text-[clamp(7px,2vw,8.5px)] leading-[1.35]" : isChinese ? "text-[clamp(7.5px,2.1vw,9px)] leading-[1.4]" : "text-[clamp(7px,1.9vw,9px)] leading-[1.35]"}`}>
                  {results.summary.note}
                </p>
              </div>
              <p className={`gfont absolute left-[25%] top-[52.3%] w-[50%] text-center font-bold text-blue-700 [overflow-wrap:anywhere] ${isEnglish ? "text-[clamp(12px,3.6vw,16px)]" : "text-[clamp(12px,3.8vw,17px)]"}`}>
                {results.resultLabel}
              </p>
              {results.summary.specs.map((spec, index) => (
                <p key={spec.value} className={`absolute top-[84.7%] min-w-0 text-left text-[clamp(7.5px,2.2vw,9px)] leading-[1.3] text-blue-950 [overflow-wrap:anywhere] ${index === 0 ? "left-[37.5%] w-[17%]" : "left-[67.3%] w-[18%]"}`}>
                  <strong className="gfont block whitespace-nowrap text-[clamp(10.5px,3vw,13px)] font-bold text-blue-700">{spec.value}</strong>
                  <span className="block">{spec.label}</span>
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}

export default function CertificationsPage() {
  return <CertificationsPageContent />;
}
