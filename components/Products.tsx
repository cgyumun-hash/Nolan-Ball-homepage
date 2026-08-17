"use client";

import Image from "next/image";
import Link from "next/link";

import { PRODUCTS } from "@/lib/site";
import { EN_PRODUCTS } from "@/lib/site.en";
import type { SiteLocale } from "@/lib/locale";

/**
 * 원본 .section_3
 *   height:100vh (1400↓ 80vh) · background: section_3bg.jpg center right / cover
 *   .w1 { position:absolute; top:50%; transform:translateY(-50%); right:200px; color:#fff }
 *        1200↓ right:100px · 1080↓ right:50px · 580↓ left:50px 도 추가
 *   h3 { font-size:80px; margin:15px 0 10px; text-shadow: 0 3px 6px rgba(0,0,0,.16) … }
 *        1600↓ 63px · 1080↓ 48px+mb:0 · 580↓ 36px
 *   p  { font-size:22px; margin-bottom:80px }
 *        1600↓ 20px · 1080↓ 18px+mb:50px · 580↓ 16px
 *   a  { background:#FF9D00; border-radius:50px; padding:10px 30px }  1600↓ 5px 20px
 */
export default function Products({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = locale === "en" ? EN_PRODUCTS : PRODUCTS;
  return (
    <section
      id="products"
      className="relative h-screen min-h-[640px] w-full overflow-hidden max-b1400:h-[80vh] max-b580:h-[72svh] max-b580:min-h-[560px]"
      style={{ backgroundImage: content.fallback }}
    >
      {/* 사진이 없으면 위 그라디언트가 그대로 보입니다 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${content.image})` }}
      />

      <div
          className="absolute top-1/2 right-[200px] z-10 -translate-y-1/2 text-white
                     [text-shadow:0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]
                     max-b1200:right-[100px]
                     max-b1080:right-[50px]
                     max-b580:left-1/2 max-b580:right-4 max-b580:top-1/2 max-b580:bottom-auto max-b580:-translate-y-1/2"
      >
          <Image
            src="/images/main/logo.webp"
            alt="Nolan Ball Korea"
            width={633}
            height={161}
            className="h-auto w-[250px] max-w-full drop-shadow-md max-b1080:w-[210px] max-b580:w-[140px]"
          />

          <h3
            className="gfont mt-[15px] mb-2.5 text-[80px] font-bold leading-none
                       max-b1600:text-[63px]
                       max-b1080:mb-0 max-b1080:text-[48px]
                       max-b580:mt-3 max-b580:text-[clamp(24px,7vw,30px)]"
          >
            {content.heading}
          </h3>

          <p
            className="mb-[80px] text-[22px]
                       max-b1600:text-[20px]
                       max-b1080:mb-[50px] max-b1080:text-[18px]
                       max-b580:mb-7 max-b580:text-[13px] max-b580:leading-[1.45]"
          >
            {content.desc}
          </p>

          <Link
            href={content.href}
            className="gfont inline-block rounded-[50px] bg-accent-500 px-[30px] py-2.5
                       text-[16px] font-extrabold text-white transition-opacity hover:opacity-90
                       max-b1600:px-5 max-b1600:py-[5px] max-b1600:text-[14px]
                       max-b580:px-4 max-b580:py-2 max-b580:text-[12px]"
          >
            {content.cta}
          </Link>
      </div>
    </section>
  );
}
