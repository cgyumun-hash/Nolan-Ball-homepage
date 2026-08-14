import type { Metadata } from "next";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InquiryButton from "@/components/InquiryButton";
import NoticeBoard from "@/components/NoticeBoard";
import SubHeader from "@/components/SubHeader";
import { ABOUT_CONTACT_PAGES, SUBHEADER_BG } from "@/lib/site";

export const metadata: Metadata = {
  title: "공지사항",
};

export default function NoticesPage() {
  return (
    <>
      <InquiryButton />
      <Header forceSolid />
      <SubHeader
        eyebrow="Customer Support"
        title="Notices"
        pager={ABOUT_CONTACT_PAGES}
        current="Notices"
        breadcrumb={["Customer Support", "Notices"]}
        bg={SUBHEADER_BG.sub04}
      />
      <main>
        <NoticeBoard />
      </main>
      <Footer bordered />
    </>
  );
}
