import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import FadeUp from "@/components/FadeUp";
import { ABOUT_CONTACT_PAGES, ORGANIZATION, SUBHEADER_BG } from "@/lib/site";

export const metadata: Metadata = {
  title: "조직도",
  robots: { index: false, follow: false },
};

/** 조직도 이미지가 실제로 있는지 빌드 시점에 확인합니다 */
function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub13.php
 *   .subheader_outer.sub01 → 공통 상단 (SubHeader)
 *   .sub13.pt250.pb300 > .wrap_in2
 *       h4  { font-size:30px; font-weight:400; margin-bottom:250px }
 *            1080↓ 22px + mb:150px · 520↓ 18px + mb:100px
 *       h4 span { color:#FF9D00; font-size:40px; font-weight:bold }
 *            1080↓ 34px · 520↓ 28px
 *       .w1 img { width:100% }   520↓ width:60% + margin:0 auto
 *       .sub13_pc / .sub13_mo → 520px 에서 교체
 *   .pt250 250px (1080↓ 150px) · .pb300 300px (1080↓ 200px)
 *   푸터에 border-top:1px solid #333 인라인
 */
export default function OrganizationPage() {
  const chartReady = hasImage(ORGANIZATION.chartPc);

  return (
    <>
      <InquiryButton />

      {/* 서브페이지 헤더는 항상 흰 배경 (원본 인라인 <style>) */}
      <Header forceSolid />

      <SubHeader
        eyebrow={ORGANIZATION.eyebrow}
        title={ORGANIZATION.title}
        pager={ABOUT_CONTACT_PAGES}
        current={ORGANIZATION.title}
        breadcrumb={[ORGANIZATION.eyebrow, ORGANIZATION.title]}
        bg={SUBHEADER_BG.sub01}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        <div className="wrap-in2">
          <h4
            className="mb-[250px] text-[30px] font-normal leading-[1.6]
                       max-b1080:mb-[150px] max-b1080:text-[22px]
                       max-b520:mb-[100px] max-b520:text-[18px]"
          >
            <span
              className="font-bold text-accent-500 text-[40px]
                         max-b1080:text-[34px] max-b520:text-[28px]"
            >
              {ORGANIZATION.leadHighlight}
            </span>
            {ORGANIZATION.leadRest}
          </h4>

          {/* 원본 data-aos="fade-up" */}
          <FadeUp className="w-full">
            {chartReady ? (
              <>
                {/* .sub13_pc — 520px 초과에서 표시 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ORGANIZATION.chartPc}
                  alt="놀란볼코리아 조직도"
                  className="w-full max-b520:hidden"
                />
                {/* .sub13_mo — 520px 이하에서 표시 (원본 width:60%) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ORGANIZATION.chartMo}
                  alt="놀란볼코리아 조직도"
                  className="mx-auto hidden w-[60%] max-b520:block"
                />
              </>
            ) : (
              /* 조직도 이미지가 아직 없을 때 — 자리와 파일명을 알려줍니다.
                 조직 구성은 원본 이미지 안에만 있어서 지어내지 않았습니다. */
              /* 원본 sub13_w1.png 는 1408×945 — 같은 비율로 자리를 잡습니다 */
              <div
                className="flex aspect-[1408/945] w-full flex-col items-center justify-center gap-3
                           rounded-2xl border border-dashed border-line bg-white text-center"
              >
                <p className="gfont text-[20px] font-bold text-ink-900">
                  조직도 이미지 자리
                </p>
                <p className="text-[14px] text-ink-500">
                  public{ORGANIZATION.chartPc} · public{ORGANIZATION.chartMo}
                </p>
                <p className="max-w-md text-[13px] leading-relaxed text-ink-500">
                  두 파일을 넣으면 이 자리가 자동으로 조직도로 바뀝니다.
                  (520px 이하에서 모바일용으로 교체)
                </p>
              </div>
            )}
          </FadeUp>
        </div>
      </main>

      {/* 원본 서브페이지 푸터는 border-top: 1px solid #333 */}
      <Footer bordered />
    </>
  );
}
