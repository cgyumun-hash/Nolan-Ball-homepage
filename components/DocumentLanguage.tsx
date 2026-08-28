"use client";

import { useEffect } from "react";

import type { SiteLocale } from "@/lib/locale";

export default function DocumentLanguage({ locale }: { locale: SiteLocale }) {
  useEffect(() => {
    document.documentElement.lang = locale === "cn" ? "zh-CN" : locale;

    return () => {
      document.documentElement.lang = "ko";
    };
  }, [locale]);

  return null;
}
