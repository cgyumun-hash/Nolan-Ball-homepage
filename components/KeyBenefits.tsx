import { KEY_BENEFITS } from "@/lib/site";
import { EN_KEY_BENEFITS } from "@/lib/site.en";
import { CN_KEY_BENEFITS } from "@/lib/site.cn";
import { selectLocale, type SiteLocale } from "@/lib/locale";

export default function KeyBenefits({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, KEY_BENEFITS, EN_KEY_BENEFITS, CN_KEY_BENEFITS);
  const isEnglish = locale === "en";

  const desktopPositions = isEnglish
    ? [
        "left-[12.6%] top-[46%] w-[21%]",
        "left-[12.6%] top-[74%] w-[21%]",
        "left-[42.8%] top-[74%] w-[24%]",
        "left-[69.5%] top-[86.5%] w-[26%] max-b1080:top-[82.5%]",
      ] as const
    : [
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
    <section aria-labelledby="key-benefits-title" className="w-full overflow-hidden bg-[linear-gradient(90deg,#f8fbfd_0%,#f7fbfe_48%,#edf7fd_100%)]">
      <div className="relative mx-auto aspect-[1672/1000] w-[92%] max-w-[2000px] overflow-hidden max-b580:w-full max-b580:aspect-auto">
        <div
          className={`absolute z-20 text-blue-950 max-b580:relative max-b580:inset-auto max-b580:max-w-none max-b580:bg-white max-b580:px-6 max-b580:py-8 ${
            isEnglish ? "left-[6%] top-[9%] max-w-[34%] max-b1080:top-[6%] max-b1080:max-w-[35%]" : "left-[7%] top-[17%] max-w-[34%]"
          }`}
        >
          <p className="gfont mb-4 text-[clamp(11px,1vw,16px)] font-bold tracking-[0.08em] text-blue-700">{content.eyebrow}</p>
          <h2
            id="key-benefits-title"
            className={`gfont whitespace-pre-line font-extrabold tracking-[-0.04em] max-b580:text-[clamp(27px,8vw,38px)] max-b580:leading-[1.15] ${
              isEnglish ? "text-[clamp(28px,3.15vw,54px)] leading-[1.02] max-b1080:text-[clamp(24px,3.2vw,34px)]" : "text-[clamp(34px,3.9vw,60px)] leading-[1.12]"
            }`}
          >
            {content.heading}
          </h2>
        </div>

        <div className="absolute inset-0 max-b580:relative max-b580:inset-auto max-b580:aspect-[1003/1568]">
          <picture className="absolute inset-0 block">
            <source media="(max-width: 580px)" srcSet={content.imageMobile} />
            <img src={content.image} alt="" className="h-full w-full object-fill max-b580:object-cover" />
          </picture>
          <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[6%] bg-[linear-gradient(90deg,#f8fbfd_0%,rgba(248,251,253,0)_100%)] max-b580:hidden" />
          <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-[6%] bg-[linear-gradient(270deg,#edf7fd_0%,rgba(237,247,253,0)_100%)] max-b580:hidden" />

          <ol className="absolute inset-0 z-10">
            {content.items.map((item, index) => (
              <li
                key={item.no}
                className={`absolute pr-3 text-blue-950 ${desktopPositions[index]} ${mobilePositions[index]} max-b580:w-auto max-b580:rounded-xl max-b580:border max-b580:border-sky-100 max-b580:bg-white/90 max-b580:px-3 max-b580:py-2.5 max-b580:shadow-[0_8px_24px_rgba(22,84,145,0.08)] max-b580:backdrop-blur-[2px]`}
              >
                <div className="flex items-baseline gap-[clamp(7px,0.65vw,12px)] max-b580:gap-2">
                  <span className={`gfont shrink-0 font-bold text-blue-700 max-b580:text-[10px] ${isEnglish ? "text-[clamp(10px,0.75vw,14px)]" : "text-[clamp(11px,0.9vw,16px)]"}`}>{item.no}</span>
                  <h3 className={`font-bold leading-[1.2] tracking-[-0.025em] max-b580:text-[clamp(12px,3.5vw,16px)] max-b580:leading-[1.22] ${isEnglish ? "text-[clamp(13px,1.05vw,20px)]" : "text-[clamp(15px,1.35vw,23px)]"}`}>{item.title}</h3>
                </div>
                <p className={`pl-[clamp(29px,2.05vw,39px)] leading-[1.5] text-slate-700 max-b580:mt-1 max-b580:pl-0 max-b580:text-[clamp(9px,2.7vw,12px)] max-b580:leading-[1.4] ${isEnglish ? "mt-2 text-[clamp(9px,0.75vw,14px)]" : "mt-3 text-[clamp(11px,0.92vw,16px)]"}`}>{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
