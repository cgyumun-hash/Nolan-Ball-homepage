import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import {
  CERTIFICATIONS,
  RESOURCES_PAGES,
  SUBHEADER_BG,
  TEST_RESULTS,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "시험 결과·성적서",
  description:
    "Nolan Ball 미생물검사 결과와 CFU 시험 결과 및 해석을 확인할 수 있습니다.",
};

export default function CertificationsPage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />

      <SubHeader
        eyebrow={CERTIFICATIONS.eyebrow}
        title={CERTIFICATIONS.title}
        pager={RESOURCES_PAGES}
        current={CERTIFICATIONS.title}
        breadcrumb={[CERTIFICATIONS.eyebrow, CERTIFICATIONS.title]}
        bg={SUBHEADER_BG.resources}
      />

      <main>
        <section aria-labelledby="test-results-title" className="py-[160px] max-b1080:py-[110px] max-b580:py-20">
          <div className="wrap-in2">
            <div className="grid grid-cols-[0.85fr_1.15fr] items-end gap-[90px] max-b1080:grid-cols-1 max-b1080:gap-8">
              <div>
                <p className="gfont mb-4 text-[14px] font-bold tracking-[0.2em] text-sky-600">
                  {TEST_RESULTS.eyebrow}
                </p>
                <h2 id="test-results-title" className="gfont text-[64px] font-bold leading-[1.12] text-ink-900 max-b1080:text-[48px] max-b580:text-[36px]">
                  {TEST_RESULTS.heading}
                </h2>
              </div>
              <p className="text-[18px] leading-[1.85] text-ink-500 max-b580:text-[15px]">
                {TEST_RESULTS.lead}
              </p>
            </div>

            <div className="mt-[80px] overflow-hidden rounded-[32px] bg-[linear-gradient(125deg,#092f58_0%,#075f9d_68%,#159ad6_100%)] text-white shadow-[0_25px_70px_rgba(8,65,112,0.2)] max-b580:mt-12 max-b580:rounded-[22px]">
              <div className="grid grid-cols-[1.25fr_0.75fr] max-b860:grid-cols-1">
                <div className="p-[60px] max-b1080:p-10 max-b580:p-7">
                  <p className="mb-5 text-[13px] font-bold tracking-[0.16em] text-sky-200">
                    {TEST_RESULTS.resultLabel}
                  </p>
                  <h3 className="max-w-[700px] text-[42px] font-bold leading-[1.3] max-b1080:text-[34px] max-b580:text-[27px]">
                    {TEST_RESULTS.result}
                  </h3>
                  <p className="mt-5 text-[17px] text-sky-100 max-b580:text-[14px]">
                    {TEST_RESULTS.resultEn}
                  </p>
                </div>
                <div className="grid border-l border-white/20 max-b860:grid-cols-3 max-b860:border-l-0 max-b860:border-t max-b580:grid-cols-1">
                  {TEST_RESULTS.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col justify-center border-b border-white/20 p-7 last:border-b-0 max-b860:border-b-0 max-b860:border-r max-b860:last:border-r-0 max-b580:border-b max-b580:border-r-0 max-b580:last:border-b-0">
                      <strong className="gfont text-[28px] font-bold max-b580:text-[23px]">{metric.value}</strong>
                      <span className="mt-2 text-[13px] leading-[1.5] text-sky-100">{metric.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-4 border-y border-ink-900 max-b1080:grid-cols-2 max-b580:grid-cols-1">
              {TEST_RESULTS.details.map((detail) => (
                <div key={detail.label} className="border-r border-line px-7 py-7 last:border-r-0 max-b1080:even:border-r-0 max-b580:border-b max-b580:border-r-0 max-b580:last:border-b-0">
                  <dt className="text-[13px] font-bold text-sky-700">{detail.label}</dt>
                  <dd className="mt-3 text-[16px] font-medium leading-[1.65] text-ink-900 max-b580:text-[14px]">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section aria-labelledby="test-series-title" className="bg-[#f4f8fb] py-[150px] max-b1080:py-[100px] max-b580:py-20">
          <div className="wrap-in2">
            <div className="mb-[70px] grid grid-cols-[0.8fr_1.2fr] items-end gap-[80px] max-b1080:grid-cols-1 max-b1080:gap-7 max-b580:mb-12">
              <div>
                <p className="gfont mb-4 text-[14px] font-bold tracking-[0.2em] text-sky-600">{TEST_RESULTS.batchesEyebrow}</p>
                <h2 id="test-series-title" className="gfont text-[54px] font-bold text-ink-900 max-b1080:text-[42px] max-b580:text-[32px]">{TEST_RESULTS.batchesTitle}</h2>
              </div>
              <p className="text-[17px] leading-[1.8] text-ink-500 max-b580:text-[14px]">{TEST_RESULTS.batchesLead}</p>
            </div>

            <div className="grid grid-cols-3 gap-6 max-b1080:grid-cols-1">
              {TEST_RESULTS.batches.map((batch) => (
                <article key={batch.no} className="overflow-hidden rounded-[24px] border border-sky-100 bg-white shadow-[0_12px_38px_rgba(9,67,112,0.08)]">
                  <div className="relative aspect-[1073/760] overflow-hidden border-b border-line bg-white">
                    <Image src={batch.image} alt={`${batch.title} ${batch.spec} 시험성적서 일부`} fill sizes="(max-width: 1080px) 100vw, 33vw" className="object-cover object-top" />
                    <span className="absolute left-5 top-5 rounded-full bg-brand-500 px-4 py-2 text-[12px] font-bold text-white">{batch.count}</span>
                  </div>
                  <div className="p-8 max-b580:p-6">
                    <div className="mb-5 flex items-start justify-between gap-5">
                      <div>
                        <p className="gfont mb-2 text-[13px] font-bold text-sky-600">TEST {batch.no}</p>
                        <h3 className="text-[26px] font-bold text-ink-900 max-b580:text-[21px]">{batch.title}</h3>
                      </div>
                      <strong className="gfont whitespace-nowrap text-[24px] font-bold text-brand-500 max-b580:text-[20px]">{batch.spec}</strong>
                    </div>
                    <p className="min-h-[58px] text-[15px] leading-[1.75] text-ink-500 max-b1080:min-h-0 max-b580:text-[14px]">{batch.body}</p>
                    <div className="mt-6 flex flex-wrap gap-2 text-[12px] text-sky-700">
                      <span className="rounded-full bg-sky-50 px-3 py-2">{batch.received}</span>
                      <span className="rounded-full bg-sky-50 px-3 py-2">{batch.reported}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="interpretation-title" className="py-[150px] max-b1080:py-[100px] max-b580:py-20">
          <div className="wrap-in2 grid grid-cols-[0.82fr_1.18fr] gap-[90px] max-b1080:grid-cols-1 max-b1080:gap-12">
            <div>
              <p className="gfont mb-4 text-[14px] font-bold tracking-[0.16em] text-sky-600">{TEST_RESULTS.interpretationEyebrow}</p>
              <h2 id="interpretation-title" className="gfont text-[52px] font-bold leading-[1.2] text-ink-900 max-b1080:text-[42px] max-b580:text-[31px]">{TEST_RESULTS.interpretationTitle}</h2>
              <p className="mt-8 text-[17px] leading-[1.9] text-ink-500 max-b580:text-[14px]">{TEST_RESULTS.method}</p>
            </div>

            <ol className="border-t border-ink-900">
              {TEST_RESULTS.interpretations.map((item) => (
                <li key={item.no} className="grid grid-cols-[66px_1fr] gap-5 border-b border-line py-8 max-b580:grid-cols-[44px_1fr] max-b580:gap-3 max-b580:py-6">
                  <span className="gfont text-[18px] font-bold text-brand-500">{item.no}</span>
                  <div>
                    <h3 className="text-[23px] font-bold text-ink-900 max-b580:text-[19px]">{item.title}</h3>
                    <p className="mt-3 text-[16px] leading-[1.8] text-ink-500 max-b580:text-[14px]">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="col-span-2 border-l-2 border-sky-300 pl-5 text-[14px] leading-[1.75] text-ink-500 max-b1080:col-span-1">
              {TEST_RESULTS.disclaimer}
            </p>
          </div>
        </section>
      </main>

      <Footer bordered />
    </>
  );
}
