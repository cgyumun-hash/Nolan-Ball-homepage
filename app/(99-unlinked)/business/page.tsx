import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import { BUSINESS, SUBHEADER_BG, TECHNOLOGY_PAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "사업분야",
};

function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub21.php
 *
 *   .subheader_outer.sub02        배경 subheader_2.jpg · h2(대분류) 없음
 *   .sub21.pt250.pb300            250/300px → 1080↓ 150/200px
 *     .wrap_in
 *       .s1 { margin-bottom:250px }        1600↓ 150px · 1200↓ 100px
 *         h4 { font-size:48px; "Goblin One"; color:#1EAC44; margin-bottom:10px }
 *              1600↓ 40px · 1200↓ 28px
 *         p  { font-size:32px }            1600↓ 24px · 1200↓ 20px
 *       .s2
 *         ul { display:flex; justify-content:space-between; align-items:center;
 *              margin-bottom:250px; gap:50px }
 *              1200↓ flex-direction:column + margin-bottom:150px
 *              마지막 ul 은 margin-bottom:0
 *         ul.left  1200↓ flex-direction:column-reverse
 *         img  669×704            1600↓ width:500px · 548↓ 100%
 *         h5 { font-size:36px; GmarketSans; margin-bottom:50px }
 *              1600↓ mb:20px · 520↓ 28px
 *         span { color:#FF9D00; font-size:50px; margin-right:20px }
 *              1600↓ 40px · 520↓ 28px
 *         h6 { font-size:24px; font-weight:500 }     1600↓ 20px
 *         p  { position:relative; padding-top:60px } 1600↓ font-size:14px
 *         p::before { top:30px; right:0; width:130%; height:1px; background:#d9d9d9 }
 *              1600↓ 110% · 1200↓ 100%
 *              .left 은 left:0 기준 (선이 반대 방향으로 뻗습니다)
 *
 * 이 페이지에는 data-aos 속성이 없어 스크롤 등장 효과를 넣지 않았습니다.
 */
export default function BusinessAreasPage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />

      <SubHeader
        title={BUSINESS.title}
        pager={TECHNOLOGY_PAGES}
        current={BUSINESS.title}
        breadcrumb={[BUSINESS.title]}
        bg={SUBHEADER_BG.sub02}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        <div className="wrap-in">
          {/* .s1 — 상단 리드 */}
          <div className="mb-[250px] max-b1600:mb-[150px] max-b1200:mb-[100px]">
            <h4
              className="font-display mb-2.5 text-[48px] text-brand-500
                         max-b1600:text-[40px] max-b1200:text-[28px]"
            >
              {BUSINESS.leadTitle}
            </h4>
            <p className="text-[32px] max-b1600:text-[24px] max-b1200:text-[20px]">
              {BUSINESS.leadText}
            </p>
          </div>

          {/* .s2 — 사업 4개 */}
          <div>
            {BUSINESS.items.map((item, index) => {
              const last = index === BUSINESS.items.length - 1;

              const image = (
                <li className="max-b548:w-full">
                  {hasImage(item.image) ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.image}
                      alt=""
                      className="max-b1600:w-[500px] max-b548:w-full"
                    />
                  ) : (
                    /* 원본 이미지는 669×704 */
                    <div
                      className="flex aspect-[669/704] w-[669px] max-w-full items-center justify-center
                                 bg-[linear-gradient(150deg,#e9efe6_0%,#c3d6bd_60%,#8fae86_100%)]
                                 text-[13px] text-white/90
                                 max-b1600:w-[500px] max-b548:w-full"
                    >
                      public{item.image}
                    </div>
                  )}
                </li>
              );

              const text = (
                <li className="max-b548:w-full">
                  <h5 className="gfont mb-[50px] text-[36px] max-b1600:mb-5 max-b520:text-[28px]">
                    <span className="mr-5 text-[50px] text-accent-500 max-b1600:text-[40px] max-b520:text-[28px]">
                      {item.no}
                    </span>
                    {item.name}
                  </h5>

                  <h6 className="text-[24px] font-medium max-b1600:text-[20px]">
                    {item.quote}
                  </h6>

                  {/* 원본 p — 위쪽에 ::before 로 가로선이 그어집니다 */}
                  <div className="relative pt-[60px] max-b1600:text-[14px]">
                    <span
                      className={`absolute top-[30px] h-px w-[130%] bg-line
                                  max-b1600:w-[110%] max-b1200:w-full
                                  ${item.reversed ? "left-0" : "right-0"}`}
                    />
                    {item.body.map((paragraph, pi) => (
                      <p
                        key={pi}
                        className={pi < item.body.length - 1 ? "mb-6" : ""}
                      >
                        {paragraph.map((line, li) => (
                          <span key={li} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </li>
              );

              return (
                <ul
                  key={item.no}
                  className={`flex items-center justify-between gap-[50px]
                              max-b1200:mb-[150px]
                              ${last ? "mb-0" : "mb-[250px]"}
                              ${
                                item.reversed
                                  ? "max-b1200:flex-col-reverse"
                                  : "max-b1200:flex-col"
                              }`}
                >
                  {item.reversed ? (
                    <>
                      {text}
                      {image}
                    </>
                  ) : (
                    <>
                      {image}
                      {text}
                    </>
                  )}
                </ul>
              );
            })}
          </div>
        </div>
      </main>

      <Footer bordered />
    </>
  );
}
