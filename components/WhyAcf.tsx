import Link from "next/link";

import { WHY } from "@/lib/site";
import { EN_WHY } from "@/lib/site.en";
import { CN_WHY } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

export default function WhyAcf({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, WHY, EN_WHY, CN_WHY);

  return (
    <section id="why-nolan-ball" aria-labelledby="why-nolan-ball-title" className="relative aspect-[1994/1100] w-full overflow-hidden bg-[#eef8fd] max-b580:aspect-[941/1672]">
      <picture className="absolute inset-0 block">
        <source media="(max-width: 580px)" srcSet={content.imageMobile} />
        <img
          src={content.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </picture>

      <div className="absolute left-[7%] top-[30%] z-10 max-w-[42%] text-[#222] max-b580:left-7 max-b580:right-7 max-b580:top-[12%] max-b580:max-w-none">
        <h2 id="why-nolan-ball-title" className="gfont text-[clamp(52px,5.9vw,118px)] font-extrabold leading-[0.94] tracking-[-0.06em] max-b580:text-[clamp(50px,15vw,72px)]">
          {content.headingLines.map((line) => <span key={line} className="block">{line}</span>)}
        </h2>
        <Link href={content.href} className="gfont mt-[12%] inline-flex items-center gap-7 pl-[0.25vw] text-[clamp(12px,1.2vw,22px)] font-bold tracking-[0.08em] text-blue-700 transition-colors hover:text-sky-600 max-b580:mt-12 max-b580:pl-0 max-b580:text-[14px]">
          {content.cta}<span aria-hidden="true" className="text-[1.7em] font-light">→</span>
        </Link>
      </div>

      <div className="absolute right-[5.5%] top-1/2 z-10 flex w-[21%] -translate-y-1/2 items-center gap-7 text-blue-700 max-b580:bottom-[17%] max-b580:left-7 max-b580:right-7 max-b580:top-auto max-b580:w-auto max-b580:translate-y-0">
        <strong className="gfont text-[clamp(24px,2.6vw,52px)]">{content.contact}</strong>
        <span className="h-px flex-1 bg-blue-600" />
      </div>
    </section>
  );
}
