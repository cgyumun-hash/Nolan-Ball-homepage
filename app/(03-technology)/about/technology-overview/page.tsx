import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import FadeUp from "@/components/FadeUp";
import { SUBHEADER_BG, TECHNOLOGY, TECHNOLOGY_PAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "기술 개요",
};

function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub12.php
 *
 *   .sub12.pt250.pb300              250/300px → 1080↓ 150/200px
 *     .wrap_in
 *       .text { display:flex; justify-content:center; align-items:flex-start; gap:20px }
 *         img  84×53          1200↓ width:50px · 520↓ 25px
 *         h4   { font-size:40px; GmarketSans; font-weight:400;
 *                text-align:center; margin-top:20px }
 *                1200↓ 32px · 520↓ 20px
 *       .line { width:1px; height:100px; background:#999; margin:54px auto }
 *                1200↓ margin:30px auto · 520↓ margin:25px auto + height:50px
 *       .w1   { width:61%; margin:0 auto; text-align:center;
 *               line-height:30px; margin-bottom:250px }
 *                1200↓ width:100% · 520↓ font-size:14px + margin-bottom:150px
 *     .w2
 *       .s1 { font-size:56px; text-align:right; GmarketSans; font-weight:bold;
 *             background:#FF9D00; color:#fff; padding:50px 20px 50px 0;
 *             margin-bottom:200px; text-shadow:… }          ← 화면 전체 폭
 *              1200↓ 38px + padding:35px 0 · 860↓ margin-bottom:100px · 520↓ 28px
 *       .s2.wrap_in2
 *         ul       { display:flex; gap:60px; align-items:center }
 *         ul.ul_2  { justify-content:space-between }
 *              860↓ .ul_1 column · .ul_2 column-reverse · li width:100%
 *         ul img   486×485        1200↓ width:350px
 *         h6       { font-size:40px; margin-bottom:100px }
 *              1200↓ 35px/50px · 520↓ 30px/25px
 *         p        { font-size:24px; margin-bottom:50px }
 *              1200↓ 20px/25px · 520↓ 18px
 *         .mb200   200px → 860↓ 100px
 *   각 ul 에 data-aos="fade-up" (anchor-placement: center-bottom)
 */
export default function TechnologyPage() {
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
        bg={SUBHEADER_BG.sub01}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        <div className="wrap-in">
          {/* .text — 아이콘 · 헤딩 · 아이콘 */}
          <div className="flex items-start justify-center gap-5">
            {TECHNOLOGY.icons.map((icon, i) =>
              hasImage(icon) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={icon}
                  src={icon}
                  alt=""
                  className="w-[84px] shrink-0 max-b1200:w-[50px] max-b520:w-[25px]"
                />
              ) : (
                /* 원본 84×53 아이콘 자리 — 좌우 인용부호로 대신합니다 */
                <span
                  key={icon}
                  aria-hidden
                  className="gfont shrink-0 select-none text-[64px] leading-none text-line
                             max-b1200:text-[40px] max-b520:text-[24px]"
                >
                  {i === 0 ? "“" : "”"}
                </span>
              ),
            )}

            <h4
              className="gfont mt-5 text-center text-[40px] font-normal
                         max-b1200:text-[32px] max-b520:text-[20px]"
            >
              {TECHNOLOGY.headline[0]}
              <br />
              {TECHNOLOGY.headline[1]}
            </h4>
          </div>

          {/* .line — 세로 구분선 */}
          <div
            className="mx-auto my-[54px] h-[100px] w-px bg-[#999]
                       max-b1200:my-[30px] max-b520:my-[25px] max-b520:h-[50px]"
          />

          {/* .w1 */}
          <div
            className="mx-auto mb-[250px] w-[61%] text-center leading-[30px]
                       max-b1200:w-full
                       max-b520:mb-[150px] max-b520:text-[14px]"
          >
            {TECHNOLOGY.lead.map((p, i) => (
              <p key={i} className={i === 0 ? "mb-[30px]" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* .w2 */}
        <div>
          {/* .s1 — 화면 전체 폭 주황 밴드 */}
          <div
            className="gfont mb-[200px] bg-accent-500 py-[50px] pr-5 text-right text-[56px]
                       font-bold text-white
                       [text-shadow:0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]
                       max-b1200:py-[35px] max-b1200:text-[38px]
                       max-b860:mb-[100px]
                       max-b520:text-[28px]"
          >
            {TECHNOLOGY.bandTitle}
          </div>

          {/* 도해 2장 — 안에 작은 글씨가 있어 본문 폭을 꽉 채워 싣습니다 */}
          <div className="wrap-in2">
            {TECHNOLOGY.figures.map((fig) => (
              <FadeUp key={fig.image}>
                <figure className="mb-[150px] max-b860:mb-[80px]">
                  {hasImage(fig.image) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={fig.image}
                      alt={fig.caption}
                      className="w-full rounded-[10px] border border-line"
                    />
                  ) : (
                    <div
                      className="flex aspect-[16/9] w-full items-center justify-center
                                 border border-line bg-[linear-gradient(160deg,#f7f8f6_0%,#e8ece6_100%)]
                                 p-6 text-center text-[13px] text-ink-500"
                    >
                      public{fig.image}
                    </div>
                  )}
                  <figcaption
                    className="mt-5 text-[16px] leading-[1.7] text-ink-500
                               max-b520:text-[14px]"
                  >
                    {fig.caption}
                  </figcaption>
                </figure>
              </FadeUp>
            ))}

            {/* 자료정리 3-2 구조적 특징 4가지 */}
            <h3
              className="gfont mb-[60px] text-[40px] font-bold text-ink-900
                         max-b1200:text-[32px] max-b520:mb-[30px] max-b520:text-[24px]"
            >
              {TECHNOLOGY.featuresTitle}
            </h3>
            <ul>
              {TECHNOLOGY.features.map((f) => (
                <li
                  key={f.no}
                  className="flex gap-[50px] border-t border-line py-[45px] last:border-b
                             max-b980:flex-col max-b980:gap-3 max-b980:py-[30px]"
                >
                  <span
                    className="gfont w-[100px] shrink-0 text-[40px] font-bold leading-none text-brand-500
                               max-b1200:text-[32px] max-b980:w-auto"
                  >
                    {f.no}
                  </span>
                  <div className="min-w-0">
                    <h4 className="mb-2 text-[26px] font-bold max-b1200:text-[21px] max-b520:text-[18px]">
                      {f.name}
                      <span className="ml-3 text-[16px] font-normal text-ink-500 max-b520:text-[13px]">
                        {f.en}
                      </span>
                    </h4>
                    <p className="text-[18px] leading-[1.8] text-ink-500 max-b1200:text-[16px] max-b520:text-[15px]">
                      {f.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer bordered />
    </>
  );
}
