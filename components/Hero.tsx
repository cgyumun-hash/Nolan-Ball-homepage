"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { HERO_ACTIONS, SLIDES } from "@/lib/site";
import { EN_HERO_ACTIONS, EN_SLIDES } from "@/lib/site.en";
import { CN_HERO_ACTIONS, CN_SLIDES } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

const SLIDE_DURATION_MS = 5000;

type HeroSlideAsset = {
  image: string;
  imageMobile: string;
};

function preloadHeroSlide(slide: HeroSlideAsset, onReady: () => void) {
  const preload = new window.Image();
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    onReady();
  };

  preload.onload = finish;
  preload.onerror = finish;
  preload.src = window.matchMedia("(max-width: 580px)").matches
    ? slide.imageMobile
    : slide.image;

  if (preload.complete) finish();
}

export default function Hero({ locale = "ko" }: { locale?: SiteLocale }) {
  const slides = selectLocale(locale, SLIDES, EN_SLIDES, CN_SLIDES);
  const actions = selectLocale(locale, HERO_ACTIONS, EN_HERO_ACTIONS, CN_HERO_ACTIONS);
  const isEnglish = locale === "en";
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const pointerStartX = useRef<number | null>(null);
  const transitionRequest = useRef(0);
  const slide = slides[index] ?? slides[0];

  useEffect(() => {
    const advance = window.setTimeout(() => {
      const nextIndex = (index + 1) % slides.length;
      const requestId = transitionRequest.current + 1;
      transitionRequest.current = requestId;
      setCycle((current) => current + 1);
      preloadHeroSlide(slides[nextIndex], () => {
        if (transitionRequest.current === requestId) setIndex(nextIndex);
      });
    }, SLIDE_DURATION_MS);

    return () => {
      window.clearTimeout(advance);
    };
  }, [cycle, index, slides]);

  useEffect(() => {
    const preloadTimer = window.setTimeout(() => {
      const nextSlide = slides[(index + 1) % slides.length];
      const preload = new window.Image();
      preload.src = window.matchMedia("(max-width: 580px)").matches
        ? nextSlide.imageMobile
        : nextSlide.image;
    }, 750);

    return () => window.clearTimeout(preloadTimer);
  }, [index, slides]);

  const move = (direction: -1 | 1) => {
    const nextIndex = (index + direction + slides.length) % slides.length;
    const requestId = transitionRequest.current + 1;
    transitionRequest.current = requestId;
    setCycle((current) => current + 1);
    preloadHeroSlide(slides[nextIndex], () => {
      if (transitionRequest.current === requestId) setIndex(nextIndex);
    });
  };

  return (
    <section
      className="relative h-[min(100svh,1080px)] min-h-[720px] w-full min-w-0 touch-pan-y overflow-hidden bg-[#eef7fc] max-b1080:min-h-[680px] max-b580:h-[780px] max-b580:min-h-0"
      onPointerDown={(event) => {
        pointerStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStartX.current === null) return;
        const distance = event.clientX - pointerStartX.current;
        pointerStartX.current = null;
        if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
      }}
      onPointerCancel={() => {
        pointerStartX.current = null;
      }}
    >
      <div key={slide.id} className="hero-slide-enter absolute inset-0">
        <picture className="absolute inset-0 block min-w-0 overflow-hidden">
          <source media="(max-width: 580px)" srcSet={slide.imageMobile} />
          <img
            src={slide.image}
            alt=""
            loading="eager"
            fetchPriority={index === 0 ? "high" : "auto"}
            decoding="async"
            className={`h-full w-full object-cover object-center ${
              slide.id === "slide_3" ? "max-b580:object-[62%_center]" : ""
            }`}
          />
        </picture>

        {slide.id === "slide_1" && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,53,121,0.78)_0%,rgba(14,91,170,0.52)_32%,rgba(22,111,190,0.16)_58%,transparent_76%)] max-b580:bg-[linear-gradient(180deg,rgba(7,53,121,0.72)_0%,rgba(14,91,170,0.48)_42%,rgba(22,111,190,0.08)_72%)]"
          />
        )}

        <div
          className={`absolute left-[7.5%] z-10 min-w-0 text-white drop-shadow-[0_2px_16px_rgba(0,43,94,0.28)] ${
            isEnglish
              ? "bottom-[150px] max-w-[800px] max-b1400:max-w-[660px] max-b1080:bottom-auto max-b1080:left-[5%] max-b1080:top-[48%] max-b1080:max-w-[560px] max-b580:left-6 max-b580:right-6 max-b580:top-[330px] max-b580:max-w-none"
              : "top-[60%] max-w-[660px] max-b1400:max-w-[540px] max-b1080:top-[59%] max-b1080:max-w-[460px] max-b580:left-6 max-b580:right-6 max-b580:top-[360px] max-b580:max-w-none"
          }`}
        >
          <p className="gfont mb-5 min-w-0 max-w-full break-words text-[15px] font-bold tracking-[0.23em] text-cyan-200 max-b580:mb-3 max-b580:text-[11px]">
            {slide.eyebrow}
          </p>
          <h2
            className={`gfont min-w-0 max-w-full break-words whitespace-pre-line font-extrabold tracking-[-0.045em] ${
              isEnglish
                ? slide.id === "slide_3"
                  ? "min-h-[clamp(82px,9.5vw,168px)] text-[clamp(36px,3.3vw,58px)] leading-[1.14] max-b1080:text-[36px] max-b580:min-h-[78px] max-b580:text-[clamp(27px,7vw,32px)] max-b580:leading-[1.16]"
                  : "min-h-[clamp(82px,9.5vw,168px)] text-[clamp(38px,3.6vw,64px)] leading-[1.06] max-b1080:text-[38px] max-b580:min-h-[78px] max-b580:text-[clamp(29px,7.5vw,34px)] max-b580:leading-[1.08]"
                : "text-[clamp(48px,4.4vw,78px)] leading-[1.08] max-b580:text-[clamp(34px,10vw,48px)]"
            }`}
          >
            {slide.lines.join("\n")}
          </h2>
          <p
            className={
              isEnglish
                ? "mt-5 min-w-0 max-w-[640px] break-words text-[18px] font-medium leading-[1.55] text-white/90 max-b1080:mt-4 max-b1080:text-[15px] max-b580:max-w-full max-b580:text-[13px] max-b580:leading-[1.45]"
                : "mt-7 min-w-0 max-w-[590px] break-words text-[20px] font-medium leading-[1.7] text-white/90 max-b1080:text-[17px] max-b580:mt-4 max-b580:max-w-full max-b580:text-[14px]"
            }
          >
            {slide.description}
          </p>
        </div>
      </div>

      <nav
        aria-label={locale === "en" ? "Primary links" : locale === "cn" ? "主要链接" : "주요 바로가기"}
        className="absolute bottom-[105px] right-[7.5%] z-20 flex min-w-0 gap-3 max-b1080:bottom-[92px] max-b580:inset-x-4 max-b580:bottom-[76px] max-b580:grid max-b580:grid-cols-3 max-b580:gap-1.5"
      >
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`gfont flex min-h-12 min-w-0 items-center justify-center break-words rounded-full px-6 text-center text-[14px] font-extrabold leading-tight shadow-sm transition-colors max-b580:min-h-10 max-b580:w-full max-b580:px-1.5 max-b580:py-2 max-b580:text-[10px] ${
              action.primary
                ? "bg-blue-700 text-white hover:bg-blue-800"
                : "border border-white/75 bg-white/85 text-blue-800 backdrop-blur-sm hover:bg-blue-700 hover:text-white"
            }`}
          >
            {action.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-[40px] left-[7.5%] z-20 flex min-w-0 items-center gap-4 text-white max-b580:inset-x-5 max-b580:bottom-[28px] max-b580:gap-2.5">
        <div className="relative h-0.5 w-[280px] overflow-hidden bg-white/25 max-b580:min-w-0 max-b580:flex-1">
          <span key={`${index}-${cycle}`} className="hero-progress absolute inset-0 origin-left bg-white" />
        </div>
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={locale === "en" ? "Previous slide" : "이전 슬라이드"}
          className="px-1 text-lg"
        >
          ‹
        </button>
        <span className="gfont text-[15px] font-bold tabular-nums">
          {index + 1} <span className="opacity-40">/ {slides.length}</span>
        </span>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label={locale === "en" ? "Next slide" : "다음 슬라이드"}
          className="px-1 text-lg"
        >
          ›
        </button>
        <span className="gfont min-w-6 text-[12px] font-bold opacity-50 tabular-nums">
          {SLIDE_DURATION_MS / 1000}s
        </span>
      </div>
    </section>
  );
}
