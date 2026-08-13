"use client";

import { useState } from "react";

import { TECHNOLOGY } from "@/lib/site";

type Feature = (typeof TECHNOLOGY.features)[number];

const DOTS = [
  "left-[23%] top-[18%]",
  "left-[49%] top-[12%]",
  "right-[20%] top-[25%]",
  "left-[13%] top-[46%]",
  "right-[12%] top-[49%]",
  "left-[24%] bottom-[18%]",
  "left-[49%] bottom-[11%]",
  "right-[21%] bottom-[22%]",
] as const;

function FeatureButton({
  feature,
  selected,
  onSelect,
}: {
  feature: Feature;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      onClick={onSelect}
      className={`group w-full border-t px-1 py-5 text-left transition-colors duration-300
                  max-b980:rounded-xl max-b980:border max-b980:p-4 max-b520:p-3 ${
                    selected
                      ? "border-brand-500 text-brand-500 max-b980:bg-blue-50"
                      : "border-line text-ink-500 hover:border-sky-400 hover:text-ink-900"
                  }`}
    >
      <span className="mb-2 flex items-center gap-3">
        <span
          className={`gfont text-[13px] font-bold transition-colors ${
            selected ? "text-brand-500" : "text-sky-600"
          }`}
        >
          {feature.no}
        </span>
        <span className="text-[19px] font-bold max-b1200:text-[16px] max-b520:text-[14px]">
          {feature.name}
        </span>
      </span>
      <span className="block pl-8 text-[12px] tracking-[0.08em] text-ink-500 max-b520:hidden">
        {feature.en}
      </span>
    </button>
  );
}

export default function TechnologyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TECHNOLOGY.features[activeIndex];
  const left = TECHNOLOGY.features.slice(0, 3);
  const right = TECHNOLOGY.features.slice(3);

  return (
    <section id="technology-features" aria-labelledby="technology-features-title" className="bg-[#f4f8fb] py-[150px] max-b1080:py-[100px] max-b580:py-20">
      <div className="wrap-in2">
        <div className="mx-auto mb-[85px] max-w-[860px] text-center max-b580:mb-12">
          <p className="gfont mb-4 text-[14px] font-bold tracking-[0.2em] text-sky-600">
            {TECHNOLOGY.featuresEyebrow}
          </p>
          <h2
            id="technology-features-title"
            className="gfont mb-7 text-[64px] font-bold leading-[1.12] text-ink-900 max-b1080:text-[48px] max-b580:text-[36px]"
          >
            {TECHNOLOGY.featuresTitle}
          </h2>
          <p className="text-[18px] leading-[1.8] text-ink-500 max-b1080:text-[16px] max-b580:text-[14px]">
            {TECHNOLOGY.featuresLead}
          </p>
        </div>

        <div className="grid grid-cols-[minmax(220px,1fr)_minmax(360px,1.4fr)_minmax(220px,1fr)] items-center gap-12 max-b1200:gap-7 max-b980:grid-cols-1">
          <div className="space-y-5 max-b980:row-start-2 max-b980:grid max-b980:grid-cols-3 max-b980:gap-3 max-b980:space-y-0 max-b580:grid-cols-2">
            {left.map((feature, index) => (
              <FeatureButton
                key={feature.no}
                feature={feature}
                selected={activeIndex === index}
                onSelect={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[470px] max-b980:row-start-1 max-b580:max-w-[320px]">
            <div className="absolute inset-[3%] rounded-full border border-sky-200/80" />
            <div className="absolute inset-[10%] rounded-full border border-dashed border-sky-300/70 [animation:spin_28s_linear_infinite] motion-reduce:[animation:none]" />
            <div
              aria-label={`선택된 기술 특징: ${active.name}`}
              className="absolute inset-[17%] overflow-hidden rounded-full border-[6px] border-white bg-[radial-gradient(circle_at_35%_28%,#8ed7f2_0%,#2f8dcc_32%,#12508a_67%,#082d55_100%)] shadow-[0_30px_70px_rgba(14,80,133,0.28)] transition-transform duration-500 hover:scale-[1.02]"
            >
              <div className={`absolute inset-[8%] rounded-full border-[10px] border-sky-100/45 transition-opacity ${activeIndex === 3 ? "opacity-100" : "opacity-55"}`} />
              <div className={`absolute inset-[18%] rounded-full border border-white/25 transition-all ${activeIndex === 4 ? "inset-[14%] border-[5px] border-sky-100/75 shadow-[0_0_24px_rgba(255,255,255,0.35)]" : ""}`} />
              <div className={`absolute inset-0 bg-[conic-gradient(from_30deg,transparent_0deg,rgba(255,255,255,0.13)_72deg,transparent_145deg,rgba(4,49,91,0.14)_225deg,transparent_315deg)] transition-transform duration-500 ${activeIndex === 2 ? "rotate-45 opacity-100" : "opacity-45"}`} />

              {DOTS.map((position) => (
                <span
                  key={position}
                  className={`absolute h-[9%] w-[9%] rounded-full border border-white/60 bg-sky-300 shadow-[inset_-3px_-4px_7px_rgba(2,38,75,0.35),0_3px_8px_rgba(0,0,0,0.22)] transition-all duration-300 ${position} ${
                    activeIndex === 1 ? "scale-125 bg-white" : ""
                  }`}
                />
              ))}

              <div className={`absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_72%,rgba(255,255,255,0.16),transparent_28%)] transition-opacity ${activeIndex === 0 ? "opacity-100" : "opacity-35"}`} />
              <div className={`absolute bottom-[23%] right-[20%] h-[13%] w-[13%] rounded-full border-2 border-white/70 transition-colors ${activeIndex === 5 ? "bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.8)]" : "bg-sky-200"}`} />
            </div>

            <span className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full border border-sky-200 bg-white px-4 py-2 text-[12px] font-bold text-brand-500 shadow-sm">
              NOLAN BALL
            </span>
            <p className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 text-center text-[12px] text-ink-500">
              {TECHNOLOGY.interactionHint}
            </p>
          </div>

          <div className="space-y-5 max-b980:row-start-3 max-b980:grid max-b980:grid-cols-3 max-b980:gap-3 max-b980:space-y-0 max-b580:grid-cols-2">
            {right.map((feature, index) => (
              <FeatureButton
                key={feature.no}
                feature={feature}
                selected={activeIndex === index + 3}
                onSelect={() => setActiveIndex(index + 3)}
              />
            ))}
          </div>
        </div>

        <div aria-live="polite" className="mx-auto mt-[75px] grid max-w-[1040px] grid-cols-[120px_1fr] border-y border-ink-900 py-10 max-b580:mt-12 max-b580:grid-cols-1 max-b580:gap-4 max-b580:py-7">
          <span className="gfont text-[40px] font-bold text-brand-500 max-b580:text-[28px]">
            {active.no}
          </span>
          <div>
            <div className="mb-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-[28px] font-bold text-ink-900 max-b580:text-[22px]">{active.name}</h3>
              <span className="text-[14px] tracking-[0.08em] text-ink-500">{active.en}</span>
            </div>
            <p className="max-w-[820px] text-[18px] leading-[1.8] text-ink-500 max-b580:text-[15px]">{active.body}</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-10 gap-y-3 max-b760:grid-cols-1 max-b580:mt-5">
              {active.points.map((point) => (
                <li key={point} className="relative pl-5 text-[15px] leading-[1.7] text-ink-500 before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-sky-600 max-b580:text-[14px]">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
