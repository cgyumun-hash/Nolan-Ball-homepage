"use client";

import { useState } from "react";

import type { SiteLocale } from "@/lib/locale";
import { TECHNOLOGY } from "@/lib/site";
import { EN_TECHNOLOGY } from "@/lib/site.en";
import { CN_TECHNOLOGY } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";

const DESKTOP_POSITIONS = [
  "left-[8%] top-[29.5%]",
  "left-[8%] top-[50.2%]",
  "left-[8%] top-[73.5%]",
  "right-[7.5%] top-[29.5%]",
  "right-[7.5%] top-[50.2%]",
  "right-[7.5%] top-[73.5%]",
] as const;

export default function TechnologyFeatures({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, TECHNOLOGY, EN_TECHNOLOGY, CN_TECHNOLOGY);
  const isTranslated = locale !== "ko";
  const [active, setActive] = useState(0);
  const feature = content.features[active];

  return (
    <section id="technology-features" aria-labelledby="technology-features-title" className="bg-[#f4f9fd] py-[150px] max-b1080:py-[100px] max-b580:py-16">
      <div
        className={`relative mx-auto w-[calc(100%_-_40px)] max-w-[1680px] max-b1080:w-[90%] max-b580:w-[calc(100%_-_40px)] ${
          isTranslated ? "min-w-0 [word-break:normal] [overflow-wrap:anywhere]" : ""
        }`}
      >
        <div className="mx-auto mb-16 max-w-[880px] text-center max-b580:mb-10">
          <h2 id="technology-features-title" className="gfont text-[64px] font-extrabold tracking-[-0.04em] text-blue-950 max-b1080:text-[48px] max-b580:text-[36px]">{content.featuresTitle}</h2>
          <p className="mt-6 whitespace-pre-line text-[17px] leading-[1.8] text-slate-600 max-b580:text-[14px]">{content.featuresLead}</p>
        </div>

        <div className="relative aspect-[2012/941] overflow-hidden rounded-[28px] border border-sky-100 max-b1080:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.structureImage} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-fill" />
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
                "absolute z-10 min-h-[clamp(100px,7vw,130px)] w-[24%] rounded-2xl border bg-white/95 px-[1.25vw] py-[1vw] text-left shadow-[0_10px_30px_rgba(41,116,176,0.09)] transition-[transform,border-color,color,box-shadow] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
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

        <div
          className={`relative hidden aspect-[1024/1535] overflow-hidden rounded-[28px] border border-sky-100 bg-white/70 max-b1080:block max-b580:rounded-[20px] ${
            isTranslated ? "max-[581px]:hidden" : ""
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={content.structureImageMobile} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          <article className="absolute left-[10.5%] right-[10.5%] top-[30%] z-10 h-[10%] overflow-hidden px-[3%] py-[1.5%]">
            <h3 className="text-[clamp(12px,1.7vw,16px)] font-bold text-blue-950">{feature.name}</h3>
            <p className="mt-1 line-clamp-3 text-[clamp(9px,1.2vw,12px)] leading-[1.4] text-slate-600">{feature.body}</p>
          </article>
          <div className="absolute inset-x-[10.5%] bottom-[4.5%] top-[42%]">
            {content.features.map((item, index) => (
              <button
                key={item.no}
                type="button"
                aria-pressed={active === index}
                aria-controls="technology-feature-detail"
                onClick={() => setActive(index)}
                className="absolute left-[13%] right-0 flex h-[14%] items-center text-left"
                style={{ top: index * 16.7 + "%" }}
              >
                <span className={active === index ? "text-[clamp(11px,1.6vw,15px)] font-bold leading-[1.25] text-blue-700" : "text-[clamp(11px,1.6vw,15px)] font-bold leading-[1.25] text-blue-950"}>{item.name}</span>
                <span className="ml-auto text-[clamp(14px,2vw,19px)] text-sky-600">{active === index ? "−" : "+"}</span>
              </button>
            ))}
          </div>
        </div>

        {isTranslated && (
          <div className="hidden max-[581px]:grid max-[581px]:gap-3 [word-break:normal] [overflow-wrap:anywhere]">
            {content.features.map((item, index) => {
              const isActive = active === index;
              const panelId = `technology-feature-mobile-${index}`;

              return (
                <article
                  key={item.no}
                  className={`min-w-0 overflow-hidden rounded-2xl border bg-white shadow-[0_10px_28px_rgba(22,84,145,0.07)] transition-colors ${
                    isActive ? "border-blue-500" : "border-sky-100"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={panelId}
                    onClick={() => setActive(index)}
                    className="flex w-full min-w-0 items-center gap-3 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600"
                  >
                    <span
                      className={`gfont inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        isActive ? "bg-blue-600 text-white" : "bg-sky-50 text-sky-700"
                      }`}
                    >
                      {item.no}
                    </span>
                    <span className="min-w-0 flex-1 text-[16px] font-bold leading-[1.3] text-blue-950">
                      {item.name}
                    </span>
                    <span aria-hidden className="shrink-0 text-[20px] leading-none text-sky-600">
                      {isActive ? "−" : "+"}
                    </span>
                  </button>

                  {isActive && (
                    <div id={panelId} className="border-t border-sky-100 px-4 pb-5 pt-4">
                      <p className="text-[14px] leading-[1.7] text-slate-600">{item.body}</p>
                      {item.points.length > 0 && (
                        <ul className="mt-3 grid gap-2">
                          {item.points.map((point) => (
                            <li
                              key={point}
                              className="relative min-w-0 pl-4 text-[13px] leading-[1.6] text-slate-600 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-sky-600"
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-4 text-[11px] font-bold leading-[1.5] tracking-[0.04em] text-blue-700">
                        {item.en}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <article
          id="technology-feature-detail"
          className={`mt-7 grid grid-cols-[100px_1fr] gap-6 border-y border-blue-200 bg-white/70 px-7 py-7 max-b580:mt-5 max-b580:grid-cols-1 max-b580:gap-3 max-b580:px-5 max-b580:py-6 ${
            isTranslated ? "max-[581px]:hidden" : ""
          }`}
        >
          <p className="gfont text-[28px] font-extrabold text-sky-600 max-b580:text-[24px]">{feature.no}</p>
          <div>
            <h3 className="text-[24px] font-bold text-blue-950 max-b580:text-[20px]">{feature.name}</h3>
            <p className="mt-3 text-[15px] leading-[1.75] text-slate-600 max-b580:text-[14px]">{feature.body}</p>
            {feature.points.length > 0 && (
              <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 max-b580:grid-cols-1">
                {feature.points.map((point) => <li key={point} className="relative pl-4 text-[13px] leading-[1.65] text-slate-600 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-sky-600 max-b580:text-[14px]">{point}</li>)}
              </ul>
            )}
            <p className="mt-4 text-[12px] font-bold tracking-[0.06em] text-blue-700 max-b580:text-[13px]">{feature.en}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
