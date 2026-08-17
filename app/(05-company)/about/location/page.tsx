import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import FadeUp from "@/components/FadeUp";
import KakaoRoughMap from "@/components/KakaoRoughMap";
import type { SiteLocale } from "@/lib/locale";
import { COMPANY_PAGES, LOCATION, SUBHEADER_BG } from "@/lib/site";
import { EN_COMPANY_PAGES, EN_LOCATION } from "@/lib/site.en";

export const metadata: Metadata = {
  title: "오시는 길",
};

function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub15.php
 *
 *   .sub15.pt250.pb300                250/300px → 1080↓ 150/200px
 *     .wrap_in
 *       .w1.mb200
 *         .title_box { display:flex; gap:15px; align-items:center }
 *           .left_box { width:10px; height:50px; background:#1EAC44 }  1200↓ height:35px
 *           h4        { font-size:48px; GmarketSans }
 *                       1200↓ 36px · 520↓ 28px + margin-bottom:10px
 *         p  { font-size:24px; GmarketSans; margin-left:30px; margin-bottom:50px }
 *             1200↓ 20px · 520↓ 18px
 *         .map_box  data-aos="fade-up" data-aos-duration="3000"
 *                   카카오맵 roughmap · mapHeight 579
 *       .w2
 *         .title_box.mb80                                  520↓ mb:50px
 *         ul { display:flex; background:#FAFAFA; padding:40px; align-items:flex-start;
 *              border-top/bottom-right-radius:50px;
 *              box-shadow: 0 3px 6px rgba(0,0,0,.16), 0 3px 6px rgba(0,0,0,.23) }
 *              마지막 ul 은 radius 100px · 860↓ flex-direction:column
 *           li { display:flex; align-items:center; gap:20px }  860↓ margin-bottom:20px
 *           img  47×53 / 50×48                                 980↓ width:35px
 *           h6 { color:#615B5F; margin-right:80px; GmarketSans; font-size:24px }
 *                980↓ margin-right:60px + 20px
 *           p  { font-size:24px; GmarketSans; font-weight:lighter }  1200↓ 18px
 *             span { font-weight:normal }
 *           .c1 p { margin-bottom:60px }   1200↓ 30px   마지막 줄은 0
 *           .lh50 { line-height:50px }     1200↓ 35px
 */
export function LocationPageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = locale === "en" ? EN_LOCATION : LOCATION;
  const pages = locale === "en" ? EN_COMPANY_PAGES : COMPANY_PAGES;

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />

      <SubHeader
        eyebrow={content.eyebrow}
        title={content.title}
        pager={pages}
        current={content.title}
        breadcrumb={[content.eyebrow, content.title]}
        bg={SUBHEADER_BG.company}
        locale={locale}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px] max-b580:pt-20 max-b580:pb-[120px]">
        <div className="wrap-in">
          {/* ── .w1 : 본사 주소 + 지도 ──────────────────────────── */}
          <div className="mb-[200px] max-b580:mb-[100px]">
            <div className="flex items-center gap-[15px]">
              <div className="h-[50px] w-2.5 shrink-0 bg-brand-500 max-b1200:h-[35px]" />
              <h4 className="gfont text-[48px] max-b1200:text-[36px] max-b520:mb-2.5 max-b520:text-[28px]">
                {content.officeTitle}
              </h4>
            </div>

            <p className="gfont mb-[50px] ml-[30px] text-[24px] max-b1200:text-[20px] max-b520:text-[18px]">
              {content.officeAddress}
            </p>

            {/* 원본 data-aos="fade-up" data-aos-duration="3000" — 3초짜리 느린 페이드 */}
            <FadeUp duration={3}>
              <KakaoRoughMap
                timestamp={content.map.timestamp}
                mapKey={content.map.key}
                height={content.map.height}
                address={content.officeAddress}
                placeName={content.map.name}
                latitude={content.map.latitude}
                longitude={content.map.longitude}
                linkLabel={locale === "en" ? "Open in Kakao Map" : undefined}
              />
            </FadeUp>
          </div>

          {/* ── .w2 : 대중교통 ──────────────────────────────────── */}
          <div>
            <div className="mb-[80px] flex items-center gap-[15px] max-b520:mb-[50px]">
              <div className="h-[50px] w-2.5 shrink-0 bg-brand-500 max-b1200:h-[35px]" />
              <h4 className="gfont text-[48px] max-b1200:text-[36px] max-b520:mb-2.5 max-b520:text-[28px]">
                {content.transitTitle}
              </h4>
            </div>

            {content.transit.map((row, rowIndex) => {
              const last = rowIndex === content.transit.length - 1;
              return (
                <ul
                  key={row.label}
                  className={`flex items-start bg-[#FAFAFA] p-10 max-b580:p-6
                              shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]
                              max-b860:flex-col
                              ${
                                last
                                  ? "rounded-r-[100px]"
                                  : "mb-[50px] rounded-r-[50px]"
                              }`}
                >
                  <li className="flex items-center gap-5 max-b860:mb-5">
                    {hasImage(row.icon) ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={row.icon}
                        alt=""
                        className="shrink-0 max-b980:w-[35px]"
                      />
                    ) : (
                      /* 원본 아이콘 47×53 / 50×48 */
                      <span className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-full border border-line text-ink-500 max-b980:h-[35px] max-b980:w-[35px]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                          <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" />
                        </svg>
                      </span>
                    )}
                    <h6 className="gfont mr-[80px] shrink-0 text-[24px] text-[#615B5F] max-b980:mr-[60px] max-b980:text-[20px] max-b580:mr-0">
                      {row.label}
                    </h6>
                  </li>

                  <div>
                    {row.lines.map((line, i) => (
                      <p
                        key={i}
                        className={`gfont text-[24px] font-light max-b1200:text-[18px]
                                    ${
                                      row.lines.length > 1 &&
                                      i < row.lines.length - 1
                                        ? "mb-[60px] max-b1200:mb-[30px]"
                                        : ""
                                    }`}
                      >
                        {"bold" in line && line.bold && (
                          <span
                            className={`font-normal ${
                              "wide" in line && line.wide
                                ? "leading-[50px] max-b1200:leading-[35px]"
                                : ""
                            }`}
                          >
                            {line.bold}
                          </span>
                        )}
                        {"wide" in line && line.wide && <br />}
                        {line.text}
                      </p>
                    ))}
                  </div>
                </ul>
              );
            })}
          </div>
        </div>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}

export default function LocationPage() {
  return <LocationPageContent />;
}
