"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { SLIDES } from "@/lib/site";

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
export default function Hero() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);

  /* 진행바와 남은 초는 매 프레임 갱신됩니다.
     state 로 두면 초당 60번 리렌더되므로 원본처럼 DOM 을 직접 만집니다. */
  const barRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  return (
    <section className="relative h-screen w-full overflow-hidden max-b1400:h-[80vh]">
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
        {SLIDES.map((slide) => (
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

            {/* 헤더가 투명이라 상단·하단을 살짝 어둡게 해 가독성을 확보합니다 */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/35 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

            {/* 원본은 h2 가 슬라이드 안에 있어 이미지와 함께 넘어갑니다 */}
            <h2
              className="absolute bottom-[160px] left-[8%] right-[8%] font-display
                         text-[60px] leading-[100px] text-white
                         max-b1600:text-[48px] max-b1600:leading-[75px]
                         max-b1080:text-[38px] max-b1080:leading-[56px]
                         max-b856:bottom-[130px] max-b856:text-[28px] max-b856:leading-[45px]"
            >
              {slide.lines[0]}
              {/* 원본 br.mo_br — 580px 이하에서 숨겨져 한 줄로 흐릅니다 */}
              <br className="max-b580:hidden" />{" "}
              {slide.lines[1]}
            </h2>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── .c1 : 진행바 + ‹ 1 / 3 › ─────────────────────────────── */}
      <div
        className="absolute bottom-[100px] left-[160px] z-10 flex items-center gap-5
                   max-b1080:left-[60px] max-b580:left-[26px]"
      >
        {/* .autoplay-progress-bar */}
        <div className="relative h-[2px] w-[300px] overflow-hidden rounded-[6px] bg-white/12 max-b856:w-[150px]">
          <span
            ref={barRef}
            className="absolute inset-0 origin-left scale-x-0 rounded-[6px] bg-white/90
                       transition-transform duration-[80ms] ease-linear"
          />
        </div>

        {/* .nav_bar */}
        <div className="flex items-center gap-5 font-display text-[18px] text-white max-b1600:text-[14px]">
          <button
            onClick={() => swiper?.slidePrev()}
            aria-label="이전 슬라이드"
            className="transition-opacity hover:opacity-60"
          >
            ‹
          </button>

          <span className="tabular-nums">
            {index + 1}
            {/* 원본 .swiper-pagination-total { opacity: 0.6 } */}
            <span className="opacity-60"> / {SLIDES.length}</span>
          </span>

          <button
            onClick={() => swiper?.slideNext()}
            aria-label="다음 슬라이드"
            className="transition-opacity hover:opacity-60"
          >
            ›
          </button>

          <span ref={timeRef} className="ml-1 text-[13px] opacity-60 tabular-nums" />
        </div>
      </div>
    </section>
  );
}
