import type { Metadata } from "next";

import FilterBallPage from "@/components/FilterBallPage";
import { getLanguageAlternates } from "@/lib/seo";
import { FILTER_BALL_COLONOSCOPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "3.7 mm / 대장내시경 전용",
  alternates: getLanguageAlternates("/products/filter-ball-for-colonoscopes"),
};

/**
 * 원본 /sub/sub31.php
 * 레이아웃은 sub32·sub33 과 동일해서 FilterBallPage 로 공용화했습니다.
 */
export default function Page() {
  return <FilterBallPage data={FILTER_BALL_COLONOSCOPES} />;
}
