"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { HERO_ACTIONS, SLIDES } from "@/lib/site";
import { EN_HERO_ACTIONS, EN_SLIDES } from "@/lib/site.en";
import type { SiteLocale } from "@/lib/locale";

/**
 * 원본 .section_1
 *   height:100vh (1400↓ 80vh) · overflow:hidden
 *   h2  { position:absolute; bottom:160px; left:8%; color:#fff;
 *         font-size:60px; font-family:"Goblin One"; line-height:100px }
 *         1600↓ 48/75 · 1080↓ 38/56 · 856↓ 28/45 + bottom:130px
 *   .c1 { position:absolute; bottom:100px; left:160px }  1080↓ 60px · 580↓ 26px
 *   .autoplay-progress-bar { width:300px; height:2px; background:rgba(255,255,255,.12) }  856↓ 150px
 *   .nav_bar { left:320px; gap:20px; font-family:"Goblin One"; font-size:18px }  1600↓ 14px
 *
 * Swiper 설정 (원본 index.html)
 *   slidesPerView:1 · spaceBetween:0 · loop:true
 *   autoplay:{ delay:3000, disableOnInteraction:false }
 *   onAutoplayTimeLeft → 진행바 scaleX(1-progress) · 남은 초 표시
 */
export default function Hero({ locale = "ko" }: { locale?: SiteLocale }) {
  const slides = locale === "en" ? EN_SLIDES : SLIDES;
  const heroActions = locale === "en" ? EN_HERO_ACTIONS : HERO_ACTIONS;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);

  /* 진행바와 남은 초는 매 프레임 갱신됩니다.
     state 로 두면 초당 60번 리렌더되므로 원본처럼 DOM 을 직접 만집니다. */
  const barRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-white max-b1400:h-[80vh] max-b580:h-auto">
      <div className="relative h-full w-full overflow-hidden max-b580:h-[78svh] max-b580:min-h-[560px]">
        <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSwiper={setSwiper}
        onSlideChange={(s) => setIndex(s.realIndex)}
        onAutoplayTimeLeft={(_s, time, progress) => {
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${1 - progress})`;
          }
          if (timeRef.current) {
            timeRef.current.textContent = `${Math.ceil(time / 1000)}s`;
          }
        }}
          className="h-full w-full"
        >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* 배경: 그라디언트 위에 사진.
                사진이 없어도 그라디언트가 보여 레이아웃이 깨지지 않습니다. */}
            <div
              className="absolute inset-0"
              style={{ backgroundImage: slide.fallback }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>

            {/* 헤더가 투명이라 상단·하단을 어둡게 해 가독성을 확보합니다.
                놀란볼 자료 사진이 대부분 흰 배경이라 원본(35/40%)보다 진하게 잡았습니다.

                Tailwind 유틸(via-black/35, h-3/5)이 CSS 로 생성되지 않아
                그라디언트를 인라인 스타일로 직접 씁니다.
                사진을 어두운 것으로 바꾸면 아래 수치를 낮추면 됩니다. */}
            <div
              className="absolute inset-x-0 top-0 h-40"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0))",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-[62%]"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.12) 70%, rgba(0,0,0,0) 100%)",
              }}
            />

            {/* 원본은 h2 가 슬라이드 안에 있어 이미지와 함께 넘어갑니다 */}
            <h2
              className="absolute bottom-[160px] left-[8%] right-[8%] font-display font-bold
                         text-[64px] leading-[1.42] tracking-[-0.025em] text-white
                         max-b1600:text-[52px]
                         max-b1080:bottom-[220px] max-b1080:text-[40px]
                         max-b856:bottom-[205px] max-b856:text-[29px] max-b856:leading-[1.4]
                         max-b580:bottom-[185px] max-b580:left-6 max-b580:right-6 max-b580:text-[clamp(25px,7.5vw,31px)] max-b580:leading-[1.3]"
            >
              {slide.lines[0]}
              {/* 원본 br.mo_br — 580px 이하에서 숨겨져 한 줄로 흐릅니다 */}
              <br />{" "}
              {slide.lines[1]}
            </h2>
          </SwiperSlide>
        ))}
        </Swiper>

      {/* ── 버튼 3개 (자료정리 2-1) ───────────────────────────────
          원본에는 없던 영역입니다. 왼쪽 아래 진행바와 부딪히지 않도록
          오른쪽 아래에 두고, 1080px 이하에서는 진행바 위로 올립니다. */}
        <div
          className="absolute bottom-[100px] right-[160px] z-10 flex items-center gap-3
                   max-b1400:right-[60px]
                   max-b1080:bottom-[110px] max-b1080:left-[60px] max-b1080:right-auto
                   max-b580:hidden"
        >
          {heroActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`gfont min-w-0 rounded-[50px] px-[26px] py-3 text-[15px] font-extrabold
                        transition-colors max-b1600:px-5 max-b1600:py-2.5 max-b1600:text-[13px]
                        ${
                          action.primary
                            ? "bg-accent-500 text-white hover:bg-accent-500/90"
                            : "border border-white/70 text-white hover:bg-white hover:text-ink-900"
                        }`}
            >
              {action.label}
            </Link>
          ))}
        </div>

        <nav
          aria-label={locale === "en" ? "Primary links" : "주요 바로가기"}
          className="absolute inset-x-4 bottom-6 z-20 hidden gap-1.5 max-b580:flex"
        >
          {heroActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`gfont flex min-h-10 min-w-0 flex-1 basis-0 items-center justify-center rounded-full px-1 py-2 text-center text-[10px] font-extrabold leading-tight transition-colors ${
                action.primary
                  ? "bg-accent-500 text-white hover:bg-accent-500/90"
                  : "border border-white/70 text-white hover:bg-white hover:text-ink-900"
              }`}
            >
              {action.label}
            </Link>
          ))}
        </nav>

      {/* ── .c1 : 진행바 + ‹ 1 / 3 › ─────────────────────────────── */}
        <div
          className="absolute bottom-[100px] left-[160px] z-10 flex items-center gap-5
                     max-b1080:bottom-[50px] max-b1080:left-[60px]
                     max-b580:bottom-[82px] max-b580:!left-5 max-b580:!right-5 max-b580:gap-3"
        >
        {/* .autoplay-progress-bar */}
          <div className="relative h-[2px] w-[300px] overflow-hidden rounded-[6px] bg-white/12 max-b856:w-[150px] max-b580:min-w-0 max-b580:flex-1">
          <span
            ref={barRef}
            className="absolute inset-0 origin-left scale-x-0 rounded-[6px] bg-white/90
                       transition-transform duration-[80ms] ease-linear"
          />
        </div>

        {/* .nav_bar */}
          <div className="flex shrink-0 items-center gap-5 font-display text-[18px] text-white max-b1600:text-[14px] max-b580:gap-2.5 max-b580:text-[12px]">
          <button
            onClick={() => swiper?.slidePrev()}
            aria-label={locale === "en" ? "Previous slide" : "이전 슬라이드"}
            className="transition-opacity hover:opacity-60"
          >
            ‹
          </button>

          <span className="tabular-nums">
            {index + 1}
            {/* 원본 .swiper-pagination-total { opacity: 0.6 } */}
            <span className="opacity-60"> / {slides.length}</span>
          </span>

          <button
            onClick={() => swiper?.slideNext()}
            aria-label={locale === "en" ? "Next slide" : "다음 슬라이드"}
            className="transition-opacity hover:opacity-60"
          >
            ›
          </button>

          <span ref={timeRef} className="ml-1 text-[13px] opacity-60 tabular-nums" />
          </div>
        </div>
      </div>

    </section>
  );
}
