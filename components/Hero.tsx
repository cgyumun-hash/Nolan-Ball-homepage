"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import { HERO_ACTIONS, SLIDES } from "@/lib/site";
import { EN_HERO_ACTIONS, EN_SLIDES } from "@/lib/site.en";
import { CN_HERO_ACTIONS, CN_SLIDES } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

export default function Hero({ locale = "ko" }: { locale?: SiteLocale }) {
  const slides = selectLocale(locale, SLIDES, EN_SLIDES, CN_SLIDES);
  const actions = selectLocale(locale, HERO_ACTIONS, EN_HERO_ACTIONS, CN_HERO_ACTIONS);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [index, setIndex] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);

  return (
    <section className="relative h-[min(100svh,1080px)] min-h-[720px] overflow-hidden bg-[#eef7fc] max-b1080:min-h-[680px] max-b580:h-[780px] max-b580:min-h-0">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={setSwiper}
        onSlideChange={(instance) => setIndex(instance.realIndex)}
        onAutoplayTimeLeft={(_instance, time, progress) => {
          if (barRef.current) barRef.current.style.transform = `scaleX(${1 - progress})`;
          if (timeRef.current) timeRef.current.textContent = `${Math.ceil(time / 1000)}s`;
        }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <picture className="absolute inset-0 block">
              <source media="(max-width: 580px)" srcSet={slide.imageMobile} />
              <img
                src={slide.image}
                alt=""
                className={`h-full w-full object-cover ${
                  slide.id === "slide_3"
                    ? "max-b580:object-fill"
                    : ""
                }`}
              />
            </picture>

            {slide.id === "slide_1" && (
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,53,121,0.78)_0%,rgba(14,91,170,0.52)_32%,rgba(22,111,190,0.16)_58%,transparent_76%)] max-b580:bg-[linear-gradient(180deg,rgba(7,53,121,0.72)_0%,rgba(14,91,170,0.48)_42%,rgba(22,111,190,0.08)_72%)]"
              />
            )}

            <div className="absolute left-[7.5%] top-[30%] z-10 max-w-[660px] text-white drop-shadow-[0_2px_16px_rgba(0,43,94,0.28)] max-b1400:max-w-[540px] max-b1080:top-[27%] max-b1080:max-w-[460px] max-b580:left-6 max-b580:right-6 max-b580:top-[145px] max-b580:max-w-none">
              <p className="gfont mb-5 text-[15px] font-bold tracking-[0.23em] text-cyan-200 max-b580:mb-3 max-b580:text-[11px]">{slide.eyebrow}</p>
              <h2 className="gfont whitespace-pre-line text-[clamp(48px,4.4vw,78px)] font-extrabold leading-[1.08] tracking-[-0.045em] max-b580:text-[clamp(34px,10vw,48px)]">{slide.lines.join("\n")}</h2>
              <p className="mt-7 max-w-[590px] text-[20px] font-medium leading-[1.7] text-white/90 max-b1080:text-[17px] max-b580:mt-4 max-b580:max-w-[300px] max-b580:text-[14px]">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <nav aria-label={locale === "en" ? "Primary links" : "주요 바로가기"} className="absolute bottom-[105px] right-[7.5%] z-20 flex gap-3 max-b1080:bottom-[92px] max-b580:inset-x-4 max-b580:bottom-[76px] max-b580:gap-1.5">
        {actions.map((action) => (
          <Link key={action.href} href={action.href} className={`gfont flex min-h-12 items-center justify-center rounded-full px-6 text-[14px] font-extrabold shadow-sm transition-colors max-b580:min-h-10 max-b580:min-w-0 max-b580:flex-1 max-b580:px-1 max-b580:text-[10px] ${action.primary ? "bg-blue-700 text-white hover:bg-blue-800" : "border border-white/75 bg-white/85 text-blue-800 backdrop-blur-sm hover:bg-blue-700 hover:text-white"}`}>
            {action.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-[40px] left-[7.5%] z-20 flex items-center gap-4 text-white max-b580:inset-x-5 max-b580:bottom-[28px]">
        <div className="relative h-0.5 w-[280px] overflow-hidden bg-white/25 max-b580:min-w-0 max-b580:flex-1"><span ref={barRef} className="absolute inset-0 origin-left bg-white transition-transform duration-75" /></div>
        <button type="button" onClick={() => swiper?.slidePrev()} aria-label={locale === "en" ? "Previous slide" : "이전 슬라이드"} className="px-1 text-lg">‹</button>
        <span className="gfont text-[15px] font-bold tabular-nums">{index + 1} <span className="opacity-40">/ {slides.length}</span></span>
        <button type="button" onClick={() => swiper?.slideNext()} aria-label={locale === "en" ? "Next slide" : "다음 슬라이드"} className="px-1 text-lg">›</button>
        <span ref={timeRef} className="gfont min-w-6 text-[12px] font-bold opacity-50 tabular-nums" />
      </div>
    </section>
  );
}
