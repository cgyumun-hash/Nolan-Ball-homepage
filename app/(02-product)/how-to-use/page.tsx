import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import { HOW_TO_USE, PRODUCTS_PAGES, SUBHEADER_BG } from "@/lib/site";

export const metadata: Metadata = {
  title: "사용 방법",
};

/**
 * PRODUCT 하위의 HOW TO USE 페이지입니다.
 * 레이아웃은 기존 서브페이지(sub21 계열)와 같은 뼈대를 씁니다.
 *   .subheader_outer → SubHeader
 *   main.pt250.pb300 → 1080px 이하 150/200
 *   .wrap_in2        → 본문 폭 1400px
 */
export default function HowToUsePage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />

      <SubHeader
        eyebrow={HOW_TO_USE.eyebrow}
        title={HOW_TO_USE.title}
        pager={PRODUCTS_PAGES}
        current="HOW TO USE"
        breadcrumb={[HOW_TO_USE.eyebrow]}
        bg={SUBHEADER_BG.product}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        <div className="wrap-in2">
          <p
            className="mb-[40px] text-[24px] leading-[1.7] text-ink-900
                       max-b1080:text-[19px] max-b520:text-[17px]"
          >
            {HOW_TO_USE.lead}
          </p>

          {/* 최종 IFU 확정 전까지 노출하는 안내 — 확정되면 이 블록을 지웁니다 */}
          <p
            className="mb-[120px] border-l-[3px] border-brand-500 bg-[#fafafa] py-5 pl-6
                       text-[16px] leading-[1.7] text-ink-500
                       max-b1080:mb-[70px] max-b520:text-[14px]"
          >
            {HOW_TO_USE.notice}
          </p>

          {/* 단계 목록 */}
          <ol className="mb-[160px] max-b1080:mb-[90px]">
            {HOW_TO_USE.steps.map((step) => (
              <li
                key={step.no}
                className="flex gap-[50px] border-t border-line py-[45px] last:border-b
                           max-b980:flex-col max-b980:gap-4 max-b980:py-[30px]"
              >
                <span
                  className="gfont w-[120px] shrink-0 text-[46px] font-bold leading-none text-ink-900
                             max-b1080:text-[36px] max-b980:w-auto"
                >
                  {step.no}
                </span>
              </li>
            ))}
          </ol>

          {/* 주의사항 */}
          <h3
            className="gfont mb-[160px] text-[40px] font-bold text-ink-900
                       max-b1080:mb-[90px]
                       max-b1080:text-[30px] max-b520:text-[24px]"
          >
            {HOW_TO_USE.cautionTitle}
          </h3>

          {/* 제품 가이드 영상 — 파일·링크가 없어 자리만 잡아 둡니다 */}
          <h3
            className="gfont mb-[40px] text-[40px] font-bold text-ink-900
                       max-b1080:text-[30px] max-b520:text-[24px]"
          >
            {HOW_TO_USE.videoTitle}
          </h3>
          <div
            className="flex aspect-video w-full items-center justify-center border border-line
                       bg-[linear-gradient(160deg,#f7f9fc_0%,#e8f0f7_100%)] p-8 text-center
                       text-[15px] leading-[1.8] text-ink-500 max-b520:text-[13px]"
          >
            {HOW_TO_USE.videoNote}
          </div>
        </div>
      </main>

      <Footer bordered />
    </>
  );
}
