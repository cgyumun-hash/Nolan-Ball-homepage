import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import NoticeBoard from "@/components/NoticeBoard";
import SubHeader from "@/components/SubHeader";
import { CUSTOMER_SUPPORT_PAGES, SUBHEADER_BG } from "@/lib/site";

const title = "Resources & Downloads";

export const metadata: Metadata = {
  title: `${title} | Ha Kam BIO`,
};

export default function ResourcesDownloadsPage() {
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
        <NoticeBoard total={0} empty boardName="resources and downloads" />
      </main>
      <Footer bordered />
    </>
  );
}
