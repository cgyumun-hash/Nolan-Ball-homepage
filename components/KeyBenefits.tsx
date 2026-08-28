import { KEY_BENEFITS } from "@/lib/site";
import { EN_KEY_BENEFITS } from "@/lib/site.en";
import { CN_KEY_BENEFITS } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

export default function KeyBenefits({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, KEY_BENEFITS, EN_KEY_BENEFITS, CN_KEY_BENEFITS);

  const desktopPositions = [
    "left-[12.6%] top-[47%] w-[20%]",
    "left-[12.6%] top-[75.4%] w-[20%]",
    "left-[43.2%] top-[75.4%] w-[22%]",
    "left-[70.8%] top-[85.2%] w-[24%]",
  ] as const;

  // The mobile artwork reserves a fixed media column on the left of each row.
  // Keep the copy inside the remaining blank area so the illustrations and text
  // never compete for the same space (the fourth row has two illustrations).
  const mobilePositions = [
    "max-b580:left-[27%] max-b580:right-[5%] max-b580:top-[41.4%]",
    "max-b580:left-[27%] max-b580:right-[5%] max-b580:top-[56.7%]",
    "max-b580:left-[27%] max-b580:right-[5%] max-b580:top-[71.7%]",
    "max-b580:left-[43%] max-b580:right-[5%] max-b580:top-[86.7%]",
  ] as const;

  return (
    <section aria-labelledby="key-benefits-title" className="relative aspect-[1672/941] w-full overflow-hidden bg-[#f3f9fd] max-b580:aspect-auto">
      <div className="absolute left-[4.3%] top-[8.2%] z-20 max-w-[34%] text-blue-950 max-b580:relative max-b580:inset-auto max-b580:max-w-none max-b580:bg-white max-b580:px-6 max-b580:py-8">
        <p className="gfont mb-4 text-[clamp(11px,1vw,17px)] font-bold tracking-[0.08em] text-blue-700">{content.eyebrow}</p>
        <h2 id="key-benefits-title" className="gfont whitespace-pre-line text-[clamp(34px,3.9vw,66px)] font-extrabold leading-[1.12] tracking-[-0.04em] max-b580:text-[clamp(27px,8vw,38px)] max-b580:leading-[1.15]">{content.heading}</h2>
      </div>

      <div className="absolute inset-0 max-b580:relative max-b580:inset-auto max-b580:aspect-[1003/1568]">
        <picture className="absolute inset-0 block">
          <source media="(max-width: 580px)" srcSet={content.imageMobile} />
          <img src={content.image} alt="" className="h-full w-full object-cover" />
        </picture>

        <ol className="absolute inset-0 z-10">
          {content.items.map((item, index) => (
            <li
              key={item.no}
              className={`absolute pr-3 text-blue-950 ${desktopPositions[index]} ${mobilePositions[index]} max-b580:w-auto max-b580:rounded-xl max-b580:border max-b580:border-sky-100 max-b580:bg-white/90 max-b580:px-3 max-b580:py-2.5 max-b580:shadow-[0_8px_24px_rgba(22,84,145,0.08)] max-b580:backdrop-blur-[2px]`}
            >
              <div className="flex items-baseline gap-[clamp(7px,0.65vw,12px)] max-b580:gap-2">
                <span className="gfont shrink-0 text-[clamp(11px,0.9vw,17px)] font-bold text-blue-700 max-b580:text-[10px]">{item.no}</span>
                <h3 className="text-[clamp(15px,1.35vw,25px)] font-bold leading-[1.2] tracking-[-0.025em] max-b580:text-[clamp(12px,3.5vw,16px)] max-b580:leading-[1.22]">{item.title}</h3>
              </div>
              <p className="mt-3 pl-[clamp(29px,2.05vw,39px)] text-[clamp(11px,0.92vw,17px)] leading-[1.55] text-slate-700 max-b580:mt-1 max-b580:pl-0 max-b580:text-[clamp(9px,2.7vw,12px)] max-b580:leading-[1.4]">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
