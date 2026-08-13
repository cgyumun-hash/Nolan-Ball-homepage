import Link from "next/link";

/**
 * 서브페이지 공통 상단 — About Us 5개 · Business Areas · Products … 모두 공유합니다.
 *
 * 원본 /css/sub.css
 *   .subheader_outer { padding-top:80px }              1080↓ 50px
 *   .sub01 .subheader { background:subheader_1.jpg center/cover; color:#fff;
 *                       height:608px; border-bottom-left/right-radius:150px }
 *                       1400↓ height:65vh + radius:100px · 1080↓ 50px · 980↓ 25px
 *   .sub_txt_wrap { position:absolute; top:50%; left:160px; translateY(-50%) }
 *                   1600↓ left:100px · 980↓ 50px · 520↓ 30px
 *   .subheader h2 { font-size:36px; margin-bottom:20px }
 *                   1600↓ 24px + mb:0 · 980↓ 20px
 *   .subheader h1 { font-size:80px; font-family:GmarketSans }
 *                   1600↓ 68px · 980↓ 36px · 520↓ 30px
 *   .sub_pager { position:absolute; bottom:0; left:50%; translateX(-50%);
 *                background:rgba(0,0,0,.6); padding:10px 0; width:80%;
 *                border-top-left/right-radius:30px }
 *     li { display:inline-block; margin:0 30px }   1600↓ 25px · 520↓ 10px
 *     a  { color:#fff; font-size:18px }            1400↓ 16px · 520↓ 14px
 *     a.on { font-weight:bold } + ::before 10px 흰 점
 *   .clumble ul { display:flex }  li { margin-right:10px }
 *                 860↓ 14px · 520↓ 12px       .op40 { opacity:.4 }
 */

type PagerItem = { readonly label: string; readonly href: string };

export default function SubHeader({
  eyebrow,
  title,
  pager,
  current,
  breadcrumb,
  bg,
}: {
  /** Business Areas 처럼 대분류 표기가 없는 페이지는 생략합니다 (원본은 h2 를 주석 처리) */
  eyebrow?: string;
  title: string;
  pager: readonly PagerItem[];
  /** 현재 페이지 label — 원본의 class="on" */
  current: string;
  /** Home 다음에 올 항목들 */
  breadcrumb: string[];
  bg: {
    image: string;
    fallback: string;
    position?: string;
    overlay?: string;
    selectiveBlur?: boolean;
  };
}) {
  return (
    <div className="pt-[80px] max-b1080:pt-[50px] max-b580:pt-[46px]">
      <div
        className="relative h-[608px] overflow-hidden rounded-b-[150px] bg-cover bg-center
                   bg-no-repeat text-white
                   max-b1400:h-[65vh] max-b1400:rounded-b-[100px]
                   max-b1080:rounded-b-[50px]
                   max-b980:rounded-b-[25px]
                   max-b580:h-[430px] max-b580:rounded-b-[20px]"
        style={{ backgroundImage: bg.fallback }}
      >
        {/* bg.image 가 빈 문자열이면 사진 레이어를 아예 그리지 않고
            위 그라디언트만 보여 줍니다 (lib/site.ts 의 SUBHEADER_BG 주석 참고) */}
        {bg.image && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${bg.image})`,
                backgroundPosition: bg.position ?? "center",
              }}
            />
            {bg.selectiveBlur && (
              <div
                className="absolute inset-[-3px] bg-cover bg-center bg-no-repeat blur-[1px]"
                aria-hidden
                style={{
                  backgroundImage: `url(${bg.image})`,
                  backgroundPosition: bg.position ?? "center",
                  maskImage:
                    "linear-gradient(90deg, #000 0%, #000 48%, rgba(0,0,0,0.75) 62%, transparent 84%)",
                  WebkitMaskImage:
                    "linear-gradient(90deg, #000 0%, #000 48%, rgba(0,0,0,0.75) 62%, transparent 84%)",
                }}
              />
            )}
            <div
              className="absolute inset-0"
              style={{
                background:
                  bg.overlay ??
                  "linear-gradient(90deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.04) 52%, rgba(0,0,0,0) 100%)",
              }}
            />
          </>
        )}

        {/* .sub_txt_wrap */}
        <div
          className="absolute top-1/2 left-[160px] max-w-[calc(100%-320px)] -translate-y-1/2
                     max-b1600:left-[100px] max-b1600:max-w-[calc(100%-200px)]
                     max-b980:left-[50px] max-b980:max-w-[calc(100%-100px)]
                     max-b520:left-6 max-b520:max-w-[calc(100%-48px)]"
        >
          {eyebrow && (
            <h2 className="headline-font mb-5 text-[36px] leading-tight max-b1600:mb-0 max-b1600:text-[24px] max-b980:text-[20px]">
              {eyebrow}
            </h2>
          )}
          <h1 className="headline-font text-[80px] leading-[1.08] max-b1600:text-[68px] max-b980:text-[36px] max-b520:text-[30px]">
            {title}
          </h1>
        </div>

        {/* .sub_pager */}
        <nav
          className="absolute bottom-0 left-1/2 w-[80%] -translate-x-1/2 rounded-t-[30px]
                     bg-black/60 py-2.5 text-center
                     max-b580:w-[calc(100%-32px)] max-b580:overflow-x-auto max-b580:rounded-t-[18px] max-b580:px-3"
        >
          <ul className="max-b580:flex max-b580:w-max max-b580:min-w-full max-b580:items-center max-b580:justify-start">
            {pager.map((item) => {
              const on = item.label === current;
              return (
                <li key={item.label} className="mx-[30px] inline-block max-b1600:mx-[25px] max-b580:mx-3 max-b580:shrink-0">
                  <Link
                    href={item.href}
                    className={`whitespace-nowrap text-[18px] text-white max-b1400:text-[16px] max-b520:text-[13px] ${
                      on ? "font-bold" : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    {/* 원본 a.on:before — 10px 흰 원 */}
                    {on && (
                      <span className="mr-2.5 mb-0.5 inline-block h-2.5 w-2.5 rounded-full bg-white align-middle" />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* .clumble.wrap_in.mt20 — 빵부스러기 */}
      <div className="wrap-in mt-5">
        <ul className="flex items-center text-ink-900 max-b860:text-[14px] max-b520:text-[12px]">
          <li className="mr-2.5">
            <Link href="/" className="hover:text-sky-600">
              Home
            </Link>
          </li>
          {breadcrumb.map((crumb) => (
            <li key={crumb} className="flex items-center">
              {/* 원본 <i class="fa fa-caret-right"> + .op40 */}
              <span className="mr-2.5 opacity-40" aria-hidden>
                <svg width="8" height="10" viewBox="0 0 8 10" fill="currentColor">
                  <path d="M0 0l8 5-8 5z" />
                </svg>
              </span>
              <span className="mr-2.5">{crumb}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
