import Link from "next/link";

/**
 * 원본 .inquriy_btn  (오타는 원본 클래스명 그대로입니다)
 *   position:fixed; bottom:0; right:50px; z-index:999
 *   animation: inquriy_btn 2s infinite
 *   @keyframes  0% bottom:30px · 50% bottom:50px · 100% bottom:30px
 *   856↓ right:5px
 *
 * bottom 을 애니메이션하면 매 프레임 레이아웃을 다시 계산하므로
 * globals.css 에서 같은 움직임을 transform 으로 구현했습니다.
 * CSS 애니메이션만 쓰므로 서버 컴포넌트입니다.
 */
export default function InquiryButton({ hideOnMobile = false }: { hideOnMobile?: boolean }) {
  return (
    <Link
      href="/customer-support/online-inquiry"
      className={`group fixed bottom-[30px] right-[50px] z-[999] flex items-center gap-4
                  rounded-full border border-line bg-white py-2.5 pr-2.5 pl-7
                  shadow-[0_6px_24px_rgba(0,0,0,0.14)]
                  [animation:inquiry-float_2s_ease-in-out_infinite]
                  max-b856:right-4 max-b856:bottom-4 max-b856:gap-2 max-b856:py-2 max-b856:pr-2 max-b856:pl-4
                  max-b580:[animation:none]
                  ${hideOnMobile ? "max-b580:hidden" : ""}`}
    >
      <span className="text-[15px] font-medium text-ink-900 max-b580:sr-only">
        도입·샘플 문의
      </span>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#3182F6] text-white max-b580:h-8 max-b580:w-8">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M2.5 8h10M9 4.5 12.5 8 9 11.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-[2px]"
          />
        </svg>
      </span>
    </Link>
  );
}
