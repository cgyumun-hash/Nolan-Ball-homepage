import type { Metadata } from "next";
import { Goblin_One, Noto_Sans_KR } from "next/font/google";
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

export const metadata: Metadata = {
  title: "하캄바이오",
  description:
    "ACF 필터 볼(ACF Filter Ball)과 내시경 채널 세척 솔루션을 만드는 친환경 바이오 기업.",
  openGraph: {
    type: "website",
    title: "hakambio",
    description: "ACF Filter Ball",
  },
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
