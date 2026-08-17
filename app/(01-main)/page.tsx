import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyAcf from "@/components/WhyAcf";
import KeyBenefits from "@/components/KeyBenefits";
import Products from "@/components/Products";
import About from "@/components/About";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";

/**
 * 원본 index.html 의 순서를 따르되, 자료정리 2-2 "핵심 장점 4개"가
 * 메인에 반드시 들어가야 해서 section_2 와 section_3 사이에 한 칸 넣었습니다.
 *
 *   .inquriy_btn   fixed — 스크롤과 무관하게 항상 떠 있음
 *   .header        absolute — 히어로 위에 겹침 (스크롤하면 사라짐)
 *   .main
 *     .section_1   히어로 슬라이더 + 버튼 3개 (md 2-1)
 *     .section_2   CONTACT · WIPE · CHANGE 기술 소개
 *     ─ 신규 ─     핵심 장점 4개 (md 2-2 · 2-3)
 *     .section_3   PRODUCTS
 *     .section_4   ABOUT
 *   .footer
 *
 * 헤더가 absolute 로 히어로 위에 얹히므로 main 에 상단 여백을 주지 않습니다.
 */
export default function Home() {
  return (
    <>
      <InquiryButton hideOnMobile />

      <div className="relative">
        <Header />
        <main>
          <Hero />
          <WhyAcf />
          <KeyBenefits />
          <Products />
          <About />
        </main>
      </div>

      <Footer />
    </>
  );
}
