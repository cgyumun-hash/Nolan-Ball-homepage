import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyAcf from "@/components/WhyAcf";
import Products from "@/components/Products";
import About from "@/components/About";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";

/**
 * 원본 index.html 의 순서를 그대로 따릅니다.
 *
 *   .inquriy_btn   fixed — 스크롤과 무관하게 항상 떠 있음
 *   .header        absolute — 히어로 위에 겹침 (스크롤하면 사라짐)
 *   .main
 *     .section_1   히어로 슬라이더
 *     .section_2   Why ACF Filter Ball?
 *     .section_3   PRODUCTS
 *     .section_4   ABOUT HAKAM BIO
 *   .footer
 *
 * 헤더가 absolute 로 히어로 위에 얹히므로 main 에 상단 여백을 주지 않습니다.
 */
export default function Home() {
  return (
    <>
      <InquiryButton />

      <div className="relative">
        <Header />
        <main>
          <Hero />
          <WhyAcf />
          <Products />
          <About />
        </main>
      </div>

      <Footer />
    </>
  );
}
