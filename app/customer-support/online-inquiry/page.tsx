import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import OnlineInquiryForm from "@/components/OnlineInquiryForm";
import SubHeader from "@/components/SubHeader";
import { CUSTOMER_SUPPORT_PAGES, SUBHEADER_BG } from "@/lib/site";

const title = "Online Inquiry";

export const metadata: Metadata = {
  title: `${title} | Ha Kam BIO`,
};

export default function OnlineInquiryPage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />
      <SubHeader
        eyebrow="Customer Support"
        title={title}
        pager={CUSTOMER_SUPPORT_PAGES}
        current={title}
        breadcrumb={["Customer Support", title]}
        bg={SUBHEADER_BG.sub04}
      />
      <main>
        <OnlineInquiryForm />
      </main>
      <Footer bordered />
    </>
  );
}
