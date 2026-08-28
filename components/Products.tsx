import Link from "next/link";

import { PRODUCTS } from "@/lib/site";
import { EN_PRODUCTS } from "@/lib/site.en";
import { CN_PRODUCTS } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

export default function Products({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, PRODUCTS, EN_PRODUCTS, CN_PRODUCTS);

  return (
    <section id="products" aria-labelledby="products-title" className="relative aspect-[1672/941] w-full overflow-hidden bg-[#dff2fc] max-b580:aspect-[941/1672]">
      <picture className="absolute inset-0 block">
        <source media="(max-width: 580px)" srcSet={content.imageMobile} />
        <img src={content.image} alt="" className="h-full w-full object-cover" />
      </picture>

      <div className="absolute right-[6%] top-[34%] z-10 w-[42%] -translate-y-1/2 text-blue-950 max-b1080:right-[5%] max-b1080:w-[46%] max-b580:left-7 max-b580:right-7 max-b580:top-[9%] max-b580:w-auto max-b580:translate-y-0">
        <p className="gfont text-[14px] font-bold tracking-[0.23em] text-sky-700">{content.brand}</p>
        <h2 id="products-title" className="gfont mt-4 text-[clamp(44px,5vw,88px)] font-extrabold leading-none tracking-[-0.04em] max-b580:mt-2 max-b580:text-[clamp(44px,14vw,64px)]">{content.heading}</h2>
        <p className="mt-5 text-[clamp(14px,1.25vw,21px)] font-medium leading-[1.6] text-blue-900 max-b580:mt-3 max-b580:text-[14px]">{content.desc}</p>
        <Link href={content.href} className="gfont mt-7 inline-flex min-h-12 items-center rounded-full bg-blue-700 px-7 text-[14px] font-extrabold text-white transition-colors hover:bg-blue-800 max-b580:mt-5 max-b580:min-h-10 max-b580:text-[12px]">{content.cta}</Link>
        <p className="mt-4 max-w-[560px] text-[clamp(9px,0.7vw,12px)] leading-[1.6] text-slate-500 max-b580:text-[10px]">{content.disclaimer}</p>
      </div>
    </section>
  );
}
