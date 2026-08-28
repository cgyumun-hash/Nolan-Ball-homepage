import type { Metadata } from "next";
import { Goblin_One, Noto_Sans_KR } from "next/font/google";

import { SITE_URL } from "@/lib/seo";

import "./globals.css";

/**
 * 원본이 쓰는 폰트 3종을 그대로 맞춥니다.
 *   Goblin One    히어로 슬로건 · ‹ 1 / 3 ›   → Google Fonts
 *   GmarketSans   .gfont (섹션 헤딩)          → jsDelivr CDN (아래 <link>)
 *   Noto Sans KR  본문 기본                    → Google Fonts
 */
const goblin = Goblin_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-goblin",
  display: "swap",
});

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-noto",
  display: "swap",
});

/**
 * 자료정리 7-1 "검색 노출용 페이지 제목·설명, 파비콘, 대표 이미지 설정".
 *
 * · title.template — 하위 페이지가 "○○ | 놀란볼코리아" 로 자동 완성됩니다.
 * · openGraph.images — 카카오톡·페이스북 등에 공유할 때 뜨는 대표 이미지입니다.
 * · 파비콘은 app/favicon.ico, 애플 홈화면 아이콘은 app/apple-icon.png 가
 *   Next.js 규칙에 따라 자동으로 연결됩니다.
 *
 * ⚠️ metadataBase 는 실제 배포 도메인이 정해지면 그 주소로 바꿔야
 *    OG 이미지가 절대경로로 나갑니다.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "놀란볼코리아 | 내시경 세척의 새로운 기준, Nolan Ball",
    template: "%s | 놀란볼코리아",
  },
  description:
    "내시경 채널 세척용 일회용 제품 Nolan Ball 을 개발·제조하는 놀란볼코리아입니다. 채널 내벽에 360° 밀착해 사용자의 숙련도와 관계없이 빠르고 균일한 세척을 지원합니다.",
  keywords: [
    "놀란볼코리아",
    "Nolan Ball",
    "내시경 세척",
    "내시경 채널 세척",
    "일회용 세척볼",
    "내시경 재처리",
    "감염관리",
  ],
  openGraph: {
    type: "website",
    siteName: "놀란볼코리아 Nolan Ball Korea",
    title: "내시경 세척의 새로운 기준, Nolan Ball",
    description:
      "채널 내벽에 360° 밀착하는 일회용 내시경 채널 세척 솔루션입니다.",
    locale: "ko_KR",
    images: [
      {
        url: "/images/og.webp",
        width: 1200,
        height: 630,
        alt: "Nolan Ball 제품 구조",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${goblin.variable} ${noto.variable}`}>
      <head>
        {/* GmarketSans 는 구글 폰트에 없어서 원본과 동일한 CDN 을 씁니다.
            로드에 실패하면 globals.css 의 --font-gmarket 폴백에 따라
            Noto Sans KR 로 자연스럽게 대체됩니다. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/ungveloper/web-fonts/GmarketSans/font-face.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
