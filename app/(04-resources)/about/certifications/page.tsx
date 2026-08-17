import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import type { SiteLocale } from "@/lib/locale";
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

export const metadata: Metadata = {
  title: "시험 결과·성적서",
  description:
    "Nolan Ball 미생물검사 결과와 CFU 시험 결과 및 해석을 확인할 수 있습니다.",
};

export function CertificationsPageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = locale === "en" ? EN_CERTIFICATIONS : CERTIFICATIONS;
  const pages = locale === "en" ? EN_RESOURCES_PAGES : RESOURCES_PAGES;
  const results = locale === "en" ? EN_TEST_RESULTS : TEST_RESULTS;

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
              <p className="text-[17px] leading-[1.8] text-ink-500 max-b580:text-[14px]">{results.batchesLead}</p>
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

        <section aria-labelledby="interpretation-title" className="relative overflow-hidden bg-white pb-[150px] pt-[560px] max-b1080:pb-[100px] max-b1080:pt-[410px] max-b580:pb-[110px] max-b580:pt-[280px]">
          <div className="wrap-in2 relative z-10 grid grid-cols-[0.82fr_1.18fr] gap-[150px] max-b1400:gap-[110px] max-b1080:grid-cols-1 max-b1080:gap-12">
            <div className="relative -mt-[70px] min-h-[570px] max-b1080:mt-0 max-b1080:min-h-0">
              <span aria-hidden className="pointer-events-none absolute left-1/2 top-[48%] z-0 h-[940px] w-[940px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#3182F6]/20 bg-[#3182F6]/[0.04] max-b1400:h-[880px] max-b1400:w-[880px] max-b1080:h-[760px] max-b1080:w-[760px] max-b580:h-[560px] max-b580:w-[560px]" />
              <h2 id="interpretation-title" className="gfont relative z-10 text-[40px] font-bold leading-[1.25] text-ink-900 max-b1080:text-[34px] max-b580:text-[28px]">{results.interpretationTitle}</h2>
              <div className="relative z-10 mt-8 space-y-3 text-[16px] leading-[1.9] text-ink-900 max-b580:text-[14px]">
                {results.method.map((sentence) => (
                  <p key={sentence}>{sentence}</p>
                ))}
              </div>
            </div>

            <ol className="translate-x-[170px] border-t border-ink-900 max-b1400:translate-x-[105px] max-b1080:translate-x-0">
              {results.interpretations.map((item) => (
                <li key={item.no} className="grid grid-cols-[66px_1fr] gap-5 border-b border-line py-8 max-b580:grid-cols-[44px_1fr] max-b580:gap-3 max-b580:py-6">
                  <span className="gfont text-[18px] font-bold text-ink-900">{item.no}</span>
                  <div>
                    <h3 className="text-[23px] font-bold text-ink-900 max-b580:text-[19px]">{item.title}</h3>
                    <div className="mt-3 space-y-2 text-[16px] leading-[1.8] text-ink-900 max-b580:text-[14px]">
                      {item.body.map((sentence) => (
                        <p key={sentence} className="[text-indent:1em]">{sentence}</p>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <p className="col-span-2 mt-[150px] border-l-2 border-ink-900 pl-5 text-[14px] leading-[1.75] text-ink-900 max-b1080:col-span-1 max-b1080:mt-[100px] max-b580:mt-[70px]">
              {results.disclaimer}
            </p>
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
