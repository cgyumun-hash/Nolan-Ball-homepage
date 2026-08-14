"use client";

import Image from "next/image";
import { useState } from "react";

import { TECHNOLOGY } from "@/lib/site";

type Feature = (typeof TECHNOLOGY.features)[number];

const LABEL_POSITIONS = [
  "-left-[6%] top-[11%]",
  "-left-[6%] top-[39%]",
  "-left-[6%] top-[67%]",
  "-right-[6%] top-[11%]",
  "-right-[6%] top-[39%]",
  "-right-[6%] top-[67%]",
] as const;

const NOTE_POSITIONS = [
  "right-[77%] top-[11%]",
  "right-[77%] top-[39%]",
  "right-[77%] top-[67%]",
  "left-[77%] top-[11%]",
  "left-[77%] top-[39%]",
  "left-[77%] top-[67%]",
] as const;

function StructureLabel({ feature, open, onClick, position }: { feature: Feature; open: boolean; onClick: () => void; position: string }) {
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={onClick}
      className={`absolute z-20 w-[29%] border-y px-2 py-5 text-left transition-all duration-300 ${position} ${
        open ? "border-ink-900 bg-white text-ink-900 shadow-[0_12px_28px_rgba(20,44,70,0.08)]" : "border-line bg-transparent text-ink-500 hover:border-ink-900 hover:text-ink-900"
      }`}
    >
      <span className="flex items-baseline gap-3">
        <span className="gfont text-[14px] font-bold text-ink-900">{feature.no}</span>
        <span className="text-[18px] font-bold max-b1200:text-[16px]">{feature.name}</span>
      </span>
    </button>
  );
}

function Memo({ feature, position, side, zIndex, onClose }: { feature: Feature; position: string; side: "left" | "right"; zIndex: number; onClose: () => void }) {
  return (
    <article
      className={`structure-panel absolute w-[45%] border border-[#d8dee7] bg-white px-10 pb-9 pt-10 shadow-[0_22px_55px_rgba(35,61,89,0.18)] ${side === "left" ? "structure-panel-left" : "structure-panel-right"} ${position}`}
      style={{ zIndex }}
    >
      <button type="button" aria-label={`${feature.name} 메모 닫기`} onClick={onClose} className="absolute right-5 top-4 text-[26px] leading-none text-ink-900">
        ×
      </button>
      <p className="gfont mb-3 text-[15px] font-bold tracking-[0.1em] text-ink-900">{feature.no}</p>
      <h3 className="mb-6 text-[28px] font-bold text-ink-900">{feature.name}</h3>
      <p className="border-t border-[#cfd6df] pt-6 text-[17px] leading-[1.8] text-ink-900">{feature.body}</p>
      {feature.points.length > 0 && (
        <ul className="mt-6 space-y-3">
          {feature.points.map((point) => (
            <li key={point} className="relative pl-5 text-[15px] leading-[1.7] text-ink-900 before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-ink-900">
              {point}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-7 border-t border-[#cfd6df] pt-5 text-center text-[16px] font-bold leading-[1.6] text-ink-900">{feature.en}</p>
    </article>
  );
}

export default function TechnologyFeatures() {
  const [openOrder, setOpenOrder] = useState<number[]>([]);

  const toggleMemo = (index: number) => {
    setOpenOrder((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]));
  };

  return (
    <section id="technology-features" aria-labelledby="technology-features-title" className="bg-[#f4f8fb] pb-[300px] pt-[150px] max-b1080:pb-[210px] max-b1080:pt-[100px] max-b580:pb-[150px] max-b580:pt-20">
      <div className="wrap-in2">
        <div className="mx-auto mb-[140px] max-w-[900px] text-center max-b1080:mb-[100px] max-b580:mb-[70px]">
          <h2 id="technology-features-title" className="gfont mb-7 text-[64px] font-bold leading-[1.12] text-ink-900 max-b1080:text-[48px] max-b580:text-[36px]">
            {TECHNOLOGY.featuresTitle}
          </h2>
          <p className="whitespace-pre-line text-[18px] leading-[1.8] text-ink-500 max-b1080:text-[16px] max-b580:text-[14px]">{TECHNOLOGY.featuresLead}</p>
        </div>

        <div className="relative min-h-[760px] max-b980:hidden">
          <svg aria-hidden viewBox="0 0 1200 760" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-[15] h-full w-full">
            <path d="M276 118 L455 118 L552 236" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            <path d="M924 118 L785 118 L686 177" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            <path d="M276 330 L455 330 L504 290" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            <path d="M924 330 L750 330 L669 299" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            <path d="M276 543 L425 543 L561 372" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
            <path d="M924 543 L790 543 L610 363" fill="none" stroke="#191f28" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />
          </svg>

          {TECHNOLOGY.features.map((feature, index) => (
            <StructureLabel key={feature.no} feature={feature} open={openOrder.includes(index)} position={LABEL_POSITIONS[index]} onClick={() => toggleMemo(index)} />
          ))}

          <div className="absolute left-1/2 top-[82px] z-10 aspect-square w-[430px] -translate-x-1/2 max-b1200:w-[390px]">
            <Image src="/images/technology/파란볼-v2.webp" alt="Nolan Ball 제품 구조" fill sizes="430px" className="object-contain mix-blend-multiply" />
          </div>

          {openOrder.map((featureIndex, orderIndex) => (
            <Memo
              key={TECHNOLOGY.features[featureIndex].no}
              feature={TECHNOLOGY.features[featureIndex]}
              position={NOTE_POSITIONS[featureIndex]}
              side={featureIndex < 3 ? "left" : "right"}
              zIndex={30 + orderIndex}
              onClose={() => toggleMemo(featureIndex)}
            />
          ))}

        </div>

        <div className="hidden space-y-3 max-b980:block">
          {TECHNOLOGY.features.map((feature, index) => {
            const open = openOrder.includes(index);
            return (
              <div key={feature.no} className="border-y border-line bg-white">
                <button type="button" aria-expanded={open} onClick={() => toggleMemo(index)} className="flex w-full items-center gap-4 px-5 py-5 text-left">
                  <span className="gfont text-[14px] font-bold">{feature.no}</span>
                  <span className="flex-1 text-[17px] font-bold">{feature.name}</span>
                  <span className="text-[22px]">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="mx-4 mb-5 border border-[#d8dee7] bg-white px-6 py-7 shadow-[0_14px_35px_rgba(21,40,64,0.12)]">
                    <p className="text-[16px] leading-[1.8] text-ink-900">{feature.body}</p>
                    {feature.points.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {feature.points.map((point) => (
                          <li key={point} className="relative pl-4 text-[14px] leading-[1.7] text-ink-900 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-ink-900">{point}</li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-6 border-t border-[#cfd6df] pt-4 text-center text-[15px] font-bold leading-[1.6] text-ink-900">{feature.en}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes panel-open-left {
          from { opacity: 0; transform: scaleX(0.08); }
          to { opacity: 1; transform: scaleX(1); }
        }
        @keyframes panel-open-right {
          from { opacity: 0; transform: scaleX(0.08); }
          to { opacity: 1; transform: scaleX(1); }
        }
        :global(.structure-panel-left) {
          transform-origin: right top;
          animation: panel-open-left 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        :global(.structure-panel-right) {
          transform-origin: left top;
          animation: panel-open-right 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.structure-panel-left),
          :global(.structure-panel-right) {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
