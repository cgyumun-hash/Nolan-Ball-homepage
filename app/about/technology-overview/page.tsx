import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import FadeUp from "@/components/FadeUp";
import { ABOUT_US_PAGES, SUBHEADER_BG, TECHNOLOGY } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technology Overview | 하캄바이오",
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
        pager={ABOUT_US_PAGES}
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

          {/* .s2.wrap_in2 */}
          <div className="wrap-in2">
            {TECHNOLOGY.timeline.map((row) => {
              const image = hasImage(row.image) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={row.image}
                  alt=""
                  className="w-[486px] shrink-0 max-b1200:w-[350px] max-b860:w-full"
                />
              ) : (
                /* 원본 486×485 정사각 이미지 자리 */
                <div
                  className="aspect-square w-[486px] shrink-0 rounded-full
                             bg-[radial-gradient(circle_at_35%_30%,#e9efe6_0%,#bcd0b4_45%,#7e9a74_100%)]
                             max-b1200:w-[350px] max-b860:w-full"
                />
              );

              const text = (
                <li className="max-b860:w-full">
                  <h6
                    className="mb-[100px] text-[40px] font-bold
                               max-b1200:mb-[50px] max-b1200:text-[35px]
                               max-b520:mb-[25px] max-b520:text-[30px]"
                  >
                    {row.year}
                  </h6>
                  <div>
                    {row.items.map((item) => (
                      /* 원본의 p:last-child 규칙은 선택자 오타(`p :last-child`)라
                         실제로는 적용되지 않습니다. 마지막 항목에도 여백이 남습니다. */
                      <p
                        key={item}
                        className="mb-[50px] text-[24px]
                                   max-b1200:mb-[25px] max-b1200:text-[20px]
                                   max-b520:text-[18px]"
                      >
                        &middot; {item}
                      </p>
                    ))}
                  </div>
                </li>
              );

              return (
                <FadeUp key={row.year}>
                  <ul
                    className={`mb-[200px] flex items-center gap-[60px] max-b860:mb-[100px] ${
                      row.side === "right"
                        ? "justify-between max-b860:flex-col-reverse"
                        : "max-b860:flex-col"
                    }`}
                  >
                    {row.side === "left" ? (
                      <>
                        {image}
                        {text}
                      </>
                    ) : (
                      <>
                        {text}
                        {image}
                      </>
                    )}
                  </ul>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </main>

      <Footer bordered />
    </>
  );
}
