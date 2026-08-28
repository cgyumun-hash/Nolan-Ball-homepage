import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeContent } from "@/app/(01-main)/page";
import { HowToUsePageContent } from "@/app/(02-product)/how-to-use/page";
import { TechnologyPageContent } from "@/app/(03-technology)/about/technology-overview/page";
import { CertificationsPageContent } from "@/app/(04-resources)/about/certifications/page";
import { ResourcesDownloadsPageContent } from "@/app/(04-resources)/customer-support/resources-downloads/page";
import { LocationPageContent } from "@/app/(05-company)/about/location/page";
import { OverviewPageContent } from "@/app/(05-company)/about/overview/page";
import { OnlineInquiryPageContent } from "@/app/(05-company)/customer-support/online-inquiry/page";
import FilterBallPage from "@/components/FilterBallPage";
import { getLanguageAlternates } from "@/lib/seo";
import {
  CN_FILTER_BALL_COLONOSCOPES,
  CN_FILTER_BALL_GASTRO_COLONOSCOPES,
  CN_FILTER_BALL_GASTROSCOPES,
  CN_SUPPORTED_PATHS,
  CN_VALVE_PORT_BRUSH,
} from "@/lib/site.cn";

type PageProps = { params: Promise<{ slug?: string[] }> };

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  "/": { title: "Nolan Ball Korea | 内镜清洗新标准", description: "了解Nolan Ball一次性内镜管腔清洗解决方案。" },
  "/products/filter-ball-for-gastroscopes": { title: "2.8 mm / 胃镜专用", description: "为胃镜管腔设计的2.8 mm一次性管腔清洗球。" },
  "/products/nolan-ball-3-2mm": { title: "3.2 mm / 胃镜·肠镜兼用", description: "为兼容胃镜和肠镜管腔设计的3.2 mm一次性管腔清洗球。" },
  "/products/filter-ball-for-colonoscopes": { title: "3.7 mm / 肠镜专用", description: "为肠镜管腔设计的3.7 mm一次性管腔清洗球。" },
  "/products/endoscopic-valve-port-brush": { title: "Valve Brush", description: "用于内镜阀门和端口清洗的一次性清洗刷。" },
  "/about/technology-overview": { title: "技术概览", description: "了解Nolan Ball的360°接触结构、连续擦拭及使用状态指示设计。" },
  "/how-to-use": { title: "使用方法", description: "查看Nolan Ball的使用步骤及注意事项。" },
  "/about/certifications": { title: "试验结果·报告", description: "查看Nolan Ball相关一般细菌培养试验结果及解读。" },
  "/customer-support/resources-downloads": { title: "资料下载", description: "下载Nolan Ball产品及试验资料。" },
  "/about/overview": { title: "公司简介", description: "了解Nolan Ball Korea的公司愿景与业务。" },
  "/about/location": { title: "来访路线", description: "查看Nolan Ball Korea总部地址与交通信息。" },
  "/customer-support/online-inquiry": { title: "在线咨询", description: "咨询产品、样品、报价及合作事宜。" },
};

function getPath(slug?: string[]) {
  return slug?.length ? "/" + slug.join("/") : "/";
}
export function generateStaticParams() {
  return CN_SUPPORTED_PATHS.map((pathname) => ({ slug: pathname === "/" ? [] : pathname.slice(1).split("/") }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pathname = getPath(slug);
  const page = PAGE_METADATA[pathname];
  if (!page) return {};
  const url = pathname === "/" ? "/cn" : "/cn" + pathname;

  return {
    title: pathname === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: getLanguageAlternates(pathname, "cn"),
    openGraph: { title: page.title, description: page.description, url, siteName: "Nolan Ball Korea", type: "website", locale: "zh_CN", images: ["/images/og.webp"] },
  };
}

export default async function ChinesePage({ params }: PageProps) {
  const { slug } = await params;
  const pathname = getPath(slug);

  switch (pathname) {
    case "/": return <HomeContent locale="cn" />;
    case "/products/filter-ball-for-gastroscopes": return <FilterBallPage data={CN_FILTER_BALL_GASTROSCOPES} locale="cn" />;
    case "/products/nolan-ball-3-2mm": return <FilterBallPage data={CN_FILTER_BALL_GASTRO_COLONOSCOPES} locale="cn" />;
    case "/products/filter-ball-for-colonoscopes": return <FilterBallPage data={CN_FILTER_BALL_COLONOSCOPES} locale="cn" />;
    case "/products/endoscopic-valve-port-brush": return <FilterBallPage data={CN_VALVE_PORT_BRUSH} locale="cn" />;
    case "/about/technology-overview": return <TechnologyPageContent locale="cn" />;
    case "/how-to-use": return <HowToUsePageContent locale="cn" />;
    case "/about/certifications": return <CertificationsPageContent locale="cn" />;
    case "/customer-support/resources-downloads": return <ResourcesDownloadsPageContent locale="cn" />;
    case "/about/overview": return <OverviewPageContent locale="cn" />;
    case "/about/location": return <LocationPageContent locale="cn" />;
    case "/customer-support/online-inquiry": return <OnlineInquiryPageContent locale="cn" />;
    default: notFound();
  }
}
