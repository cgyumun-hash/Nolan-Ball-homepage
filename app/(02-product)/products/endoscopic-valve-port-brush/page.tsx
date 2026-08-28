import type { Metadata } from "next";

import FilterBallPage from "@/components/FilterBallPage";
import { getLanguageAlternates } from "@/lib/seo";
import { VALVE_PORT_BRUSH } from "@/lib/site";

export const metadata: Metadata = {
  title: "Valve Brush",
  alternates: getLanguageAlternates("/products/endoscopic-valve-port-brush"),
};

/**
 * 원본 /sub/sub34.php
 * 필터볼이 아니지만 원본도 .sub31 레이아웃을 그대로 재사용합니다.
 */
export default function Page() {
  return <FilterBallPage data={VALVE_PORT_BRUSH} />;
}
