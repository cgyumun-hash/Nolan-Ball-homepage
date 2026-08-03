import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Header from "@/components/Header";
import SubHeader from "@/components/SubHeader";
import Footer from "@/components/Footer";
import InquiryButton from "@/components/InquiryButton";
import { ABOUT_US_PAGES, CERTIFICATIONS, SUBHEADER_BG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Certifications | 하캄바이오",
};

function hasImage(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

/**
 * 원본 /sub/sub14.php
 *
 *   .sub14.pt250.pb300               250/300px → 1080↓ 150/200px
 *     .wrap_in2 { display:flex; flex-wrap:wrap;
 *                 justify-content:space-between; align-items:center; gap:15px }
 *                 860↓ justify-content:center
 *       ul   { width:400px; margin-bottom:60px; position:relative; cursor:pointer }
 *       img  { width:100% }                       원본 이미지 406×550
 *       li   { position:absolute; top:0; left:0; width:100%; height:100%;
 *              background:rgba(0,0,0,.8); padding:30px; display:none }
 *       li div { width:100%; height:100%; color:#fff; font-size:22px;
 *                text-align:center; GmarketSans; display:flex; 가운데 정렬 }
 *       ul:hover li { display:block }             ← 순수 CSS, JS 불필요
 *
 * 이 페이지에는 data-aos 속성이 없습니다 (AOS.init() 은 호출하지만 대상이 없음).
 * 그래서 스크롤 등장 효과를 넣지 않았습니다.
 *
 * hover 만 쓰므로 서버 컴포넌트입니다.
 */
export default function CertificationsPage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />

      <SubHeader
        eyebrow={CERTIFICATIONS.eyebrow}
        title={CERTIFICATIONS.title}
        pager={ABOUT_US_PAGES}
        current={CERTIFICATIONS.title}
        breadcrumb={[CERTIFICATIONS.eyebrow, CERTIFICATIONS.title]}
        bg={SUBHEADER_BG.sub01}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        <div
          className="wrap-in2 flex flex-wrap items-center justify-between gap-[15px]
                     max-b860:justify-center"
        >
          {CERTIFICATIONS.items.map((cert) => (
            <div
              key={cert.image}
              className="group relative mb-[60px] w-[400px] max-w-full cursor-pointer"
            >
              {hasImage(cert.image) ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={cert.image} alt={cert.label} className="w-full" />
              ) : (
                /* 원본 인증서 이미지는 406×550 (세로형) */
                <div
                  className="flex aspect-[406/550] w-full items-center justify-center
                             border border-line bg-[linear-gradient(160deg,#f7f8f6_0%,#e8ece6_100%)]
                             p-6 text-center text-[13px] text-ink-500"
                >
                  public{cert.image}
                </div>
              )}

              {/* 원본 li — hover 시에만 나타나는 검은 오버레이 */}
              <div className="absolute inset-0 hidden bg-black/80 p-[30px] group-hover:block">
                <div className="gfont flex h-full w-full items-center justify-center text-center text-[22px] text-white">
                  {cert.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer bordered />
    </>
  );
}
