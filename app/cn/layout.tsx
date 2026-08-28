import type { Metadata } from "next";

import DocumentLanguage from "@/components/DocumentLanguage";

export const metadata: Metadata = {
  title: {
    default: "Nolan Ball Korea | 内镜清洗新标准",
    template: "%s | Nolan Ball Korea",
  },
  description: "Nolan Ball Korea开发用于支持360°管腔内壁接触和一致手工清洗流程的一次性内镜管腔清洗产品。",
  openGraph: {
    type: "website",
    siteName: "Nolan Ball Korea",
    title: "内镜清洗新标准 | Nolan Ball",
    description: "支持与管腔内壁形成360°接触的一次性内镜管腔清洗解决方案。",
    locale: "zh_CN",
    images: ["/images/og.webp"],
  },
};

export default function ChineseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="zh-CN">
      <DocumentLanguage locale="cn" />
      {children}
    </div>
  );
}
