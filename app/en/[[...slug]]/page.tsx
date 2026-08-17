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
import {
  EN_FILTER_BALL_BRONCHOSCOPES,
  EN_FILTER_BALL_COLONOSCOPES,
  EN_FILTER_BALL_GASTROSCOPES,
  EN_SUPPORTED_PATHS,
} from "@/lib/site.en";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Nolan Ball Korea | A New Standard in Endoscope Cleaning",
    description:
      "Explore Nolan Ball, a single-use endoscope channel-cleaning solution designed to support 360° channel-wall contact and consistent manual cleaning.",
  },
  "/products/filter-ball-for-gastroscopes": {
    title: "Nolan Ball for Gastroscopes · 2.8 mm",
    description:
      "A 2.8 mm single-use channel-cleaning ball designed for gastroscope channels.",
  },
  "/products/filter-ball-for-colonoscopes": {
    title: "Nolan Ball for Colonoscopes · 3.7 mm",
    description:
      "A 3.7 mm single-use channel-cleaning ball designed for colonoscope channels.",
  },
  "/products/filter-ball-for-bronchoscopes": {
    title: "Nolan Ball for Bronchoscopes · 2.8 mm",
    description:
      "A 2.8 mm single-use channel-cleaning ball designed for bronchoscope channels.",
  },
  "/about/technology-overview": {
    title: "Technology Overview",
    description:
      "Learn how Nolan Ball's 360° contact structure, continuous wiping action, and visual single-use indicator support endoscope channel cleaning.",
  },
  "/how-to-use": {
    title: "How to Use",
    description:
      "Review the provisional Nolan Ball use sequence and precautions pending publication of the final Instructions for Use.",
  },
  "/about/certifications": {
    title: "Test Results & Reports",
    description:
      "Review the general bacterial culture results and interpretation presented for Nolan Ball-related specimens.",
  },
  "/customer-support/resources-downloads": {
    title: "Downloads",
    description: "Download the Nolan Ball catalog, product guide, and microbiology test reports.",
  },
  "/about/overview": {
    title: "Company Overview",
    description:
      "Learn about Nolan Ball Korea's vision, mission, values, and approach to endoscope reprocessing solutions.",
  },
  "/about/location": {
    title: "Location",
    description: "Find the Nolan Ball Korea head office and public transportation information.",
  },
  "/customer-support/online-inquiry": {
    title: "Contact Us",
    description: "Contact Nolan Ball Korea for product information, samples, quotations, and partnerships.",
  },
};

function getPath(slug?: string[]) {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

export function generateStaticParams() {
  return EN_SUPPORTED_PATHS.map((pathname) => ({
    slug: pathname === "/" ? [] : pathname.slice(1).split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pathname = getPath(slug);
  const page = PAGE_METADATA[pathname];

  if (!page) return {};

  const englishUrl = pathname === "/" ? "/en" : `/en${pathname}`;

  return {
    title: pathname === "/" ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: {
      canonical: englishUrl,
      languages: {
        ko: pathname,
        en: englishUrl,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: englishUrl,
      locale: "en_US",
    },
  };
}

export default async function EnglishPage({ params }: PageProps) {
  const { slug } = await params;
  const pathname = getPath(slug);

  switch (pathname) {
    case "/":
      return <HomeContent locale="en" />;
    case "/products/filter-ball-for-gastroscopes":
      return <FilterBallPage data={EN_FILTER_BALL_GASTROSCOPES} locale="en" />;
    case "/products/filter-ball-for-colonoscopes":
      return <FilterBallPage data={EN_FILTER_BALL_COLONOSCOPES} locale="en" />;
    case "/products/filter-ball-for-bronchoscopes":
      return <FilterBallPage data={EN_FILTER_BALL_BRONCHOSCOPES} locale="en" />;
    case "/about/technology-overview":
      return <TechnologyPageContent locale="en" />;
    case "/how-to-use":
      return <HowToUsePageContent locale="en" />;
    case "/about/certifications":
      return <CertificationsPageContent locale="en" />;
    case "/customer-support/resources-downloads":
      return <ResourcesDownloadsPageContent locale="en" />;
    case "/about/overview":
      return <OverviewPageContent locale="en" />;
    case "/about/location":
      return <LocationPageContent locale="en" />;
    case "/customer-support/online-inquiry":
      return <OnlineInquiryPageContent locale="en" />;
    default:
      notFound();
  }
}
