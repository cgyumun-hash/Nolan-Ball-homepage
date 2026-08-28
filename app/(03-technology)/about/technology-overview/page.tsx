import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import TechnologyFeatures from "@/components/TechnologyFeatures";
import type { SiteLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import { SUBHEADER_BG, TECHNOLOGY, TECHNOLOGY_PAGES } from "@/lib/site";
import { EN_TECHNOLOGY, EN_TECHNOLOGY_PAGES } from "@/lib/site.en";
import { CN_TECHNOLOGY, CN_TECHNOLOGY_PAGES } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "제품 개요",
  alternates: getLanguageAlternates("/about/technology-overview"),
};

function splitParagraphs(text: string) {
  return text.split(/(?<=[.!?。])\s+/).filter(Boolean);
}

function OverviewArtwork({ content, locale }: { content: typeof TECHNOLOGY | typeof EN_TECHNOLOGY | typeof CN_TECHNOLOGY; locale: SiteLocale }) {
  const overview = content.overview;
  const isEnglish = locale === "en";
  const principlePositions = isEnglish
    ? ["top-[11.5%]", "top-[40.5%]", "top-[68.5%]"]
    : ["top-[12.5%]", "top-[41.5%]", "top-[70.5%]"];

  return (
    <>
      <div className="relative mx-auto aspect-[1672/941] w-full overflow-hidden max-b1080:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={overview.image.src} alt="" className="absolute inset-0 h-full w-full object-cover" />

        <div className="absolute left-[2%] top-[7.2%] z-10 w-[47%] text-blue-950">
          <h2 id="technology-overview-title" className="gfont text-[clamp(30px,3.2vw,56px)] font-extrabold leading-[1.08] tracking-[-0.04em]">{overview.title}</h2>
        </div>

        <div className="absolute left-[2%] top-[24.5%] z-10 w-[45%] text-blue-950">
          <h3 className="max-w-[88%] whitespace-pre-line text-[clamp(16px,1.55vw,27px)] font-bold leading-[1.35]">{overview.headline}</h3>
          <div className="mt-[1vw] max-w-[84%] space-y-[0.55vw] text-[clamp(11px,0.9vw,16px)] leading-[1.7] text-slate-600">
            {splitParagraphs(overview.intro).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <div className="absolute left-[3.5%] top-[76.4%] z-10 w-[47.6%] text-blue-950">
          <p className="pl-[1.55vw] text-[clamp(10px,0.83vw,15px)] font-bold">{overview.specifications.title}</p>
          <div className="mt-[0.35vw] grid grid-cols-3 border-t border-blue-900/30 pt-[0.65vw]">
            {overview.specifications.items.map((item, index) => (
              <div key={item.size} className="border-r border-blue-900/15 px-[1.55vw] first:pl-[1.45vw] last:border-r-0">
                <strong className={`gfont text-[clamp(16px,1.55vw,27px)] ${index === 0 ? "text-lime-600" : index === 1 ? "text-amber-500" : "text-blue-500"}`}>{item.size}</strong>
                <p className="mt-[0.25vw] text-[clamp(10px,0.78vw,14px)] font-medium leading-[1.35]">{item.application}</p>
                <p className="mt-[0.08vw] text-[clamp(9px,0.7vw,13px)] leading-[1.3] text-slate-600">({item.code})</p>
              </div>
            ))}
          </div>
        </div>
        <p className="absolute bottom-[2.8%] left-[2.2%] z-10 text-[clamp(9px,0.68vw,12px)] text-slate-500">{overview.specifications.note}</p>

        <ol className="absolute inset-0 z-10">
          {overview.principles.map((principle, index) => (
            <li
              key={principle.no}
              className={`absolute left-[81.5%] right-[0.2%] ${principlePositions[index]}`}
            >
              <h3 className="text-[clamp(14px,1.1vw,21px)] font-bold leading-[1.3] text-black">{principle.title}</h3>
              <p className={`${isEnglish ? "mt-[0.5vw] leading-[1.4]" : "mt-[0.7vw] leading-[1.5]"} text-[clamp(11px,0.72vw,14px)] text-black`}>{principle.body}</p>
              <ul className={isEnglish ? "mt-[0.4vw] space-y-[0.12vw]" : "mt-[0.6vw] space-y-[0.25vw]"}>
                {principle.points.map((point) => <li key={point} className={`relative pl-[0.9vw] text-[clamp(10px,0.65vw,12px)] text-black before:absolute before:left-0 before:top-[0.55em] before:h-[0.28vw] before:w-[0.28vw] before:rounded-full before:bg-black ${isEnglish ? "leading-[1.3]" : "leading-[1.4]"}`}>{point}</li>)}
              </ul>
            </li>
          ))}
        </ol>
      </div>

      <div className="hidden overflow-hidden rounded-[28px] border border-sky-100 bg-[#f5faff] max-b1080:block max-b580:rounded-[20px]">
        <div className="px-10 pb-8 pt-10 text-blue-950 max-b580:px-5 max-b580:pb-6 max-b580:pt-7">
          <h2 className="gfont text-[44px] font-extrabold tracking-[-0.04em] max-b580:text-[34px]">{overview.title}</h2>
          <h3 className="mt-8 whitespace-pre-line text-[24px] font-bold leading-[1.4] max-b580:mt-6 max-b580:text-[18px]">{overview.headline}</h3>
          <div className="mt-4 max-w-[720px] space-y-3 text-[15px] leading-[1.75] text-slate-600 max-b580:text-[13px]">
            {splitParagraphs(overview.intro).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden max-b580:aspect-[4/3]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={overview.image.mobile} alt={overview.image.alt} className="absolute inset-x-0 top-0 h-auto w-full -translate-y-[20%] max-b580:-translate-y-[17%]" />
        </div>

        <div className="mx-8 -mt-3 rounded-2xl border border-sky-100 bg-white/95 p-6 shadow-[0_12px_35px_rgba(40,116,178,0.08)] max-b580:mx-4 max-b580:p-4">
          <p className="text-[14px] font-bold text-blue-950 max-b580:text-[12px]">{overview.specifications.title}</p>
          <div className="mt-3 grid grid-cols-3 border-t border-blue-900/20 pt-4">
          {overview.specifications.items.map((item, index) => (
            <div key={item.size} className="border-r border-blue-900/15 px-4 last:border-r-0 max-b580:px-2">
              <strong className={`gfont text-[24px] max-b580:text-[18px] ${index === 0 ? "text-lime-600" : index === 1 ? "text-amber-500" : "text-blue-500"}`}>{item.size}</strong>
              <p className="mt-2 text-[13px] font-medium leading-[1.45] text-blue-950 max-b580:text-[10px]">{item.application}</p>
              <p className="mt-1 text-[11px] leading-[1.35] text-slate-500 max-b580:text-[9px]">({item.code})</p>
            </div>
          ))}
          </div>
          <p className="mt-4 text-[11px] text-slate-500 max-b580:text-[9px]">{overview.specifications.note}</p>
        </div>

        <ol className="grid gap-4 p-8 max-b580:p-4">
          {overview.principles.map((principle) => (
            <li key={principle.no} className="grid grid-cols-[52px_1fr] gap-4 rounded-2xl border border-sky-100 bg-white p-5 max-b580:grid-cols-[38px_1fr] max-b580:gap-3 max-b580:p-4">
              <span className="gfont text-[20px] font-extrabold text-sky-600 max-b580:text-[16px]">{principle.no}</span>
              <div>
                <h3 className="text-[19px] font-bold text-black max-b580:text-[16px]">{principle.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-black max-b580:text-[12px]">{principle.body}</p>
                <ul className="mt-3 grid gap-1.5">
                  {principle.points.map((point) => <li key={point} className="relative pl-3 text-[12px] leading-[1.5] text-black before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-black max-b580:text-[11px]">{point}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export function TechnologyPageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, TECHNOLOGY, EN_TECHNOLOGY, CN_TECHNOLOGY);
  const pages = selectLocale(locale, TECHNOLOGY_PAGES, EN_TECHNOLOGY_PAGES, CN_TECHNOLOGY_PAGES);

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />
      <SubHeader eyebrow={content.eyebrow} title={content.title} pager={pages} current={content.title} breadcrumb={[content.eyebrow, content.title]} bg={SUBHEADER_BG.technology} locale={locale} />

      <main>
        <section aria-labelledby="technology-overview-title" className="py-[150px] max-b1080:py-[100px] max-b580:py-16">
          <div className="relative mx-auto w-[calc(100%_-_40px)] max-w-[1800px] max-b1080:w-[90%] max-b580:w-[calc(100%_-_40px)]">
            <OverviewArtwork content={content} locale={locale} />
          </div>
        </section>
        <TechnologyFeatures locale={locale} />
      </main>
      <Footer bordered locale={locale} />
    </>
  );
}

export default function TechnologyOverviewPage() {
  return <TechnologyPageContent />;
}
