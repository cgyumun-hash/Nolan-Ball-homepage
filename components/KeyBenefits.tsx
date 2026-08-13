import Image from "next/image";

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
    <section className="w-full bg-[#f4f8fb] py-[160px] max-b1080:py-[100px] max-b580:py-[64px]">
      <div className="wrap-in2">
        <div className="mb-[100px] grid grid-cols-[minmax(0,1.12fr)_minmax(360px,0.88fr)] items-center gap-[80px]
                        max-b1080:mb-[70px] max-b1080:grid-cols-1 max-b1080:gap-[45px]
                        max-b580:mb-12 max-b580:gap-8">
          <div>
            <h2
              className="gfont mb-[35px] text-[76px] font-bold leading-[1.15] text-ink-900
                         max-b1600:text-[62px] max-b1080:text-[48px] max-b580:text-[36px]"
            >
              {KEY_BENEFITS.heading}
            </h2>
            <p className="mb-6 max-w-[780px] text-[30px] font-bold leading-[1.55] text-ink-900
                          max-b1080:text-[24px] max-b580:text-[20px]">
              {KEY_BENEFITS.keyMessage}
            </p>
            <p className="max-w-[780px] text-[17px] leading-[1.85] text-ink-500
                          max-b1080:text-[15px] max-b580:text-[14px]">
              {KEY_BENEFITS.supportingText}
            </p>
          </div>

          <div className="flex justify-center max-b1080:row-start-1">
            <Image
              src={KEY_BENEFITS.image}
              alt={KEY_BENEFITS.imageAlt}
              width={561}
              height={445}
              className="h-auto w-full max-w-[561px] object-contain"
            />
          </div>
        </div>

        {/* 4개 장점 — 2×2 그리드, 860px 이하 1열 */}
        <ul className="grid grid-cols-2 gap-x-[60px] max-b860:grid-cols-1">
          {KEY_BENEFITS.items.map((item) => (
            <li
              key={item.no}
              className="border-t border-ink-900 py-[40px] max-b580:py-[28px]"
            >
              <span className="gfont mb-4 block text-[18px] font-bold text-sky-600">
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

      </div>
    </section>
  );
}
