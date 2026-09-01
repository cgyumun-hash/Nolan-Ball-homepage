import type { Metadata } from "next";

import ActivityDetailPage from "@/components/activities/ActivityDetailPage";
import { getPublishedActivityBySlug } from "@/lib/server/activities";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedActivityBySlug(slug, "ko");
  if (!item) return {};
  return { title: item.title, description: item.excerpt || item.content.slice(0, 150) };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ActivityDetailPage slug={slug} />;
}
