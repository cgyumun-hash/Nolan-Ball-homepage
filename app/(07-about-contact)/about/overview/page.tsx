import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import RevealBottom from "@/components/RevealBottom";
import { COMPANY_PAGES, OVERVIEW, SUBHEADER_BG } from "@/lib/site";

export const metadata: Metadata = {
  title: "회사소개",
};

function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub11.php
 *
 *   .sub11.pt250 { position:relative }            pt250 250px (1080↓ 150px)
 *     .wrap_in
 *       h2  { font-size:100px; color:#0EC53F; GmarketSans; line-height:110px;
 *             position:absolute; top:0; left:38% }
 *             1600↓ 80/100 · 1400↓ 68/83 + left:43% · 1080↓ 64/72 + left:38%
 *             980↓  position:relative + left:0 · 520↓ 56/64
 *             data-aos="reveal-bottom" (clip-path 커튼)
 *       .w1.mb200 { display:flex; justify-content:space-between;
 *                   align-items:flex-end; padding-top:180px }
 *             980↓ flex-direction:column + align-items:center + padding-top:50px
 *         img   1600↓ width:45% · 980↓ 100%
 *         .s1   { width:45% }  1400↓ 50% · 980↓ 100% + margin-top:50px
 *           p   { margin-bottom:30px; line-height:35px; font-size:20px }
 *                 1400↓ 30/18 · 1080↓ 25/16
 *         .mb200 200px → 520↓ 100px
 *     .w2 { background:sub11_bg.jpg center/cover; color:#fff; height:700px;
 *           display:flex; align-items:center; justify-content:center }
 *           520↓ height:600px
 *       .title { display:flex; gap:20px; margin-bottom:80px }  980↓ 30px
 *         .box { width:10px; height:50px; background:#1EAC44 }  520↓ height:40px
 *         h4   { GmarketSans; font-size:40px }                  980↓ 32px
 *       .c1.fs20 { width:1220px; margin:0 auto }  1600↓ 100%   fs20 20px (520↓ 16px)
 *         ul { display:flex; border-bottom:1px solid #fff; padding:15px 0 }
 *              첫 줄만 인라인으로 border-top 추가
 *           li:nth-child(1) { width:25%; padding-left:80px }
 *                 1400↓ 22%/50px · 1080↓ 25%/15px · 520↓ 38%
 *           li:last-child   { margin-left:80px }
 *                 1400↓ 50px · 1080↓ 15px + width:65%
 *           li 980↓ font-size:14px
 *           .line { width:1px; height:24px; background:#fff }
 */
export default function OverviewPage() {
  const photoReady = hasImage(OVERVIEW.photo);

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

      <main className="relative pt-[250px] max-b1080:pt-[150px]">
        <div className="wrap-in">
          {/* 초록 헤딩 — 980px 이하에서 absolute 를 풀고 흐름 안으로 들어옵니다 */}
          <RevealBottom className="absolute top-0 left-[38%] max-b1400:left-[43%] max-b1080:left-[38%] max-b980:static max-b980:left-0">
            <h2
              className="gfont text-[100px] leading-[110px] text-blue-700
                         max-b1600:text-[80px] max-b1600:leading-[100px]
                         max-b1400:text-[68px] max-b1400:leading-[83px]
                         max-b1080:text-[64px] max-b1080:leading-[72px]
                         max-b520:text-[56px] max-b520:leading-[64px]"
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
            </h2>
          </RevealBottom>

          {/* .w1.mb200 */}
          <div
            className="mb-[200px] flex items-end justify-between pt-[180px]
                       max-b980:flex-col max-b980:items-center max-b980:pt-[50px]
                       max-b520:mb-[100px]"
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
            )}

            {/* .s1 */}
            <div className="w-[45%] max-b1400:w-1/2 max-b980:mt-[50px] max-b980:w-full">
              {OVERVIEW.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="mb-[30px] text-[20px] leading-[35px] last:mb-0
                             max-b1400:text-[18px] max-b1400:leading-[30px]
                             max-b1080:text-[16px] max-b1080:leading-[25px]"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* .w2 — 화면 폭 전체를 쓰는 회사 개요 밴드 */}
        <div
          className="relative flex h-[700px] items-center justify-center bg-cover bg-center
                     bg-no-repeat text-white max-b520:h-[600px]"
          style={{ backgroundImage: OVERVIEW.companyBgFallback }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${OVERVIEW.companyBg})` }}
          />

          <div className="wrap-in2 relative">
            {/* .title */}
            <div className="mb-[80px] flex gap-5 max-b980:mb-[30px]">
              <div className="h-[50px] w-2.5 shrink-0 bg-brand-500 max-b520:h-[40px]" />
              <h4 className="gfont text-[40px] max-b980:text-[32px]">
                {OVERVIEW.companyTitle}
              </h4>
            </div>

            {/* .c1.fs20 */}
            <div className="mx-auto w-[1220px] text-[20px] max-b1600:w-full max-b520:text-[16px]">
              {OVERVIEW.company.map((row, i) => (
                <ul
                  key={row.label}
                  className={`flex border-b border-white py-[15px] max-b980:text-[14px] ${
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
                  <li className="ml-[80px] max-b1400:ml-[50px] max-b1080:ml-[15px] max-b1080:w-[65%]">
                    {row.value}
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer bordered />
    </>
  );
}
