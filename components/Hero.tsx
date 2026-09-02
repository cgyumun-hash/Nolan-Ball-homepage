"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

import { HERO_ACTIONS, SLIDES } from "@/lib/site";
import { EN_HERO_ACTIONS, EN_SLIDES } from "@/lib/site.en";
import { CN_HERO_ACTIONS, CN_SLIDES } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

const SLIDE_DURATION_MS = 5000;
const CROSSFADE_DURATION_MS = 620;

type HeroSlideAsset = {
  image: string;
  imageMobile: string;
};

type HeroSlide = HeroSlideAsset & {
  id: string;
  eyebrow: string;
  lines: readonly string[];
  description: string;
};

function preloadHeroSlide(slide: HeroSlideAsset, onReady: (loaded: boolean) => void) {
  const preload = new window.Image();
  let settled = false;
  const finish = (loaded: boolean) => {
    if (settled) return;
    settled = true;
    onReady(loaded);
  };

  preload.onload = () => finish(true);
  preload.onerror = () => finish(false);
  preload.src = window.matchMedia("(max-width: 580px)").matches
    ? slide.imageMobile
    : slide.image;

  if (preload.complete) finish(preload.naturalWidth > 0);
}

function HeroSlideLayer({
  slide,
  isEnglish,
  state,
  animateCopy,
  highPriority,
}: {
  slide: HeroSlide;
  isEnglish: boolean;
  state: "static" | "current" | "previous";
  animateCopy: boolean;
  highPriority: boolean;
}) {
  const layerClass =
    state === "current"
      ? "hero-layer-current"
      : state === "previous"
        ? "hero-layer-previous"
        : "hero-layer-static";
  const mediaClass = state === "previous" ? "hero-media-hold" : `hero-media-${slide.id}`;

  return (
    <div
      className={`hero-slide-layer absolute inset-0 ${layerClass}`}
      aria-hidden={state === "previous" ? true : undefined}
    >
      <picture className="absolute inset-0 block min-w-0 overflow-hidden">
        <source media="(max-width: 580px)" srcSet={slide.imageMobile} />
        <img
          src={slide.image}
          alt=""
          loading="eager"
          fetchPriority={highPriority ? "high" : "auto"}
          decoding="async"
          className={`hero-media h-full w-full object-cover object-center ${mediaClass} ${
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
          animateCopy ? "hero-copy-enter" : ""
        } ${
          isEnglish
            ? "bottom-[150px] max-w-[800px] max-b1400:max-w-[660px] max-b1080:bottom-auto max-b1080:left-[5%] max-b1080:top-[48%] max-b1080:max-w-[560px] max-b580:left-6 max-b580:right-6 max-b580:top-[330px] max-b580:max-w-none"
            : "top-[60%] max-w-[660px] max-b1400:max-w-[540px] max-b1080:top-[59%] max-b1080:max-w-[460px] max-b580:left-6 max-b580:right-6 max-b580:top-[360px] max-b580:max-w-none"
        }`}
      >
        <p className="hero-copy-item hero-copy-eyebrow gfont mb-5 min-w-0 max-w-full break-words text-[15px] font-bold tracking-[0.23em] text-cyan-200 max-b580:mb-3 max-b580:text-[11px]">
          {slide.eyebrow}
        </p>
        <h2
          className={`hero-copy-item hero-copy-title gfont min-w-0 max-w-full break-words whitespace-pre-line font-extrabold tracking-[-0.045em] ${
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
          className={`hero-copy-item hero-copy-description ${
            isEnglish
              ? "mt-5 min-w-0 max-w-[640px] break-words text-[18px] font-medium leading-[1.55] text-white/90 max-b1080:mt-4 max-b1080:text-[15px] max-b580:max-w-full max-b580:text-[13px] max-b580:leading-[1.45]"
              : "mt-7 min-w-0 max-w-[590px] break-words text-[20px] font-medium leading-[1.7] text-white/90 max-b1080:text-[17px] max-b580:mt-4 max-b580:max-w-full max-b580:text-[14px]"
          }`}
        >
          {slide.description}
        </p>
      </div>
    </div>
  );
}

export default function Hero({ locale = "ko" }: { locale?: SiteLocale }) {
  const slides = selectLocale(locale, SLIDES, EN_SLIDES, CN_SLIDES);
  const actions = selectLocale(locale, HERO_ACTIONS, EN_HERO_ACTIONS, CN_HERO_ACTIONS);
  const isEnglish = locale === "en";
  const [index, setIndex] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isPointerPaused, setIsPointerPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [isTransitionPending, setIsTransitionPending] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const transitionRequest = useRef(0);
  const indexRef = useRef(0);
  const cleanupTimer = useRef<number | null>(null);
  const advanceTimer = useRef<number | null>(null);
  const timerStartedAt = useRef<number | null>(null);
  const remainingDuration = useRef(SLIDE_DURATION_MS);
  const previousSlide = previousIndex === null ? null : (slides[previousIndex] ?? null);
  const isPlaybackPaused =
    prefersReducedMotion ||
    !isDocumentVisible ||
    isUserPaused ||
    isPointerPaused ||
    isFocusPaused ||
    isTransitionPending;

  const clearAdvanceTimer = useCallback((preserveRemaining: boolean) => {
    if (advanceTimer.current !== null) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    if (preserveRemaining && timerStartedAt.current !== null) {
      const elapsed = Date.now() - timerStartedAt.current;
      remainingDuration.current = Math.max(100, remainingDuration.current - elapsed);
    }
    timerStartedAt.current = null;
  }, []);

  const commitSlide = useCallback((nextIndex: number) => {
    const currentIndex = indexRef.current;
    if (nextIndex === currentIndex) return;

    if (cleanupTimer.current !== null) window.clearTimeout(cleanupTimer.current);
    setPreviousIndex(currentIndex);
    indexRef.current = nextIndex;
    setIndex(nextIndex);
    cleanupTimer.current = window.setTimeout(() => {
      setPreviousIndex(null);
      cleanupTimer.current = null;
    }, CROSSFADE_DURATION_MS);
  }, []);

  const requestSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex === indexRef.current) return;

      clearAdvanceTimer(false);
      remainingDuration.current = SLIDE_DURATION_MS;
      setCycle((current) => current + 1);
      setIsTransitionPending(true);
      const requestId = transitionRequest.current + 1;
      transitionRequest.current = requestId;
      preloadHeroSlide(slides[nextIndex], (loaded) => {
        if (transitionRequest.current !== requestId) return;
        if (loaded) commitSlide(nextIndex);
        setIsTransitionPending(false);
      });
    },
    [clearAdvanceTimer, commitSlide, slides],
  );

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setPrefersReducedMotion(motionQuery.matches);
    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);
    return () => motionQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => {
      const visible = document.visibilityState === "visible";
      setIsDocumentVisible(visible);
    };
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (isPlaybackPaused) {
      clearAdvanceTimer(true);
      return;
    }

    timerStartedAt.current = Date.now();
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      timerStartedAt.current = null;
      remainingDuration.current = SLIDE_DURATION_MS;
      const nextIndex = (index + 1) % slides.length;
      requestSlide(nextIndex);
    }, remainingDuration.current);

    return () => clearAdvanceTimer(true);
  }, [clearAdvanceTimer, index, isPlaybackPaused, requestSlide, slides.length]);

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

  useEffect(
    () => () => {
      transitionRequest.current += 1;
      clearAdvanceTimer(false);
      if (cleanupTimer.current !== null) window.clearTimeout(cleanupTimer.current);
    },
    [clearAdvanceTimer],
  );

  const move = (direction: -1 | 1) => {
    if (isTransitionPending) return;
    const nextIndex = (index + direction + slides.length) % slides.length;
    requestSlide(nextIndex);
  };

  const previousLabel =
    locale === "en" ? "Previous slide" : locale === "cn" ? "上一张" : "이전 슬라이드";
  const nextLabel = locale === "en" ? "Next slide" : locale === "cn" ? "下一张" : "다음 슬라이드";
  const pauseLabel =
    locale === "en"
      ? isUserPaused
        ? "Resume slideshow"
        : "Pause slideshow"
      : locale === "cn"
        ? isUserPaused
          ? "继续播放"
          : "暂停播放"
        : isUserPaused
          ? "슬라이드 재생"
          : "슬라이드 일시정지";

  return (
    <section
      className={`relative h-[min(100svh,1080px)] min-h-[720px] w-full min-w-0 touch-pan-y overflow-hidden bg-[#eef7fc] max-b1080:min-h-[680px] max-b580:h-[780px] max-b580:min-h-0 ${
        isPlaybackPaused ? "hero-motion-paused" : ""
      }`}
      style={{ "--hero-duration": `${SLIDE_DURATION_MS}ms` } as CSSProperties}
      onMouseEnter={() => setIsPointerPaused(true)}
      onMouseLeave={() => setIsPointerPaused(false)}
      onFocusCapture={() => setIsFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsFocusPaused(false);
      }}
      onPointerDown={(event) => {
        if ((event.target as HTMLElement).closest("a, button")) {
          pointerStart.current = null;
          return;
        }
        pointerStart.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distanceX = event.clientX - pointerStart.current.x;
        const distanceY = event.clientY - pointerStart.current.y;
        pointerStart.current = null;
        if (Math.abs(distanceX) > 48 && Math.abs(distanceX) > Math.abs(distanceY)) {
          move(distanceX > 0 ? -1 : 1);
        }
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
    >
      {slides.map((candidate, candidateIndex) => {
        const layerState =
          candidateIndex === index
            ? previousSlide
              ? "current"
              : "static"
            : candidateIndex === previousIndex
              ? "previous"
              : null;
        if (layerState === null) return null;

        return (
          <HeroSlideLayer
            key={candidate.id}
            slide={candidate}
            isEnglish={isEnglish}
            state={layerState}
            animateCopy={layerState === "current"}
            highPriority={candidateIndex === 0 && cycle === 0}
          />
        );
      })}

      <nav
        aria-label={locale === "en" ? "Primary links" : locale === "cn" ? "主要链接" : "주요 바로가기"}
        className="hero-actions-enter absolute bottom-[105px] right-[7.5%] z-20 flex min-w-0 gap-3 max-b1080:bottom-[92px] max-b580:inset-x-4 max-b580:bottom-[76px] max-b580:grid max-b580:grid-cols-3 max-b580:gap-1.5"
      >
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`gfont flex min-h-12 min-w-0 items-center justify-center break-words rounded-full px-6 text-center text-[14px] font-extrabold leading-tight shadow-sm transition-[transform,background-color,color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 max-b580:min-h-10 max-b580:w-full max-b580:px-1.5 max-b580:py-2 max-b580:text-[10px] ${
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
          disabled={isTransitionPending}
          aria-label={previousLabel}
          className="rounded-full px-2 py-1 text-lg transition-transform duration-200 hover:scale-125 active:scale-95 disabled:cursor-wait disabled:opacity-40"
        >
          ‹
        </button>
        <span className="gfont text-[15px] font-bold tabular-nums">
          {index + 1} <span className="opacity-40">/ {slides.length}</span>
        </span>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={isTransitionPending}
          aria-label={nextLabel}
          className="rounded-full px-2 py-1 text-lg transition-transform duration-200 hover:scale-125 active:scale-95 disabled:cursor-wait disabled:opacity-40"
        >
          ›
        </button>
        <span className="gfont min-w-6 text-[12px] font-bold opacity-50 tabular-nums">
          {SLIDE_DURATION_MS / 1000}s
        </span>
        <button
          type="button"
          onClick={() => setIsUserPaused((current) => !current)}
          aria-label={pauseLabel}
          title={pauseLabel}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/45 bg-black/10 text-[12px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          {isUserPaused ? "▶" : "Ⅱ"}
        </button>
      </div>
    </section>
  );
}
