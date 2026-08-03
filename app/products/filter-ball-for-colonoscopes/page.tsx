import type { Metadata } from "next";

import FilterBallPage from "@/components/FilterBallPage";
import { FILTER_BALL_COLONOSCOPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Filter Ball for Colonoscopes | 하캄바이오",
};

/**
 * 원본 /sub/sub31.php
 * 레이아웃은 sub32·sub33 과 동일해서 FilterBallPage 로 공용화했습니다.
 */
export default function Page() {
  return <FilterBallPage data={FILTER_BALL_COLONOSCOPES} />;
}
