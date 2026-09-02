import type { Metadata } from "next";

import { saveHowToUseGuideVideoAction } from "@/app/admin/content-actions";
import HowToUseVideoManager from "@/components/admin/HowToUseVideoManager";
import InlineAdminToolbar from "@/components/admin/InlineAdminToolbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import SubHeader from "@/components/SubHeader";
import VideoPlayer from "@/components/media/VideoPlayer";
import type { SiteLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import { HOW_TO_USE, PRODUCTS_PAGES, SUBHEADER_BG } from "@/lib/site";
import { EN_HOW_TO_USE, EN_PRODUCTS_PAGES } from "@/lib/site.en";
import { CN_HOW_TO_USE, CN_PRODUCTS_PAGES } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";
import { isDatabaseConfigured } from "@/lib/server/db";
import { getOptionalAdminSession } from "@/lib/server/optional-admin-session";
import { getHowToUseGuideVideo } from "@/lib/server/site-media";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "사용 방법",
  alternates: getLanguageAlternates("/how-to-use"),
};

/**
 * PRODUCT 하위의 HOW TO USE 페이지입니다.
 * 레이아웃은 기존 서브페이지(sub21 계열)와 같은 뼈대를 씁니다.
 *   .subheader_outer → SubHeader
 *   main.pt250.pb300 → 1080px 이하 150/200
 *   .wrap_in2        → 본문 폭 1400px
 */
export async function HowToUsePageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const content = selectLocale(locale, HOW_TO_USE, EN_HOW_TO_USE, CN_HOW_TO_USE);
  const pages = selectLocale(locale, PRODUCTS_PAGES, EN_PRODUCTS_PAGES, CN_PRODUCTS_PAGES);
  const guideVideoPromise: Promise<Awaited<ReturnType<typeof getHowToUseGuideVideo>>> =
    isDatabaseConfigured()
      ? getHowToUseGuideVideo().catch((error) => {
          console.error("Could not load the how-to-use guide video", {
            name: error instanceof Error ? error.name : "UnknownError",
          });
          return null;
        })
      : Promise.resolve(null);
  const [adminSession, guideVideo] = await Promise.all([
    getOptionalAdminSession(),
    guideVideoPromise,
  ]);

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />

      <SubHeader
        eyebrow={content.eyebrow}
        title={content.title}
        pager={pages}
        current="HOW TO USE"
        breadcrumb={[content.eyebrow]}
        bg={SUBHEADER_BG.product}
        locale={locale}
      />

      <main className="pt-[250px] pb-[300px] max-b1080:pt-[150px] max-b1080:pb-[200px]">
        <div className="wrap-in2">
          {adminSession && (
            <InlineAdminToolbar username={adminSession.username} locale={locale} />
          )}
          <p
            className="mb-[40px] text-[24px] leading-[1.7] text-ink-900
                       max-b1080:text-[19px] max-b520:text-[17px]"
          >
            {content.lead}
          </p>

          {/* 최종 IFU 확정 전까지 노출하는 안내 — 확정되면 이 블록을 지웁니다 */}
          <p
            className="mb-[120px] border-l-[3px] border-brand-500 bg-[#fafafa] py-5 pl-6
                       text-[16px] leading-[1.7] text-ink-500
                       max-b1080:mb-[70px] max-b520:text-[14px]"
          >
            {content.notice}
          </p>

          {/* 단계 목록 */}
          <ol className="mb-[160px] max-b1080:mb-[90px]">
            {content.steps.map((step) => (
              <li
                key={step.no}
                className="flex gap-[50px] border-t border-line py-[45px] last:border-b
                           max-b980:flex-col max-b980:gap-4 max-b980:py-[30px]"
              >
                <span
                  className="gfont w-[120px] shrink-0 text-[46px] font-bold leading-none text-ink-900
                             max-b1080:text-[36px] max-b980:w-auto"
                >
                  {step.no}
                </span>
                <div>
                  <h3 className="mb-3 text-[25px] font-bold text-ink-900 max-b520:text-[20px]">
                    {step.title}
                  </h3>
                  <p className="text-[16px] leading-[1.8] text-ink-500 max-b520:text-[14px]">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* 주의사항 */}
          <h3
            className="gfont mb-[40px] text-[40px] font-bold text-ink-900
                       max-b1080:mb-[30px]
                       max-b1080:text-[30px] max-b520:text-[24px]"
          >
            {content.cautionTitle}
          </h3>

          <ul className="mb-[160px] border-y border-line px-7 py-7 max-b1080:mb-[90px] max-b520:px-5">
            {content.cautions.map((caution) => (
              <li key={caution} className="relative py-2 pl-5 text-[16px] leading-[1.7] text-ink-500 before:absolute before:left-0 before:top-[1em] before:h-1 before:w-1 before:rounded-full before:bg-ink-900 max-b520:text-[14px]">
                {caution}
              </li>
            ))}
          </ul>

          {/* 제품 가이드 영상 — 파일·링크가 없어 자리만 잡아 둡니다 */}
          <h3
            className="gfont mb-[40px] text-[40px] font-bold text-ink-900
                       max-b1080:text-[30px] max-b520:text-[24px]"
          >
            {content.videoTitle}
          </h3>
          {guideVideo ? (
            <VideoPlayer
              src={guideVideo.mediaUrl}
              title={content.videoTitle}
              mimeType={guideVideo.mimeType}
            />
          ) : (
            <div
              className="flex aspect-video w-full items-center justify-center border border-line
                         bg-[linear-gradient(160deg,#f7f9fc_0%,#e8f0f7_100%)] p-8 text-center
                         text-[15px] leading-[1.8] text-ink-500 max-b520:text-[13px]"
            >
              {content.videoNote}
            </div>
          )}

          {adminSession && (
            <details className="mt-8 rounded-2xl border border-sky-200 bg-white p-5 shadow-sm open:pb-6">
              <summary className="cursor-pointer text-[15px] font-extrabold text-[#0755a4]">
                제품 가이드 영상 관리
              </summary>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <HowToUseVideoManager
                  action={saveHowToUseGuideVideoAction}
                  initialMediaUrl={guideVideo?.mediaUrl}
                  initialBlobPathname={guideVideo?.blobPathname}
                  initialOriginalName={guideVideo?.originalName}
                  initialMimeType={guideVideo?.mimeType}
                />
              </div>
            </details>
          )}
        </div>
      </main>

      <Footer bordered locale={locale} />
    </>
  );
}

export default async function HowToUsePage() {
  return <HowToUsePageContent />;
}
