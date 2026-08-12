import { KEY_BENEFITS } from "@/lib/site";

/**
 * 자료정리 2-2 "핵심 장점 4개" + 2-3 "짧은 소개 문구"와
 * 사용자 요청으로 추가한 지속가능성 보조 문구.
 *
 * 원본 하캄바이오 메인에는 없던 섹션이라, 기존 서브페이지에서 쓰던
 * 뼈대(.wrap_in2 · 40px 헤딩 · 구분선 리스트)를 그대로 가져와 맞췄습니다.
 * section_2(Why) 와 section_3(PRODUCTS) 사이에 들어갑니다.
 *
 * 애니메이션이 없어 서버 컴포넌트입니다.
 */
export default function KeyBenefits() {
  return (
    <section className="w-full py-[160px] max-b1080:py-[100px] max-b580:py-[70px]">
      <div className="wrap-in2">
        <h2
          className="gfont mb-[40px] text-[80px] font-bold leading-[1.15] text-ink-900
                     max-b1600:text-[64px] max-b1080:text-[48px] max-b580:text-[36px]"
        >
          {KEY_BENEFITS.heading}
        </h2>

        <p
          className="mb-[100px] max-w-[900px] text-[20px] leading-[1.8] text-ink-500
                     max-b1080:mb-[60px] max-b1080:text-[17px] max-b580:text-[15px]"
        >
          {KEY_BENEFITS.lead}
        </p>

        {/* 4개 장점 — 2×2 그리드, 860px 이하 1열 */}
        <ul className="grid grid-cols-2 gap-x-[60px] max-b860:grid-cols-1">
          {KEY_BENEFITS.items.map((item) => (
            <li
              key={item.no}
              className="border-t border-ink-900 py-[40px] max-b580:py-[28px]"
            >
              <span className="gfont mb-4 block text-[18px] font-bold text-brand-500">
                {item.no}
              </span>
              <h3
                className="mb-3 text-[28px] font-bold text-ink-900
                           max-b1080:text-[22px] max-b580:text-[19px]"
              >
                {item.title}
              </h3>
              <p
                className="text-[17px] leading-[1.8] text-ink-500
                           max-b1080:text-[15px] max-b580:text-[14px]"
              >
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <div
          className="mt-[70px] grid grid-cols-[220px_1fr] gap-[50px] border-y border-brand-500
                     bg-[#f4f8f3] px-[50px] py-[45px]
                     max-b860:grid-cols-1 max-b860:gap-4 max-b860:px-[30px]
                     max-b580:mt-[45px] max-b580:px-5 max-b580:py-[30px]"
        >
          <p className="gfont text-[17px] font-bold tracking-[0.08em] text-brand-500">
            {KEY_BENEFITS.sustainability.eyebrow}
          </p>
          <div>
            <h3 className="mb-3 text-[28px] font-bold text-ink-900 max-b1080:text-[22px] max-b580:text-[19px]">
              {KEY_BENEFITS.sustainability.title}
            </h3>
            <p className="text-[17px] leading-[1.8] text-ink-500 max-b1080:text-[15px] max-b580:text-[14px]">
              {KEY_BENEFITS.sustainability.body}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
