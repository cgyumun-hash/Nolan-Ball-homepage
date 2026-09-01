import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "관리자 | Nolan Ball Korea",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
