import Image from "next/image";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import FadeDown from "@/components/FadeDown";
import FadeUp from "@/components/FadeUp";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import type { SiteLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import { COMPANY_PAGES, OVERVIEW, SUBHEADER_BG } from "@/lib/site";
import { EN_COMPANY_PAGES, EN_OVERVIEW } from "@/lib/site.en";
import { CN_COMPANY_PAGES, CN_OVERVIEW } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";

const COMPANY_STARS = [
  [61.8, 14.2, 2, 0.35], [68.4, 5.1, 3, 0.48], [72.7, 18.9, 5, 0.7],
  [76.1, 2.4, 1, 0.42], [79.8, 11.6, 8, 0.88], [82.2, 26.3, 3, 0.58],
  [84.7, 4.8, 5, 0.74], [87.9, 16.1, 2, 0.5], [89.6, 1.2, 7, 0.84],
  [91.4, 28.7, 3, 0.62], [93.1, 9.4, 6, 0.9], [94.8, 20.2, 2, 0.58],
  [96.2, 3.7, 4, 0.78], [97.4, 14.9, 3, 0.66], [98.8, 25.6, 5, 0.82],
  [70.6, 85.3, 3, 0.38], [80.1, 77.8, 2, 0.42], [86.2, 72.4, 3, 0.48],
  [90.7, 91.6, 2, 0.46], [94.1, 69.5, 3, 0.52], [97.1, 82.1, 4, 0.62],
  [99.2, 96.4, 2, 0.48],
] as const;

export const metadata: Metadata = {
  title: "회사소개",
  alternates: getLanguageAlternates("/about/overview"),
};

export function OverviewPageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, OVERVIEW, EN_OVERVIEW, CN_OVERVIEW);
  const pages = selectLocale(locale, COMPANY_PAGES, EN_COMPANY_PAGES, CN_COMPANY_PAGES);

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
        bg={SUBHEADER_BG.company}
        locale={locale}
      />

      <main className="py-[180px] max-b1080:py-[120px] max-b580:py-[80px]">
        <FadeDown duration={0.8} once={false}>
          <section className="wrap-in2 grid grid-cols-2 items-start gap-x-[90px] max-b1080:gap-x-[50px] max-b860:grid-cols-1 max-b860:gap-y-12">
          <figure className="relative aspect-[4/5] w-full max-w-[560px] overflow-hidden bg-[#edf3f7]">
            <Image src={content.introImage.src} alt={content.introImage.alt} fill priority sizes="(max-width: 860px) 90vw, 44vw" className="object-cover" />
          </figure>
          <div>
            <div className="mb-8 flex items-start gap-5">
              <span className="gfont block text-[48px] font-bold leading-none text-[#79b934] max-b580:text-[36px]">01.</span>
              <h2 className="gfont -mt-0.5 text-[42px] font-bold leading-[1.15] text-ink-900 max-b1080:text-[34px] max-b580:text-[28px]">{content.introTitle}</h2>
            </div>
            <div className="mb-8 h-px w-full bg-line" />
            <div className="space-y-5 text-[18px] leading-[1.85] text-ink-500 max-b1080:text-[16px] max-b580:text-[15px]">
              {content.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          </section>
        </FadeDown>

        <FadeDown duration={0.8} once={false}>
          <section className="wrap-in2 mt-[180px] grid grid-cols-2 items-start gap-x-[90px] max-b1080:gap-x-[50px] max-b860:grid-cols-1 max-b860:gap-y-12 max-b580:mt-[110px]">
          <div className="max-b860:order-2">
            <div className="mb-8 flex items-start gap-5">
              <span className="gfont block text-[48px] font-bold leading-none text-[#79b934] max-b580:text-[36px]">02.</span>
              <h2 className="gfont -mt-0.5 text-[42px] font-bold leading-[1.15] text-ink-900 max-b1080:text-[34px] max-b580:text-[28px]">{content.vision.label}</h2>
            </div>
            <div className="mb-9 h-px w-full bg-line" />
            <article>
              <h3 className="mb-4 text-[27px] font-bold text-ink-900 max-b580:text-[22px]">{content.vision.title}</h3>
              <div className="space-y-5 text-[18px] leading-[1.85] text-ink-500 max-b1080:text-[16px] max-b580:text-[15px]">
                {content.vision.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          </div>
          <figure className="relative mx-auto aspect-[3/4] w-full max-w-[560px] overflow-hidden bg-[#edf3f7] max-b860:order-1">
            <Image src={content.visionImage.src} alt={content.visionImage.alt} fill sizes="(max-width: 860px) 90vw, 44vw" className="scale-[1.75] object-cover" />
          </figure>
          </section>
        </FadeDown>

        <FadeDown duration={0.8} once={false}>
          <section className="wrap-in2 mt-[180px] grid grid-cols-2 items-start gap-x-[90px] max-b1080:gap-x-[50px] max-b860:grid-cols-1 max-b860:gap-y-12 max-b580:mt-[110px]">
          <figure className="relative aspect-[3/4] w-full max-w-[560px] overflow-hidden bg-[#edf3f7]">
            <Image src={content.missionImage.src} alt={content.missionImage.alt} fill sizes="(max-width: 860px) 90vw, 44vw" className="object-cover" />
          </figure>
          <div>
            <div className="mb-8 flex items-start gap-5">
              <span className="gfont block text-[48px] font-bold leading-none text-[#79b934] max-b580:text-[36px]">03.</span>
              <h2 className="gfont -mt-0.5 text-[42px] font-bold leading-[1.15] text-ink-900 max-b1080:text-[34px] max-b580:text-[28px]">{content.mission.label}</h2>
            </div>
            <div className="mb-9 h-px w-full bg-line" />
            <article>
              <h3 className="mb-4 text-[27px] font-bold text-ink-900 max-b580:text-[22px]">{content.mission.title}</h3>
              <div className="space-y-5 text-[18px] leading-[1.85] text-ink-500 max-b1080:text-[16px] max-b580:text-[15px]">
                {content.mission.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          </div>
        </section>

        <section className="relative mt-[340px] overflow-hidden bg-[radial-gradient(ellipse_at_50%_62%,#f7fbff_0%,#e7f3ff_38%,#c7e2ff_72%,#a8d1ff_100%)] py-[110px] max-b1080:mt-[270px] max-b580:mt-[190px] max-b580:py-[80px]">
          <FadeUp className="wrap-in2 relative" duration={0.8} once={false}>
            <div className="mb-[70px] text-center">
              <h2 className="gfont text-[48px] font-bold text-ink-900 max-b580:text-[32px]">{content.coreValuesTitle}</h2>
              <span className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-[#3182F6]" />
            </div>
            <ul className="grid grid-cols-5 gap-5 max-b1080:grid-cols-3 max-b580:grid-cols-2">
              {content.coreValues.map((value, index) => (
                <li key={value.title} className="flex aspect-square flex-col items-center justify-center rounded-full border border-white bg-white p-7 text-center shadow-[0_18px_45px_rgba(16,65,140,0.2)] max-b1080:last:col-start-2 max-b580:last:col-auto">
                  <span className="gfont mb-3 text-[13px] font-bold text-[#3182F6]">0{index + 1}</span>
                  <h3 className="mb-3 flex h-[58px] items-center justify-center text-[23px] font-bold leading-[1.25] text-ink-900 max-b580:h-[46px] max-b580:text-[18px]">{value.title}</h3>
                  <p className="flex h-[45px] items-start justify-center overflow-hidden text-[14px] leading-[1.6] text-ink-500 max-b580:h-[39px] max-b580:text-[12px]">{value.body}</p>
                </li>
              ))}
            </ul>
          </FadeUp>
          </section>
        </FadeDown>

        <section className="relative mt-[360px] overflow-hidden bg-[#211c20] bg-cover bg-center py-[110px] text-white max-b1080:mt-[280px] max-b580:mt-[200px] max-b580:py-[75px]" style={{ backgroundImage: content.companyBgFallback }}>
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {COMPANY_STARS.map(([left, top, size, opacity], index) => (
              <span
                key={`${left}-${top}-${index}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  width: `${Math.min(size, 4)}px`,
                  height: `${Math.min(size, 4)}px`,
                  opacity,
                  boxShadow: size > 1 ? "0 0 7px rgba(205,228,255,0.85)" : "none",
                }}
              />
            ))}
          </div>
          <div className="wrap-in2 relative z-10">
            <div className="mb-[60px] flex items-center gap-4 max-b580:mb-10">
              <h2 className="gfont text-[40px] font-bold max-b580:text-[28px]">{content.companyTitle}</h2>
            </div>
            <dl className="mx-auto max-w-[1080px] border-t border-white/60">
              {content.company.map((row) => (
                <div key={row.label} className="grid grid-cols-[220px_1fr] border-b border-white/40 py-5 max-b580:grid-cols-[105px_1fr] max-b580:text-[14px]">
                  <dt className="border-r border-white/40 px-8 font-bold max-b580:px-3">{row.label}</dt>
                  <dd className="px-12 text-white/90 max-b580:px-4">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}

export default function OverviewPage() {
  return <OverviewPageContent />;
}
