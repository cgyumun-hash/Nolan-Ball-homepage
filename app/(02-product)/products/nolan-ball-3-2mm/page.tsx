import type { Metadata } from "next";

import FilterBallPage from "@/components/FilterBallPage";
import { getLanguageAlternates } from "@/lib/seo";
import { FILTER_BALL_GASTRO_COLONOSCOPES } from "@/lib/site";

export const metadata: Metadata = {
  title: "3.2 mm / 위·대장내시경 겸용",
  alternates: getLanguageAlternates("/products/nolan-ball-3-2mm"),
};

export default function Page() {
  return <FilterBallPage data={FILTER_BALL_GASTRO_COLONOSCOPES} />;
}
