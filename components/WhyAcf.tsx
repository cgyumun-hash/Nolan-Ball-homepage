import Link from "next/link";

import { WHY } from "@/lib/site";

/**
 * 메인 기술 소개 섹션.
 * 데스크톱에서는 3행 타이틀과 360° 모티프를 좌우로 배치하고,
 * 작은 화면에서는 모티프를 타이틀 아래로 내려 읽기 흐름을 유지합니다.
 */
export default function WhyAcf() {
  return (
    <section
      id="why-nolan-ball"
      aria-labelledby="why-nolan-ball-title"
      className="flex min-h-screen w-full items-center overflow-hidden bg-white py-24
                 max-b1080:min-h-0 max-b1080:py-[140px]
                 max-b580:py-[100px]"
    >
      <div
        className="wrap-in flex items-center justify-between pr-[1.9%]
                   max-b1200:pr-0
                   max-b856:flex-col max-b856:items-stretch"
      >
        <div className="shrink-0">
          <h2
            id="why-nolan-ball-title"
            className="font-sans text-[108px] font-extrabold leading-none tracking-[-0.045em] text-[#222]
                       max-b1600:text-[96px]
                       max-b1200:text-[84px]
                       max-b856:text-[64px]
                       max-b580:text-[clamp(48px,15vw,60px)]"
          >
            {WHY.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <Link
            href={WHY.href}
            className="group ml-[3px] mt-[54px] flex w-fit items-center gap-[22px]
                       text-[16px] font-bold tracking-[0.13em] text-brand-500
                       max-b1200:mt-10 max-b1200:text-[14px]
                       max-b580:mt-8 max-b580:gap-4 max-b580:text-[12px]"
          >
            <span className="gfont">{WHY.cta}</span>
            <span className="inline-flex group-hover:[animation:arrow-bounce_1s_infinite]">
              <svg
                width="34"
                height="12"
                viewBox="0 0 34 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 6h32M27 1l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </span>
          </Link>
        </div>

        <div
          className="flex w-[324px] shrink-0 -translate-y-[45px] items-center gap-7 text-brand-500
                     max-b1600:w-[290px]
                     max-b1200:w-[250px] max-b1200:gap-5
                     max-b856:mt-16 max-b856:w-[min(100%,290px)] max-b856:translate-y-0 max-b856:self-end
                     max-b580:mt-14 max-b580:w-[min(78%,260px)] max-b580:gap-4"
          aria-label={WHY.contact}
        >
          <span
            className="gfont shrink-0 text-[28px] font-bold leading-none tracking-[0.04em]
                       max-b1200:text-[24px] max-b580:text-[20px]"
          >
            {WHY.contact}
          </span>
          <span className="h-0.5 flex-1 bg-current" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
