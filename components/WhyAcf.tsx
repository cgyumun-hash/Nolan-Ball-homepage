"use client";

/**
 * 원본 .section_2
 *   height:100vh (1400↓ 80vh · 1080↓ auto + padding 80px 0)
 *   display:flex; align-items:center; justify-content:center; background:#fff
 *   .img_box { position:absolute; right:0; top:50%; transform:translateY(-50%) }
 *             1600↓ top:42%; width:70%    856↓ relative · width:60% · margin:0 auto
 *   h2 { font-size:160px; margin-bottom:90px }
 *        1600↓ 110px · 1080↓ mb:20px · 856↓ 80px+가운데 · 580↓ 68px
 *   a  { display:flex; gap:30px; width:fit-content; margin:0 auto }
 *   a:hover .view_btn { animation: bounce_513 1s infinite }
 */

const BALLS = ["ball-light", "ball-mid", "ball-dark"] as const;

export default function WhyAcf() {
  return (
    <section
      className="flex h-screen w-full items-center justify-center bg-white
                 max-b1400:h-[80vh] max-b1080:h-auto max-b1080:py-20"
    >
      <div className="wrap-in">
        {/* 원본 section_2ball.png 자리 — CSS 그라디언트로 그린 구슬 3개 */}
        <div
          className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center
                     max-b1600:top-[42%]
                     max-b856:relative max-b856:top-0 max-b856:mx-auto max-b856:mb-8
                     max-b856:w-fit max-b856:translate-y-0 max-b856:justify-center"
        >
          {BALLS.map((cls) => (
            <span
              key={cls}
              className={`${cls} -ml-8 block rounded-full shadow-[0_16px_44px_rgba(0,0,0,0.28)]
                          first:ml-0 max-b856:-ml-5`}
              style={{
                width: "clamp(3.5rem, 8.5vw, 9rem)",
                height: "clamp(3.5rem, 8.5vw, 9rem)",
              }}
            />
          ))}
        </div>

        <h2
          className="gfont mb-[90px] text-[160px] font-bold leading-[1.05] text-ink-900
                     max-b1600:text-[110px]
                     max-b1080:mb-5
                     max-b856:text-center max-b856:text-[80px]
                     max-b580:text-[68px]"
        >
          Why ACF
          <br />
          Filter Ball?
        </h2>

        {/* 원본 a.gfont.fs16.fw800 — 16px / 800 (1600↓ 14px) */}
        <a
          href="#"
          className="group mx-auto flex w-fit items-center gap-[30px]
                     text-[16px] font-extrabold text-ink-900 max-b1600:text-[14px]"
        >
          <p className="gfont">VIEW MORE</p>
          {/* 원본 view_btn.png — hover 시 bounce_513 */}
          <span className="inline-block group-hover:[animation:arrow-bounce_1s_infinite]">
            <svg width="46" height="10" viewBox="0 0 46 10" fill="none" aria-hidden>
              <path
                d="M0 5h44M39.5 1 44 5l-4.5 4"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          </span>
        </a>
      </div>
    </section>
  );
}
