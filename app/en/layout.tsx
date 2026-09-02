import type { Metadata } from "next";

import DocumentLanguage from "@/components/DocumentLanguage";

export const metadata: Metadata = {
  title: {
    default: "Nolan Ball Korea | A New Standard in Endoscope Cleaning",
    template: "%s | Nolan Ball Korea",
  },
  description:
    "Nolan Ball Korea develops single-use endoscope channel-cleaning products designed to support 360° channel-wall contact and a consistent manual cleaning process.",
  keywords: [
    "Nolan Ball Korea",
    "Nolan Ball",
    "endoscope cleaning",
    "endoscope channel cleaning",
    "single-use cleaning ball",
    "endoscope reprocessing",
    "infection control",
  ],
  openGraph: {
    type: "website",
    siteName: "Nolan Ball Korea",
    title: "A New Standard in Endoscope Cleaning | Nolan Ball",
    description:
      "A single-use endoscope channel-cleaning solution designed for 360° contact with the channel wall.",
    locale: "en_US",
    images: [
      {
        url: "/images/revision/main/hero-1-desktop.webp",
        width: 1200,
        height: 630,
        alt: "Nolan Ball product structure",
      },
    ],
  },
};

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="en" className="locale-root w-full min-w-0">
      <DocumentLanguage locale="en" />
      {children}
    </div>
  );
}
