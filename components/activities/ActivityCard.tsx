import Image from "next/image";
import Link from "next/link";

import type { ActivityListItem } from "@/lib/activities";

type ActivityCopy = {
  filters: Record<string, string>;
  readMore: string;
};

function formatDate(value: string | null, locale: "ko" | "en" | "cn") {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(
    locale === "ko" ? "ko-KR" : locale === "cn" ? "zh-CN" : "en-US",
    { year: "numeric", month: "2-digit", day: "2-digit" },
  ).format(date);
}

function dateRange(item: ActivityListItem, locale: "ko" | "en" | "cn") {
  const start = formatDate(item.eventStartDate, locale);
  const end = formatDate(item.eventEndDate, locale);
  if (!start) return "";
  return end && end !== start ? `${start} – ${end}` : start;
}

export default function ActivityCard({
  item,
  locale,
  copy,
  href,
}: {
  item: ActivityListItem;
  locale: "ko" | "en" | "cn";
  copy: ActivityCopy;
  href: string;
}) {
  const date = dateRange(item, locale);
  const category = copy.filters[item.category] ?? item.category;

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[18px] border border-[#dbe5ef] bg-white shadow-[0_18px_55px_rgba(17,56,105,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(17,56,105,0.14)]">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-[#082a66]">
        {item.coverImageUrl ? (
          <Image
            src={item.coverImageUrl}
            alt={item.coverImageAlt || item.title}
            fill
            sizes="(max-width: 580px) 100vw, (max-width: 1079px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.035]"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_74%_30%,#236fd6_0%,#0b3989_36%,#061c52_76%)]">
            <span className="absolute -bottom-16 -left-20 h-52 w-[125%] rotate-[-8deg] rounded-[50%] border border-sky-300/50" />
            <span className="absolute bottom-1 left-[-10%] h-24 w-[120%] rotate-[7deg] rounded-[50%] border border-sky-400/60" />
          </div>
        )}
        <span className="absolute bottom-4 left-4 rounded-full bg-[#0755a4]/90 px-4 py-2 text-[13px] font-bold text-white backdrop-blur-sm">
          {category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 max-b580:p-5">
        {(date || item.location) && (
          <div className="mb-4 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-slate-500">
            {date && (
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden>▣</span>
                {date}
              </span>
            )}
            {item.location && <span className="min-w-0 break-words">{item.location}</span>}
          </div>
        )}
        <h2 className="mb-3 min-w-0 break-words text-[21px] font-extrabold leading-[1.35] text-[#102a52] [overflow-wrap:anywhere] max-b580:text-[19px]">
          <Link href={href}>{item.title}</Link>
        </h2>
        {item.excerpt && (
          <p className="mb-6 line-clamp-3 min-w-0 break-words text-[15px] leading-[1.75] text-slate-600 [overflow-wrap:anywhere]">
            {item.excerpt}
          </p>
        )}
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-3 text-[14px] font-bold text-[#0755a4] transition-all group-hover:gap-4"
        >
          {copy.readMore} <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
