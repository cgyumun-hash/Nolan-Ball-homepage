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

      <main className="relative pt-[250px] max-b1080:pt-[150px] max-b580:pt-20">
        <div className="wrap-in">
          {/* 초록 헤딩 — 980px 이하에서 absolute 를 풀고 흐름 안으로 들어옵니다 */}
          <RevealBottom className="absolute top-0 left-[38%] max-b1400:left-[43%] max-b1080:left-[38%] max-b980:static max-b980:left-0">
            <h2
              className="gfont text-[100px] leading-[110px] text-blue-700
                         max-b1600:text-[80px] max-b1600:leading-[100px]
                         max-b1400:text-[68px] max-b1400:leading-[83px]
                         max-b1080:text-[64px] max-b1080:leading-[72px]
                         max-b520:text-[clamp(34px,10vw,44px)] max-b520:leading-[1.2]"
            >
              {OVERVIEW.headline.map((line, i) => (
                <span key={line}>
                  {line}
                  {/* 원본 br.no_br — 980px 이하에서 숨겨져 한 줄로 흐릅니다 */}
                  {i < OVERVIEW.headline.length - 1 && (
                    <br className="max-b980:hidden" />
                  )}
                  {i < OVERVIEW.headline.length - 1 && " "}
                </span>
              ))}
            </div>
          </div>
        </section>

          {/* .w1.mb200 */}
          <div
            className="mb-[200px] flex items-end justify-between pt-[180px]
                       max-b980:flex-col max-b980:items-center max-b980:pt-[50px]
                       max-b520:mb-20 max-b520:pt-8"
          >
            {photoReady ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={OVERVIEW.photo}
                alt=""
                className="w-[45%] max-b980:w-full"
              />
            ) : (
              /* 원본 sub11_img.jpg 는 727×834 (세로형).
                 .w1 이 align-items:flex-end 라 이 높이가 본문 시작 위치를 정합니다.
                 자리표시자도 같은 비율로 잡아야 레이아웃이 어긋나지 않습니다. */
              <div
                className="flex aspect-[727/834] w-[45%] items-center justify-center
                           text-center text-[13px] text-white/80 max-b980:w-full"
                style={{ backgroundImage: OVERVIEW.photoFallback }}
              >
                public{OVERVIEW.photo}
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

        {/* .w2 — 화면 폭 전체를 쓰는 회사 개요 밴드 */}
        <div
          className="relative flex min-h-[700px] items-center justify-center bg-cover bg-center
                     bg-no-repeat py-20 text-white max-b520:min-h-0 max-b520:h-auto max-b520:py-16"
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
                  className={`flex border-b border-white py-[15px] max-b980:text-[14px] max-b520:items-start ${
                    /* 원본은 첫 줄에만 인라인으로 border-top 을 붙입니다 */
                    i === 0 ? "border-t" : ""
                  }`}
                >
                  <li className="flex w-1/4 items-center pl-[80px] max-b1400:w-[22%] max-b1400:pl-[50px] max-b1080:w-1/4 max-b1080:pl-[15px] max-b520:w-[38%]">
                    {row.label}
                  </li>
                  {/* 원본 .line { width:1px; height:24px } — 높이가 고정이라
                      flex 기본 정렬(stretch)에서 늘어나지 않고 위쪽에 붙습니다 */}
                  <div className="h-6 w-px shrink-0 bg-white" />
                  <li className="ml-[80px] min-w-0 max-b1400:ml-[50px] max-b1080:ml-[15px] max-b1080:w-[65%] max-b520:break-words">
                    {row.value}
                  </li>
                </ul>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer bordered />
    </>
  );
}
