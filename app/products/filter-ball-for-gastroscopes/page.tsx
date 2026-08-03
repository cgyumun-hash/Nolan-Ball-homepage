import type { Metadata } from "next";

import FilterBallPage from "@/components/FilterBallPage";
import { FILTER_BALL_GASTROSCOPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Filter Ball for Gastroscopes | 하캄바이오",
};

/**
 * 원본 /sub/sub32.php
 * 원본도 sub31 과 같은 .sub31 클래스를 그대로 씁니다 (전용 클래스 없음).
 */
export default function Page() {
  return <FilterBallPage data={FILTER_BALL_GASTROSCOPES} />;
}
