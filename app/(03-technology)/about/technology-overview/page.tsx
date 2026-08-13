import type { Metadata } from "next";
import Image from "next/image";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import TechnologyFeatures from "@/components/TechnologyFeatures";
import { SUBHEADER_BG, TECHNOLOGY, TECHNOLOGY_PAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "기술 개요",
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
        <section aria-labelledby="technology-overview-title" className="py-[170px] max-b1080:py-[110px] max-b580:py-20">
          <div className="wrap-in2">
            <div className="grid grid-cols-[1.08fr_0.92fr] items-start gap-[60px] max-b1080:grid-cols-1 max-b1080:gap-10">
              <div>
                <p className="gfont mb-4 text-[14px] font-bold tracking-[0.2em] text-sky-600">
                  {overview.eyebrow}
                </p>
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

                <div className="relative mt-10 aspect-[1344/746] overflow-hidden rounded-[28px] border border-sky-200 bg-[#f3f8fc] shadow-[0_18px_45px_rgba(13,80,128,0.1)] max-b580:mt-7 max-b580:rounded-[20px]">
                  <Image
                    src={overview.image.src}
                    alt={overview.image.alt}
                    fill
                    priority
                    sizes="(max-width: 1080px) 100vw, 52vw"
                    className="object-contain"
                  />
                </div>
              </div>

              <ol className="border-t border-ink-900">
                {overview.principles.map((principle) => (
                  <li key={principle.no} className="grid grid-cols-[68px_1fr] gap-5 border-b border-line py-8 max-b580:grid-cols-[48px_1fr] max-b580:gap-3 max-b580:py-6">
                    <span className="gfont text-[20px] font-bold text-brand-500 max-b580:text-[16px]">
                      {principle.no}
                    </span>
                    <div>
                      <h3 className="mb-3 text-[25px] font-bold text-ink-900 max-b580:text-[20px]">
                        {principle.title}
                      </h3>
                      <p className="text-[16px] leading-[1.8] text-ink-500 max-b580:text-[14px]">
                        {principle.body}
                      </p>
                      <ul className="mt-5 space-y-2.5 border-l-2 border-sky-200 pl-5 max-b580:mt-4 max-b580:pl-4">
                        {principle.points.map((point) => (
                          <li key={point} className="relative pl-4 text-[14px] leading-[1.65] text-ink-500 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-sky-600 max-b580:text-[13px]">
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
      </main>

      <Footer bordered />
    </>
  );
}
