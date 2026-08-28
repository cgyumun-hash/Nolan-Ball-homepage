import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import OnlineInquiryForm from "@/components/OnlineInquiryForm";
import SubHeader from "@/components/SubHeader";
import type { SiteLocale } from "@/lib/locale";
import { getLanguageAlternates } from "@/lib/seo";
import { COMPANY_PAGES, SUBHEADER_BG } from "@/lib/site";
import { EN_COMPANY_PAGES } from "@/lib/site.en";
import { CN_COMPANY_PAGES } from "@/lib/site.cn";
import { selectLocale } from "@/lib/locale";

const title = "온라인 문의";

export const metadata: Metadata = {
  title: `${title}`,
  alternates: getLanguageAlternates("/customer-support/online-inquiry"),
};

export function OnlineInquiryPageContent({ locale = "ko" }: { locale?: SiteLocale }) {
  const pageTitle = locale === "en" ? "Contact Us" : locale === "cn" ? "在线咨询" : title;
  const pages = selectLocale(locale, COMPANY_PAGES, EN_COMPANY_PAGES, CN_COMPANY_PAGES);

  return (
    <>
      <InquiryButton locale={locale} />
      <Header forceSolid locale={locale} />
      <SubHeader
        eyebrow="COMPANY"
        title={pageTitle}
        pager={pages}
        current={pageTitle}
        breadcrumb={["COMPANY", pageTitle]}
        bg={SUBHEADER_BG.company}
        locale={locale}
      />
      <main>
        <OnlineInquiryForm locale={locale} />
      </main>
      <Footer bordered locale={locale} />
    </>
  );
}

export default function OnlineInquiryPage() {
  return <OnlineInquiryPageContent />;
}
