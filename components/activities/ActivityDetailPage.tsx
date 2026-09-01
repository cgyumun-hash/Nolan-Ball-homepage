import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import type { SiteLocale } from "@/lib/locale";
import { selectLocale } from "@/lib/locale";
import { getPublishedActivityBySlug } from "@/lib/server/activities";
import { ACTIVITIES, COMPANY_PAGES, SUBHEADER_BG } from "@/lib/site";
import { EN_ACTIVITIES, EN_COMPANY_PAGES } from "@/lib/site.en";
import { CN_ACTIVITIES, CN_COMPANY_PAGES } from "@/lib/site.cn";

function formatDate(value: string | null, locale: SiteLocale) {
  if (!value) return "";
  return new Intl.DateTimeFormat(
    locale === "ko" ? "ko-KR" : locale === "cn" ? "zh-CN" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  ).format(new Date(`${value}T00:00:00`));
}

function getVideoEmbed(url: string | null) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.hostname === "www.youtube.com" || parsed.hostname === "youtube.com") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (parsed.hostname === "vimeo.com" || parsed.hostname === "www.vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

export default async function ActivityDetailPage({
  slug,
  locale = "ko",
}: {
  slug: string;
  locale?: SiteLocale;
}) {
  const copy = selectLocale(locale, ACTIVITIES, EN_ACTIVITIES, CN_ACTIVITIES);
  const pages = selectLocale(locale, COMPANY_PAGES, EN_COMPANY_PAGES, CN_COMPANY_PAGES);
  const item = await getPublishedActivityBySlug(slug, locale);
  if (!item) notFound();

  const basePath = locale === "ko" ? "/about/activities" : `/${locale}/about/activities`;
  const start = formatDate(item.eventStartDate, locale);
  const end = formatDate(item.eventEndDate, locale);
  const date = start && end && end !== start ? `${start} – ${end}` : start;
  const embedUrl = getVideoEmbed(item.videoUrl);

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />
      <SubHeader
        eyebrow={copy.eyebrow}
        title={copy.title}
        pager={pages}
        current={copy.title}
        breadcrumb={[copy.eyebrow, copy.title, item.title]}
        bg={SUBHEADER_BG.activities}
        locale={locale}
      />

      <main className="bg-white py-[150px] max-b1080:py-[110px] max-b580:py-20">
        <article className="wrap-in2 min-w-0">
          <header className="mx-auto mb-16 max-w-[1050px] border-b border-[#cedae6] pb-10 text-center max-b580:mb-10 max-b580:pb-7">
            <span className="mb-5 inline-block rounded-full bg-[#e8f3ff] px-4 py-2 text-[13px] font-bold text-[#0755a4]">
              {copy.filters[item.category] ?? item.category}
            </span>
            <h1 className="headline-font min-w-0 break-words text-[52px] leading-[1.2] text-[#102a52] [overflow-wrap:anywhere] max-b1080:text-[42px] max-b580:text-[30px]">
              {item.title}
            </h1>
            {(date || item.location) && (
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px] text-slate-500">
                {date && <span>{copy.eventDate} · {date}</span>}
                {item.location && <span>{copy.location} · {item.location}</span>}
              </div>
            )}
          </header>

          {item.coverImageUrl && (
            <figure className="relative mx-auto mb-16 aspect-[16/9] max-w-[1200px] overflow-hidden rounded-[28px] bg-[#eaf2f8] max-b580:mb-10 max-b580:rounded-[18px]">
              <Image
                src={item.coverImageUrl}
                alt={item.coverImageAlt || item.title}
                fill
                priority
                sizes="(max-width: 580px) 100vw, 90vw"
                className="object-cover"
              />
            </figure>
          )}

          <div className="mx-auto max-w-[920px] min-w-0">
            {item.excerpt && (
              <p className="mb-10 border-l-4 border-[#1677c8] bg-[#f3f8fd] px-7 py-6 text-[20px] font-medium leading-[1.75] text-[#27405f] max-b580:px-5 max-b580:text-[17px]">
                {item.excerpt}
              </p>
            )}
            <div className="space-y-7 text-[18px] leading-[1.95] text-slate-700 [overflow-wrap:anywhere] max-b580:text-[16px]">
              {item.content
                .split(/\n{2,}/)
                .map((paragraph) => paragraph.trim())
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p key={`${index}-${paragraph.slice(0, 24)}`} className="whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>

          {item.gallery.length > 0 && (
            <section className="mx-auto mt-24 max-w-[1200px] max-b580:mt-16">
              <h2 className="mb-8 text-[30px] font-extrabold text-[#102a52] max-b580:text-[24px]">{copy.gallery}</h2>
              <div className="grid grid-cols-2 gap-6 max-b580:grid-cols-1 max-b580:gap-4">
                {item.gallery.map((src, index) => (
                  <figure key={src} className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#eaf2f8]">
                    <Image src={src} alt={`${item.title} ${index + 1}`} fill sizes="(max-width: 580px) 100vw, 45vw" className="object-cover" />
                  </figure>
                ))}
              </div>
            </section>
          )}

          {item.videoUrl && (
            <section className="mx-auto mt-24 max-w-[1000px] max-b580:mt-16">
              <h2 className="mb-8 text-[30px] font-extrabold text-[#102a52] max-b580:text-[24px]">{copy.video}</h2>
              <div className="aspect-video overflow-hidden rounded-[20px] bg-black">
                {embedUrl ? (
                  <iframe
                    src={embedUrl}
                    title={`${item.title} ${copy.video}`}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={item.videoUrl}
                    className="h-full w-full object-contain"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    Your browser does not support the video element.
                  </video>
                )}
              </div>
            </section>
          )}

          <div className="mt-24 text-center max-b580:mt-16">
            <Link href={basePath} className="inline-flex rounded-full border border-[#0755a4] px-7 py-3.5 font-bold text-[#0755a4] transition hover:bg-[#0755a4] hover:text-white">
              ← {copy.backToList}
            </Link>
          </div>
        </article>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}
