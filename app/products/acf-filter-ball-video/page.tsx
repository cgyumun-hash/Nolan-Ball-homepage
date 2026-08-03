import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import FadeDown from "@/components/FadeDown";
import { PRODUCTS_PAGES, PRODUCT_VIDEO, SUBHEADER_BG } from "@/lib/site";

export const metadata: Metadata = {
  title: "ACF Filter Ball Video | 하캄바이오",
};

function hasFile(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub30.php
 *
 *   .subheader_outer.sub03        배경 subheader_3.jpg (1920×655)
 *   .sub30.pt250.pb300            250/300px → 1080↓ 150/200px
 *     .wrap_in2                   1400px (1600↓ 90%)
 *       data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500"
 *       .s1 { font-size:48px; GmarketSans; font-weight:600;
 *             display:flex; gap:15px; align-items:center; margin-bottom:30px }
 *             1200↓ 36px · 520↓ 28px + margin-bottom:10px
 *         .left_box { width:10px; height:50px; background:#1EAC44 }  1200↓ height:35px
 *       .s2 video { width:100% }
 *             <video controls autoplay muted loop>
 */
export default function AcfFilterBallVideoPage() {
  const videoReady = hasFile(PRODUCT_VIDEO.video);

  return (
    <>
      <InquiryButton />
      <Header forceSolid />

      <SubHeader
        eyebrow={PRODUCT_VIDEO.eyebrow}
        title={PRODUCT_VIDEO.title}
        pager={PRODUCTS_PAGES}
        current={PRODUCT_VIDEO.title}
        breadcrumb={[PRODUCT_VIDEO.eyebrow, PRODUCT_VIDEO.title]}
        bg={SUBHEADER_BG.sub03}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        {/* 원본은 wrap_in2 자체에 AOS 를 겁니다 (제목 + 영상이 함께 내려옴) */}
        <FadeDown className="wrap-in2">
          {/* .s1 */}
          <div
            className="gfont mb-[30px] flex items-center gap-[15px] text-[48px] font-semibold
                       max-b1200:text-[36px]
                       max-b520:mb-2.5 max-b520:text-[28px]"
          >
            <div className="h-[50px] w-2.5 shrink-0 bg-brand-500 max-b1200:h-[35px]" />
            {PRODUCT_VIDEO.sectionTitle}
          </div>

          {/* .s2 */}
          <div>
            {videoReady ? (
              <video
                className="w-full"
                src={PRODUCT_VIDEO.video}
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            ) : (
              /* 영상 파일이 없을 때 — 자리와 파일명을 알려줍니다 */
              <div
                className="flex aspect-video w-full flex-col items-center justify-center gap-3
                           rounded-lg border border-dashed border-line bg-[#f4f6f3] text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand-500 text-white">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <p className="gfont text-[18px] font-bold text-ink-900">
                  제품 영상 자리
                </p>
                <p className="text-[14px] text-ink-500">
                  public{PRODUCT_VIDEO.video}
                </p>
                <p className="max-w-md text-[13px] leading-relaxed text-ink-500">
                  mp4 파일을 넣으면 이 자리가 자동 재생·반복되는 영상으로 바뀝니다.
                </p>
              </div>
            )}
          </div>
        </FadeDown>
      </main>

      <Footer bordered />
    </>
  );
}
