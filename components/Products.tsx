"use client";

import Image from "next/image";
import Link from "next/link";

import { PRODUCTS } from "@/lib/site";

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
export default function Products() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden max-b1400:h-[80vh]"
      style={{ backgroundImage: PRODUCTS.fallback }}
    >
      {/* 사진이 없으면 위 그라디언트가 그대로 보입니다 */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: `url(${PRODUCTS.image})` }}
      />

      <div
          className="absolute top-1/2 right-[200px] z-10 -translate-y-1/2 text-white
                     [text-shadow:0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]
                     max-b1200:right-[100px]
                     max-b1080:right-[50px]
                     max-b580:right-auto max-b580:left-[50px]"
      >
          <Image
            src="/images/main/logo.webp"
            alt="Nolan Ball Korea"
            width={633}
            height={161}
            className="h-auto w-[250px] drop-shadow-md max-b1080:w-[210px] max-b580:w-[180px]"
          />

          <h3
            className="gfont mt-[15px] mb-2.5 text-[80px] font-bold leading-none
                       max-b1600:text-[63px]
                       max-b1080:mb-0 max-b1080:text-[48px]
                       max-b580:text-[36px]"
          >
            {PRODUCTS.heading}
          </h3>

          <p
            className="mb-[80px] text-[22px]
                       max-b1600:text-[20px]
                       max-b1080:mb-[50px] max-b1080:text-[18px]
                       max-b580:text-[16px]"
          >
            {PRODUCTS.desc}
          </p>

          <Link
            href={PRODUCTS.href}
            className="gfont inline-block rounded-[50px] bg-accent-500 px-[30px] py-2.5
                       text-[16px] font-extrabold text-white transition-opacity hover:opacity-90
                       max-b1600:px-5 max-b1600:py-[5px] max-b1600:text-[14px]"
          >
            {PRODUCTS.cta}
          </Link>
      </div>
    </section>
  );
}
