import Image from "next/image";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import { COMPANY_PAGES, OVERVIEW, SUBHEADER_BG } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
};

export default function OverviewPage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />

      <SubHeader
        eyebrow={OVERVIEW.eyebrow}
        title={OVERVIEW.title}
        pager={COMPANY_PAGES}
        current={OVERVIEW.title}
        breadcrumb={[OVERVIEW.eyebrow, OVERVIEW.title]}
        bg={SUBHEADER_BG.company}
      />

      <main className="py-[180px] max-b1080:py-[120px] max-b580:py-[80px]">
        <section className="wrap-in2 grid grid-cols-2 items-start gap-x-[90px] max-b1080:gap-x-[50px] max-b860:grid-cols-1 max-b860:gap-y-12">
          <figure className="relative aspect-[4/5] w-full max-w-[560px] overflow-hidden bg-[#edf3f7]">
            <Image
              src={OVERVIEW.introImage.src}
              alt={OVERVIEW.introImage.alt}
              fill
              priority
              sizes="(max-width: 860px) 90vw, 44vw"
              className="object-cover"
            />
          </figure>
          <div>
            <div className="mb-8 flex items-start gap-5">
              <span className="gfont block text-[48px] font-bold leading-none text-[#79b934] max-b580:text-[36px]">01.</span>
              <h2 className="gfont -mt-0.5 text-[42px] font-bold leading-[1.15] text-ink-900 max-b1080:text-[34px] max-b580:text-[28px]">
                {OVERVIEW.introTitle}
              </h2>
            </div>
            <div className="mb-8 h-px w-full bg-line" />
            <div className="space-y-5 text-[18px] leading-[1.85] text-ink-500 max-b1080:text-[16px] max-b580:text-[15px]">
              {OVERVIEW.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap-in2 mt-[180px] grid grid-cols-2 items-start gap-x-[90px] max-b1080:gap-x-[50px] max-b860:grid-cols-1 max-b860:gap-y-12 max-b580:mt-[110px]">
          <div className="max-b860:order-2">
            <div className="mb-8 flex items-start gap-5">
              <span className="gfont block text-[48px] font-bold leading-none text-[#79b934] max-b580:text-[36px]">02.</span>
              <h2 className="gfont -mt-0.5 text-[42px] font-bold leading-[1.15] text-ink-900 max-b1080:text-[34px] max-b580:text-[28px]">
                비전
              </h2>
            </div>
            <div className="mb-9 h-px w-full bg-line" />
            <article>
              <p className="gfont mb-3 text-[14px] font-bold tracking-[0.14em] text-[#58bce7]">{OVERVIEW.vision.label}</p>
              <h3 className="mb-4 text-[27px] font-bold text-ink-900 max-b580:text-[22px]">{OVERVIEW.vision.title}</h3>
              <div className="space-y-5 text-[18px] leading-[1.85] text-ink-500 max-b1080:text-[16px] max-b580:text-[15px]">
                {OVERVIEW.vision.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          </div>
          <figure className="relative mx-auto aspect-[3/4] w-full max-w-[560px] overflow-hidden bg-[#edf3f7] max-b860:order-1">
            <Image
              src={OVERVIEW.visionImage.src}
              alt={OVERVIEW.visionImage.alt}
              fill
              sizes="(max-width: 860px) 90vw, 44vw"
              className="scale-[1.75] object-cover"
            />
          </figure>
        </section>

        <section className="wrap-in2 mt-[180px] grid grid-cols-2 items-start gap-x-[90px] max-b1080:gap-x-[50px] max-b860:grid-cols-1 max-b860:gap-y-12 max-b580:mt-[110px]">
          <figure className="relative aspect-[3/4] w-full max-w-[560px] overflow-hidden bg-[#edf3f7]">
            <Image
              src={OVERVIEW.missionImage.src}
              alt={OVERVIEW.missionImage.alt}
              fill
              sizes="(max-width: 860px) 90vw, 44vw"
              className="object-cover"
            />
          </figure>
          <div>
            <div className="mb-8 flex items-start gap-5">
              <span className="gfont block text-[48px] font-bold leading-none text-[#79b934] max-b580:text-[36px]">03.</span>
              <h2 className="gfont -mt-0.5 text-[42px] font-bold leading-[1.15] text-ink-900 max-b1080:text-[34px] max-b580:text-[28px]">
                미션
              </h2>
            </div>
            <div className="mb-9 h-px w-full bg-line" />
            <article>
              <p className="gfont mb-3 text-[14px] font-bold tracking-[0.14em] text-[#58bce7]">{OVERVIEW.mission.label}</p>
              <h3 className="mb-4 text-[27px] font-bold text-ink-900 max-b580:text-[22px]">{OVERVIEW.mission.title}</h3>
              <div className="space-y-5 text-[18px] leading-[1.85] text-ink-500 max-b1080:text-[16px] max-b580:text-[15px]">
                {OVERVIEW.mission.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          </div>
        </section>

        <section className="relative mt-[230px] overflow-hidden bg-[linear-gradient(180deg,#f8fcfe_0%,#eef8fc_52%,#ffffff_100%)] py-[110px] max-b580:mt-[140px] max-b580:py-[80px]">
          <span className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[#bfe9f7]/30 blur-3xl" />
          <span className="pointer-events-none absolute -right-20 bottom-8 h-80 w-80 rounded-full bg-[#d9f1df]/35 blur-3xl" />
          <div className="wrap-in2 relative">
          <div className="mb-[70px] text-center">
            <span className="gfont mb-4 block text-[13px] font-bold tracking-[0.2em] text-[#58bce7]">CORE VALUES</span>
            <h2 className="gfont text-[48px] font-bold text-ink-900 max-b580:text-[32px]">
            {OVERVIEW.coreValuesTitle}
            </h2>
            <span className="mx-auto mt-5 block h-[3px] w-12 rounded-full bg-[#79b934]" />
          </div>
          <ul className="grid grid-cols-5 gap-5 max-b1080:grid-cols-3 max-b580:grid-cols-2">
            {OVERVIEW.coreValues.map((value, index) => (
              <li
                key={value.title}
                className="flex aspect-square flex-col items-center justify-center rounded-full border border-white/90
                           bg-[linear-gradient(145deg,#f7fcff_0%,#dff2fa_100%)] p-7 text-center
                           shadow-[0_18px_45px_rgba(55,105,135,0.13),inset_0_0_0_1px_rgba(112,190,224,0.2)]
                           max-b1080:last:col-start-2 max-b580:last:col-auto"
              >
                <span className="gfont mb-3 text-[13px] font-bold text-[#59bde8]">0{index + 1}</span>
                <h3 className="mb-3 flex h-[58px] items-center justify-center text-[23px] font-bold leading-[1.25] text-ink-900 max-b580:h-[46px] max-b580:text-[18px]">{value.title}</h3>
                <p className="flex h-[45px] items-start justify-center overflow-hidden text-[14px] leading-[1.6] text-ink-500 max-b580:h-[39px] max-b580:text-[12px]">{value.body}</p>
              </li>
            ))}
          </ul>
          </div>
        </section>

        <section
          className="mt-[150px] bg-[#211c20] bg-cover bg-center py-[110px] text-white max-b580:mt-[90px] max-b580:py-[75px]"
          style={{ backgroundImage: OVERVIEW.companyBgFallback }}
        >
          <div className="wrap-in2">
            <div className="mb-[60px] flex items-center gap-4 max-b580:mb-10">
              <span className="h-11 w-2 bg-brand-500" />
              <h2 className="gfont text-[40px] font-bold max-b580:text-[28px]">{OVERVIEW.companyTitle}</h2>
            </div>
            <dl className="mx-auto max-w-[1080px] border-t border-white/60">
              {OVERVIEW.company.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[220px_1fr] border-b border-white/40 py-5
                             max-b580:grid-cols-[105px_1fr] max-b580:text-[14px]"
                >
                  <dt className="border-r border-white/40 px-8 font-bold max-b580:px-3">{row.label}</dt>
                  <dd className="px-12 text-white/90 max-b580:px-4">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer bordered />
    </>
  );
}
