import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import TechnologyFeatures from "@/components/TechnologyFeatures";
import { SUBHEADER_BG, TECHNOLOGY, TECHNOLOGY_PAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "제품 개요",
};

export default function TechnologyPage() {
  const overview = TECHNOLOGY.overview;

  return (
    <>
      <InquiryButton />
      <Header forceSolid />

      <SubHeader
        eyebrow={TECHNOLOGY.eyebrow}
        title={TECHNOLOGY.title}
        pager={TECHNOLOGY_PAGES}
        current={TECHNOLOGY.title}
        breadcrumb={[TECHNOLOGY.eyebrow, TECHNOLOGY.title]}
        bg={SUBHEADER_BG.technology}
      />

      <main>
        <section aria-labelledby="technology-overview-title" className="pb-[280px] pt-[240px] max-b1080:pb-[200px] max-b1080:pt-[140px] max-b580:pb-[140px] max-b580:pt-[100px]">
          <div className="wrap-in2">
            <div className="grid grid-cols-[1.08fr_0.92fr] items-stretch gap-[60px] max-b1080:grid-cols-1 max-b1080:gap-10">
              <div className="flex h-full flex-col">
                <h2 id="technology-overview-title" className="gfont text-[64px] font-bold leading-[1.12] text-ink-900 max-b1080:text-[48px] max-b580:text-[36px]">
                  {overview.title}
                </h2>

                <div className="mt-[70px] max-b1080:mt-10 max-b580:mt-8">
                  <h3 className="mb-5 text-[30px] font-bold leading-[1.4] text-ink-900 max-b580:text-[22px]">
                    {overview.headline}
                  </h3>
                  <p className="text-[17px] leading-[1.85] text-ink-500 max-b580:text-[14px]">
                    {overview.intro}
                  </p>
                </div>

                <div className="mt-10 flex flex-1 -translate-x-[35px] flex-col max-b1080:translate-x-0 max-b580:mt-7">
                  <Image
                    src={overview.image.src}
                    alt={overview.image.alt}
                    width={2400}
                    height={1267}
                    priority
                    sizes="(max-width: 1080px) 100vw, 52vw"
                    className="h-auto w-full"
                  />
                  <div className="relative mt-10 flex flex-1 flex-col overflow-hidden max-b580:mt-7">
                    <span aria-hidden className="pointer-events-none absolute left-[35%] top-0 h-44 w-28 overflow-hidden max-b580:left-[28%]">
                      <span className="absolute -left-20 top-1 h-44 w-44 rounded-full bg-[radial-gradient(circle_at_58%_48%,rgba(242,140,40,0.34)_0%,rgba(255,181,102,0.22)_38%,rgba(255,224,190,0.11)_62%,transparent_78%)] blur-[9px]" />
                    </span>
                    <div className="relative z-10 ml-auto flex h-10 w-[65%] items-center max-b580:w-[72%]">
                      <span className="absolute left-0 top-1/2 h-5 w-[4px] -translate-y-1/2 bg-[#f28c28]" />
                      <span className="h-[4px] w-full bg-[#f28c28]" />
                      <span className="absolute right-0 top-1/2 h-5 w-[4px] -translate-y-1/2 bg-[#f28c28]" />
                      <strong className="absolute left-1/2 max-w-[88%] -translate-x-1/2 bg-white px-4 text-center text-[16px] font-bold leading-[1.35] text-[#f28c28] max-b580:px-2 max-b580:text-[12px]">
                        {overview.measurement.title}
                      </strong>
                    </div>
                    <div className="relative z-10 ml-auto mt-8 flex w-[65%] flex-1 flex-col max-b580:w-[72%]">
                      <p className="relative z-10 px-6 text-left text-[16px] leading-[1.8] text-ink-900 max-b580:px-3 max-b580:text-[14px]">
                        {overview.measurement.body}
                      </p>
                      <p className="relative z-10 mt-auto px-4 pt-8 text-center text-[18px] font-bold leading-[1.65] text-[#f28c28] max-b1080:mt-5 max-b1080:pt-0 max-b580:px-2 max-b580:text-[15px]">
                        “{overview.measurement.quote}”
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <ol className="mt-[145px] translate-x-[45px] border-t border-ink-900 max-b1080:mt-0 max-b1080:translate-x-0">
                {overview.principles.map((principle) => (
                  <li key={principle.no} className="relative grid grid-cols-[68px_1fr] gap-5 overflow-hidden border-b border-line py-8 max-b580:grid-cols-[48px_1fr] max-b580:gap-3 max-b580:py-6">
                    <span aria-hidden className="pointer-events-none absolute -left-20 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_45%_50%,rgba(74,190,238,0.3)_0%,rgba(118,213,246,0.18)_38%,rgba(193,238,252,0.08)_60%,transparent_74%)] blur-[10px]" />
                    <span className="gfont relative z-10 text-[20px] font-bold text-ink-900 max-b580:text-[16px]">
                      {principle.no}
                    </span>
                    <div className="relative z-10">
                      <h3 className="mb-3 text-[25px] font-bold text-ink-900 max-b580:text-[20px]">
                        {principle.title}
                      </h3>
                      <p className="text-[16px] leading-[1.8] text-ink-500 max-b580:text-[14px]">
                        {principle.body}
                      </p>
                      <ul className="mt-5 space-y-2.5 pl-5 max-b580:mt-4 max-b580:pl-4">
                        {principle.points.map((point) => (
                          <li key={point} className="relative pl-4 text-[14px] leading-[1.65] text-ink-500 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-ink-900 max-b580:text-[13px]">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <TechnologyFeatures />
        <div aria-hidden className="h-[240px] bg-white max-b1080:h-[180px] max-b580:h-[120px]" />
      </main>

      <Footer bordered />
    </>
  );
}
