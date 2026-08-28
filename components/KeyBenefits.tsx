import { KEY_BENEFITS } from "@/lib/site";
import { EN_KEY_BENEFITS } from "@/lib/site.en";
import { CN_KEY_BENEFITS } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

export default function KeyBenefits({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, KEY_BENEFITS, EN_KEY_BENEFITS, CN_KEY_BENEFITS);

  return (
    <section aria-labelledby="key-benefits-title" className="relative aspect-[1672/941] w-full overflow-hidden bg-[#f3f9fd] max-b580:aspect-[1003/1568]">
      <picture className="absolute inset-0 block">
        <source media="(max-width: 580px)" srcSet={content.imageMobile} />
        <img src={content.image} alt="" className="h-full w-full object-cover" />
      </picture>

      <div className="absolute left-[4.3%] top-[8.2%] z-10 max-w-[34%] text-blue-950 max-b580:left-6 max-b580:right-6 max-b580:top-7 max-b580:max-w-none">
        <p className="gfont mb-4 text-[clamp(11px,1vw,17px)] font-bold tracking-[0.08em] text-blue-700">{content.eyebrow}</p>
        <h2 id="key-benefits-title" className="gfont whitespace-pre-line text-[clamp(34px,3.9vw,66px)] font-extrabold leading-[1.12] tracking-[-0.04em] max-b580:text-[clamp(28px,8vw,40px)]">{content.heading}</h2>
      </div>

      <ol className="absolute inset-0 z-10">
        {content.items.map((item, index) => (
          <li
            key={item.no}
            className={`absolute pr-3 text-blue-950 ${index === 0 ? "left-[12.6%] top-[47%] w-[20%]" : index === 1 ? "left-[12.6%] top-[75.4%] w-[20%]" : index === 2 ? "left-[43.2%] top-[75.4%] w-[22%]" : "left-[70.8%] top-[85.2%] w-[24%]"} max-b580:left-[29%] max-b580:right-[6%] max-b580:w-auto ${index === 0 ? "max-b580:top-[39.5%]" : index === 1 ? "max-b580:top-[54.5%]" : index === 2 ? "max-b580:top-[69.5%]" : "max-b580:top-[84.5%]"}`}
          >
            <div className="flex items-baseline gap-[clamp(7px,0.65vw,12px)]">
              <span className="gfont shrink-0 text-[clamp(11px,0.9vw,17px)] font-bold text-blue-700 max-b580:text-[11px]">{item.no}</span>
              <h3 className="text-[clamp(15px,1.35vw,25px)] font-bold leading-[1.2] tracking-[-0.025em] max-b580:text-[clamp(14px,4vw,18px)]">{item.title}</h3>
            </div>
            <p className="mt-3 pl-[clamp(29px,2.05vw,39px)] text-[clamp(11px,0.92vw,17px)] leading-[1.55] text-slate-700 max-b580:mt-1.5 max-b580:pl-0 max-b580:text-[clamp(10px,3vw,13px)] max-b580:leading-[1.45]">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
