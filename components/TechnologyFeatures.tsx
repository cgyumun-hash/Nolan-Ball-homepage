"use client";

import { useState } from "react";

import type { SiteLocale } from "@/lib/locale";
import { TECHNOLOGY } from "@/lib/site";
import { EN_TECHNOLOGY } from "@/lib/site.en";
import { CN_TECHNOLOGY } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";

const DESKTOP_POSITIONS = [
  "left-[4.5%] top-[15%]",
  "left-[4.5%] top-[41%]",
  "left-[4.5%] top-[67%]",
  "right-[4.5%] top-[15%]",
  "right-[4.5%] top-[41%]",
  "right-[4.5%] top-[67%]",
] as const;

const DESKTOP_CONNECTORS = [
  { path: "M 526 197 H 610 L 690 410 L 786 504", target: [786, 504] },
  { path: "M 526 442 H 635 L 703 555 L 759 625", target: [759, 625] },
  { path: "M 526 687 H 650 L 718 690 L 800 678", target: [800, 678] },
  { path: "M 1146 197 H 1060 L 997 402 L 930 478", target: [930, 478] },
  { path: "M 1146 442 H 1040 L 979 520 L 887 587", target: [887, 587] },
  { path: "M 1146 687 H 1030 L 970 682 L 919 645", target: [919, 645] },
] as const;

const MOBILE_TARGETS = [
  "left-[47.5%] top-[41%] max-b580:top-[24%]",
  "left-[47%] top-[61%] max-b580:top-[35%]",
  "left-[50%] top-[63%] max-b580:top-[37%]",
  "left-[58%] top-[37%] max-b580:top-[22%]",
  "left-[55%] top-[50%] max-b580:top-[29%]",
  "left-[58%] top-[60%] max-b580:top-[35%]",
] as const;

export default function TechnologyFeatures({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, TECHNOLOGY, EN_TECHNOLOGY, CN_TECHNOLOGY);
  const [active, setActive] = useState(0);
  const feature = content.features[active];

  return (
    <section id="technology-features" aria-labelledby="technology-features-title" className="bg-[#f4f9fd] py-[150px] max-b1080:py-[100px] max-b580:py-16">
      <div className="wrap-in2">
        <div className="mx-auto mb-16 max-w-[880px] text-center max-b580:mb-10">
          <p className="gfont mb-4 text-[13px] font-bold tracking-[0.22em] text-sky-700">{content.featuresEyebrow || "PRODUCT STRUCTURE"}</p>
          <h2 id="technology-features-title" className="gfont text-[64px] font-extrabold tracking-[-0.04em] text-blue-950 max-b1080:text-[48px] max-b580:text-[36px]">{content.featuresTitle}</h2>
          <p className="mt-6 whitespace-pre-line text-[17px] leading-[1.8] text-slate-600 max-b580:text-[14px]">{content.featuresLead}</p>
        </div>

        <div className="relative aspect-[1672/941] overflow-hidden rounded-[28px] border border-sky-100 max-b1080:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.structureImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <svg aria-hidden="true" viewBox="0 0 1672 941" className="pointer-events-none absolute inset-0 z-[5] h-full w-full">
            <defs>
              <marker id="feature-arrow-active" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto" markerUnits="strokeWidth">
                <path d="M 0 0 L 9 4.5 L 0 9 Z" fill="#2563eb" />
              </marker>
              <marker id="feature-arrow-idle" markerWidth="9" markerHeight="9" refX="7.5" refY="4.5" orient="auto" markerUnits="strokeWidth">
                <path d="M 0 0 L 9 4.5 L 0 9 Z" fill="#7bbde8" />
              </marker>
            </defs>
            {DESKTOP_CONNECTORS.map((connector, index) => {
              const selected = active === index;

              return (
                <g key={connector.path} className="transition-opacity duration-300" opacity={selected ? 1 : 0.48}>
                  <path
                    d={connector.path}
                    fill="none"
                    stroke={selected ? "#2563eb" : "#7bbde8"}
                    strokeWidth={selected ? 2.5 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    markerEnd={`url(#feature-arrow-${selected ? "active" : "idle"})`}
                    vectorEffect="non-scaling-stroke"
                  />
                  <circle cx={connector.target[0]} cy={connector.target[1]} r={selected ? 8 : 6} fill="rgba(255,255,255,0.92)" stroke={selected ? "#2563eb" : "#7bbde8"} strokeWidth={selected ? 2.5 : 1.5} vectorEffect="non-scaling-stroke" />
                  <circle cx={connector.target[0]} cy={connector.target[1]} r={selected ? 3.2 : 2.4} fill={selected ? "#2563eb" : "#7bbde8"} />
                </g>
              );
            })}
          </svg>
          {content.features.map((item, index) => (
            <button
              key={item.no}
              type="button"
              aria-pressed={active === index}
              aria-controls="technology-feature-detail"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              className={[
                "absolute z-10 min-h-[clamp(96px,7.5vw,126px)] w-[27%] rounded-2xl border bg-white/[0.92] px-[1.25vw] py-[0.95vw] text-left shadow-[0_10px_30px_rgba(41,116,176,0.09)] backdrop-blur-md transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                DESKTOP_POSITIONS[index],
                active === index ? "-translate-y-0.5 border-blue-600 text-blue-800 shadow-[0_16px_38px_rgba(37,99,235,0.16)]" : "border-sky-100 text-blue-950 hover:-translate-y-0.5 hover:border-sky-500 hover:text-sky-700",
              ].join(" ")}
            >
              <span className="flex items-center justify-between">
                <span className={`gfont inline-flex h-[clamp(22px,1.65vw,30px)] min-w-[clamp(22px,1.65vw,30px)] items-center justify-center rounded-full px-1 text-[clamp(9px,0.65vw,12px)] font-bold ${active === index ? "bg-blue-600 text-white" : "bg-sky-50 text-sky-700"}`}>{item.no}</span>
                <span className={`h-2 w-2 rounded-full transition-colors ${active === index ? "bg-blue-600" : "bg-sky-200"}`} />
              </span>
              <span className="mt-[0.4vw] block text-[clamp(13px,1.08vw,19px)] font-bold leading-[1.3]">{item.name}</span>
              <span className="mt-[0.35vw] block truncate text-[clamp(9px,0.62vw,11px)] tracking-[0.02em] text-slate-500">{item.en}</span>
            </button>
          ))}
        </div>

        <div className="hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.structureImageMobile} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <article className="absolute left-[10.5%] right-[4%] top-[30%] h-[10%] overflow-hidden p-3">
            <h3 className="text-[14px] font-bold text-blue-950">{feature.name}</h3>
            <p className="mt-1 line-clamp-3 text-[10px] leading-[1.45] text-slate-600">{feature.body}</p>
          </article>
          <div className="absolute inset-x-[10.5%] bottom-[4.5%] top-[42%]">
            {content.features.map((item, index) => (
              <button key={item.no} type="button" onClick={() => setActive(index)} className="absolute left-[13%] right-0 flex h-[14%] items-center text-left" style={{ top: index * 16.7 + "%" }}>
                <span className={active === index ? "text-[14px] font-bold text-blue-700" : "text-[14px] font-bold text-blue-950"}>{item.name}</span>
                <span className="ml-auto text-[18px] text-sky-600">{active === index ? "−" : "+"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-[28px] border border-sky-100 bg-white/70 max-b1080:block max-b580:rounded-[20px]">
          <div className="relative aspect-[16/7] overflow-hidden max-b580:aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.structureImageMobile} alt="" className="absolute inset-x-0 top-0 h-auto w-full" />
            <span className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 ${MOBILE_TARGETS[active]}`} aria-hidden="true">
              <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/45 bg-white/25" />
              <span className="relative flex h-8 min-w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 px-1.5 text-[10px] font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.35)]">{feature.no}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 p-6 max-b580:grid-cols-1 max-b580:p-4">
            {content.features.map((item, index) => (
              <button
                key={item.no}
                type="button"
                aria-pressed={active === index}
                aria-controls="technology-feature-detail"
                onClick={() => setActive(index)}
                className={`flex min-h-[88px] items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors max-b580:min-h-0 max-b580:px-4 ${active === index ? "border-blue-600 bg-blue-50 text-blue-800" : "border-sky-100 bg-white text-blue-950"}`}
              >
                <span className="gfont text-[18px] font-extrabold text-sky-600">{item.no}</span>
                <span>
                  <strong className="block text-[16px] leading-[1.35] max-b580:text-[15px]">{item.name}</strong>
                  <small className="mt-1 block text-[10px] leading-[1.35] text-slate-500">{item.en}</small>
                </span>
              </button>
            ))}
          </div>
        </div>

        <article id="technology-feature-detail" className="mt-8 grid grid-cols-[110px_1fr] gap-7 border-y border-blue-200 bg-white/70 px-8 py-8 max-b580:mt-5 max-b580:grid-cols-1 max-b580:gap-3 max-b580:px-5 max-b580:py-6">
          <p className="gfont text-[30px] font-extrabold text-sky-600">{feature.no}</p>
          <div>
            <h3 className="text-[26px] font-bold text-blue-950 max-b580:text-[20px]">{feature.name}</h3>
            <p className="mt-3 text-[16px] leading-[1.75] text-slate-600 max-b580:text-[14px]">{feature.body}</p>
            {feature.points.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 max-b580:grid-cols-1">
                {feature.points.map((point) => <li key={point} className="relative pl-4 text-[14px] leading-[1.65] text-slate-600 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-sky-600">{point}</li>)}
              </ul>
            )}
            <p className="mt-5 text-[13px] font-bold tracking-[0.06em] text-blue-700">{feature.en}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
