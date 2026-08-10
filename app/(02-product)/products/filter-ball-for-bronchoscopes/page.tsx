import type { Metadata } from "next";

import FilterBallPage from "@/components/FilterBallPage";
import { FILTER_BALL_BRONCHOSCOPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "기관지 내시경용 2.8mm",
};

/**
 * 원본 /sub/sub33.php
 * 원본도 sub31 · sub32 와 같은 .sub31 클래스를 그대로 씁니다.
 */
export default function Page() {
  return <FilterBallPage data={FILTER_BALL_BRONCHOSCOPES} />;
}
