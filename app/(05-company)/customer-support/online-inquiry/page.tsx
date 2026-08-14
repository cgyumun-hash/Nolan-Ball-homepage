import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import OnlineInquiryForm from "@/components/OnlineInquiryForm";
import SubHeader from "@/components/SubHeader";
import { COMPANY_PAGES, SUBHEADER_BG } from "@/lib/site";

const title = "온라인 문의";

export const metadata: Metadata = {
  title: `${title}`,
};

export default function OnlineInquiryPage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />
      <SubHeader
        eyebrow="COMPANY"
        title={title}
        pager={COMPANY_PAGES}
        current={title}
        breadcrumb={["COMPANY", title]}
        bg={SUBHEADER_BG.company}
      />
      <main>
        <OnlineInquiryForm />
      </main>
      <Footer bordered />
    </>
  );
}
