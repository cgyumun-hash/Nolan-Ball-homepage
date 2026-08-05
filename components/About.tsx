"use client";

import Link from "next/link";

import { ABOUT } from "@/lib/site";

/**
 * 원본 .section_4
 *   padding-top:100px; margin-top:60px   1400↓ margin-top:0
 *   h2  .gfont.fs80 → 80px · margin-left:120px
 *       1600↓ 64px + ml:100px · 1080↓ 50px + ml:0 + 가운데
 *   .w1 { border-top/bottom:1px solid #333; display:flex; position:relative }
 *       1200↓ align-items:center · 1080↓ flex-direction:column-reverse
 *   .s1 { padding:60px; border-left:1px solid #333; margin-left:100px; width:50% }
 *       1600↓ padding:30px · 1200↓ 66% · 1080↓ 80%+가운데+border 제거 · 856↓ 100%
 *   .s2 { position:absolute; bottom:0; right:0; width:43% }
 *       1200↓ relative · 1080↓ 80%+가운데 · 856↓ 100%
 *   p   { font-size:20px; line-height:35px }  1600↓ 18px/30px · 580↓ 16px
 *   .mb40 { margin-bottom:40px }  1600↓ section_4 안에서는 20px
 *   a   { border:1px solid #333; border-radius:50px; padding:10px 30px;
 *         margin-top:30px; float:right; hover → 배경 #333 흰 글씨 }
 *       1600↓ mt:15px + padding 5px 20px · 1080↓ mt:50px + float:left
 */
export default function About() {
  return (
    <section className="mt-[60px] w-full pt-[100px] max-b1400:mt-0">
      <div className="wrap-in">
        <h2
          className="gfont ml-[120px] text-[80px] font-bold uppercase leading-[1.15] text-ink-900
                     max-b1600:ml-[100px] max-b1600:text-[64px]
                     max-b1080:ml-0 max-b1080:text-center max-b1080:text-[50px]"
        >
          ABOUT
          {/* 원본 br.mo_br — section_4 에서는 580px 이하에서만 줄바꿈 */}
          <br className="hidden max-b580:block" /> NOLAN BALL
        </h2>

        {/* .w1 */}
        <div
          className="relative mt-10 flex border-y border-ink-900
                     max-b1200:items-center max-b1080:flex-col-reverse"
        >
          {/* .s1 */}
          <div
            className="ml-[100px] w-1/2 border-l border-ink-900 p-[60px]
                       max-b1600:p-[30px]
                       max-b1200:w-[66%]
                       max-b1080:mx-auto max-b1080:ml-0 max-b1080:w-4/5 max-b1080:border-l-0
                       max-b856:w-full"
          >
            {ABOUT.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mb-10 text-[20px] leading-[35px] last:mb-0
                           max-b1600:mb-5 max-b1600:text-[18px] max-b1600:leading-[30px]
                           max-b580:text-[16px]"
              >
                {p}
              </p>
            ))}

            {/* 원본 a 는 float:right (1080↓ float:left) */}
            <div
              className="mt-[30px] flex justify-end
                         max-b1600:mt-[15px]
                         max-b1080:mt-[50px] max-b1080:justify-start"
            >
              <Link
                href={ABOUT.href}
                className="gfont inline-block rounded-[50px] border border-ink-900 px-[30px] py-2.5
                           text-[16px] font-extrabold transition-colors
                           hover:bg-ink-900 hover:text-white
                           max-b1600:px-5 max-b1600:py-[5px] max-b1600:text-[14px]"
              >
                {ABOUT.cta}
              </Link>
            </div>
          </div>

          {/* .s2 — 원본 section_4bg.jpg */}
          <div
            className="absolute bottom-0 right-0 h-[86%] w-[43%]
                       max-b1200:relative max-b1200:bottom-auto max-b1200:right-auto
                       max-b1200:h-auto max-b1200:min-h-[320px]
                       max-b1080:mx-auto max-b1080:w-4/5
                       max-b856:w-full"
            style={{ backgroundImage: ABOUT.fallback }}
          >
            <div
              className="h-full min-h-[inherit] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${ABOUT.image})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
