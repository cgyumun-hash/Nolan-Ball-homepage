import fs from "node:fs";
import path from "node:path";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import {
  PRODUCTS_PAGES,
  PRODUCT_SPECS,
  SUBHEADER_BG,
  type FilterBall,
} from "@/lib/site";
import { EN_PRODUCTS_PAGES, EN_PRODUCT_SPECS } from "@/lib/site.en";
import type { SiteLocale } from "@/lib/locale";

function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub31.php ~ sub33.php 공통 레이아웃
 *
 *   .sub31.pt250.pb300                250/300px → 1080↓ 150/200px
 *     .wrap_in2                       1400px (1600↓ 90%)
 *       .s1.mb200 { display:flex; justify-content:space-between;
 *                   align-items:center; gap:50px }
 *                   860↓ flex-direction:column · .mb200 → 100px
 *         .c1 img  408×408            1400↓ .c1 width:300px + img 100%
 *         .c2 { width:60% }           1400↓ 70% · 860↓ 100%
 *           h6 { font-size:28px }     520↓ 24px      (색상은 제품별 인라인)
 *           h4 { font-size:50px; margin-bottom:50px }
 *                860↓ 40px/40px · 520↓ 30px/30px
 *           p span { font-weight:600 }
 *       .s2
 *         .c1 { display:flex; justify-content:space-between }  860↓ column-reverse
 *         .c2 { display:flex; justify-content:space-between }  860↓ column
 *         .c1 ul { background:#F7F8FD; padding:50px; border-radius:50px; width:71% }
 *                  1400↓ 73% · 860↓ 100% + radius 0 · 520↓ padding 25px
 *         .c2 ul { 같음, width:66% }
 *         ul li { margin-bottom:30px; font-size:22px; display:flex;
 *                 gap:50px; align-items:center }   마지막 mb:0
 *                 1400↓ 18px · 980↓ mb:10px + gap:20px
 *                 860↓ align-items:flex-start · 520↓ 16px
 *         ul li img  28×30 / 28×31    980↓ width:20px · 860↓ margin-top:10px
 *         .c1 .b1 { width:25%; background:#1EAC44 }
 *         .c2 .b1 { width:30%; background:#FF9D00 }
 *                   공통: 흰 글자 · radius 50px · flex 가운데 · 40px bold
 *                   1400↓ 30px · 860↓ width:100% + radius 0 · 520↓ 24px + padding 10px 0
 *         .mb50  50px → 1400↓ 30px
 *
 * 이 페이지에는 data-aos 속성이 없어 스크롤 등장 효과를 넣지 않았습니다.
 */
export default function FilterBallPage({ data, locale = "ko" }: { data: FilterBall; locale?: SiteLocale }) {
  const productPages = locale === "en" ? EN_PRODUCTS_PAGES : PRODUCTS_PAGES;
  const productSpecs = locale === "en" ? EN_PRODUCT_SPECS : PRODUCT_SPECS;
  const listItem = (text: string, index: number) => (
    <li
      key={text}
      className="mb-[30px] flex items-center gap-[50px] text-[22px] last:mb-0
                 max-b1400:text-[18px]
                 max-b980:mb-2.5 max-b980:gap-5
                 max-b860:items-start
                 max-b520:text-[16px]"
    >
      <span className="gfont w-[28px] shrink-0 text-center text-[22px] font-bold text-black max-b980:w-5 max-b980:text-[18px]" aria-hidden>
        {String.fromCharCode(0x2460 + index)}
      </span>
      <p>{text}</p>
    </li>
  );

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />

      <SubHeader
        eyebrow={data.eyebrow}
        title={data.title}
        pager={productPages}
        current={data.title}
        breadcrumb={[data.eyebrow, data.title]}
        bg={SUBHEADER_BG.product}
        locale={locale}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px] max-b580:pt-20 max-b580:pb-[120px]">
        <div className="wrap-in2">
          {/* ── .s1 : 제품 이미지 + 설명 ─────────────────────────── */}
          <div
            className="mb-[320px] flex items-center justify-between gap-[50px]
                       max-b1080:mb-[240px] max-b860:mb-[180px] max-b860:flex-col max-b580:mb-[130px] max-b580:gap-8"
          >
            <div className="max-b1400:w-[300px]">
              {hasImage(data.image) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={data.image} alt="" className="max-b1400:w-full" />
              ) : (
                /* 파일이 없을 때 — 원본과 같은 비율로 자리를 잡습니다
                   (필터볼 408×408 정사각 · 밸브 브러시 398×298 가로형) */
                <div
                  className="flex max-w-full items-center justify-center
                             bg-[radial-gradient(circle_at_35%_30%,#f2f4f8_0%,#cfd6e4_45%,#8d9ab3_100%)]
                             text-[13px] text-white max-b1400:w-full"
                  style={{
                    width: `${data.imageWidth}px`,
                    aspectRatio: `${data.imageWidth} / ${data.imageHeight}`,
                    borderRadius:
                      data.imageWidth === data.imageHeight ? "9999px" : "16px",
                  }}
                >
                  public{data.image}
                </div>
              )}
            </div>

            <div className="w-[60%] max-b1400:w-[70%] max-b860:w-full">
              {/* sub34(밸브 브러시)에는 이 줄이 없습니다 */}
              {data.brand && (
                <h6
                  className="gfont text-[28px] max-b520:text-[24px]"
                  style={{ color: data.brandColor }}
                >
                  {data.brand}
                </h6>
              )}
              <h4
                className="gfont mb-[50px] text-[50px]
                           max-b860:mb-10 max-b860:text-[40px]
                           max-b520:mb-[30px] max-b520:text-[clamp(26px,8vw,32px)] max-b520:leading-[1.3]"
              >
                {data.subtitle}
              </h4>

              <div>
                {data.intro.map((paragraph, pi) => (
                  <p
                    key={pi}
                    className={pi < data.intro.length - 1 ? "mb-6" : ""}
                  >
                    {paragraph.map((seg, si) =>
                      seg.b ? (
                        <span key={si} className="font-semibold">
                          {seg.t}
                        </span>
                      ) : (
                        <span key={si}>{seg.t}</span>
                      ),
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ── .s2 : Features / Effects ────────────────────────── */}
          <div className="relative">
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 h-full w-full max-b860:hidden"
              viewBox="0 0 1400 720"
              preserveAspectRatio="none"
            >
              <path
                d="M 420 553 C 650 628, 755 578, 820 365 C 870 215, 970 170, 1050 170"
                fill="none"
                stroke="#111111"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
            {/* .c1 — 목록이 왼쪽, 초록 라벨이 오른쪽 (860↓ 라벨이 위로) */}
            <div
              className="relative z-10 mb-[50px] flex justify-between
                         max-b1400:mb-[30px] max-b860:flex-col-reverse"
            >
              <ul
                className="w-[71%] bg-[#f2f4f6] p-[50px]
                           max-b1400:w-[73%]
                           max-b860:w-full
                           max-b520:p-[25px]"
              >
                {data.features.map((f, index) => listItem(f, index))}
              </ul>
              <div
                className="gfont flex w-1/4 items-center justify-center bg-[#3182F6] pl-[7%] text-center text-[36px] font-bold text-white [clip-path:polygon(18%_0,100%_0,100%_100%,18%_100%,0_50%)]
                           max-b1400:text-[30px]
                           max-b860:w-full max-b860:pl-0 max-b860:[clip-path:none]
                           max-b520:py-2.5 max-b520:text-[24px]"
              >
                Features
              </div>
            </div>

            {/* .c2 — 주황 라벨이 왼쪽, 목록이 오른쪽 */}
            <div className="relative z-10 flex justify-between max-b860:flex-col">
              <div
                className="gfont flex w-[30%] items-center justify-center bg-[#0064FF] pr-[7%] text-center text-[36px] font-bold text-white [clip-path:polygon(0_0,82%_0,100%_50%,82%_100%,0_100%)]
                           max-b1400:text-[30px]
                           max-b860:w-full max-b860:pr-0 max-b860:[clip-path:none]
                           max-b520:py-2.5 max-b520:text-[24px]"
              >
                Effects
              </div>
              <ul
                className="w-[66%] bg-[#f2f4f6] p-[50px]
                           max-b860:w-full
                           max-b520:p-[25px]"
              >
                {data.effects.map((e, index) => listItem(e, index))}
              </ul>
            </div>
          </div>

          {/* ── 제품 규격 (자료정리 3-3) ─────────────────────────
              세 제품 페이지가 같은 표를 공유합니다. 현재 페이지 규격에
              해당하는 줄을 굵게 표시합니다. */}
          <h3
            className="gfont mt-[410px] mb-[40px] text-[40px] font-bold text-ink-900
                       max-b1080:mt-[240px] max-b1080:text-[30px] max-b520:mt-[160px] max-b520:text-[24px]"
          >
            {productSpecs.heading}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-center">
              <thead>
                <tr className="h-[60px] border-y border-ink-900 bg-[#fafafa] text-[16px] font-bold">
                  {productSpecs.columns.map((c) => (
                    <th key={c} className="px-3">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {productSpecs.rows.map((r) => {
                  const on = data.title.startsWith(r.use.replace(" 내시경", ""));
                  return (
                    <tr
                      key={r.use}
                      className={`h-[62px] border-b border-line text-[16px] max-b520:text-[14px] ${
                        on ? "bg-brand-500/8 font-bold text-ink-900" : "text-ink-500"
                      }`}
                    >
                      <td className="px-3">{r.use}</td>
                      <td className="px-3">{r.purpose}</td>
                      <td className="px-3">{r.spec}</td>
                      <td className="px-3">{r.status}</td>
                      <td className="px-3">{r.pack}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-[15px] leading-[1.7] text-ink-500 max-b520:text-[13px]">
            {productSpecs.note}
          </p>
        </div>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}
