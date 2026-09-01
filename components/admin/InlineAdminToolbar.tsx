import Link from "next/link";

import { logoutAdminAction } from "@/app/admin/actions";
import type { SiteLocale } from "@/lib/locale";

export default function InlineAdminToolbar({
  username,
  primaryHref,
  primaryLabel,
  locale = "ko",
}: {
  username: string;
  primaryHref?: string;
  primaryLabel?: string;
  locale?: SiteLocale;
}) {
  const prefix = locale === "ko" ? "" : `/${locale}`;

  return (
    <aside
      aria-label="관리자 도구"
      className="fixed bottom-[30px] left-1/2 z-[998] flex w-[min(1180px,calc(100vw-340px))] -translate-x-1/2 flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-200 bg-sky-50/95 px-5 py-4 shadow-[0_10px_32px_rgba(15,78,132,0.18)] backdrop-blur-md max-b1080:bottom-[76px] max-b1080:left-4 max-b1080:right-4 max-b1080:w-auto max-b1080:translate-x-0 max-b580:bottom-[68px] max-b580:left-3 max-b580:right-3 max-b580:items-stretch max-b580:gap-2 max-b580:rounded-xl max-b580:px-3 max-b580:py-2.5"
    >
      <div className="min-w-0 max-b580:w-full">
        <p className="text-[13px] font-extrabold tracking-[0.16em] text-sky-700">관리 모드</p>
        <p className="mt-1 truncate text-[13px] text-slate-500">{username} 계정으로 로그인됨</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 max-b580:w-full max-b580:flex-nowrap max-b580:overflow-x-auto max-b580:pb-0.5">
        <Link
          href={`${prefix}/about/activities`}
          className="shrink-0 whitespace-nowrap rounded-lg border border-sky-300 bg-white px-4 py-2.5 text-[13px] font-bold text-sky-800 transition hover:border-sky-600 max-b580:px-3 max-b580:py-2"
        >
          주요활동 관리
        </Link>
        <Link
          href={`${prefix}/customer-support/resources-downloads`}
          className="shrink-0 whitespace-nowrap rounded-lg border border-sky-300 bg-white px-4 py-2.5 text-[13px] font-bold text-sky-800 transition hover:border-sky-600 max-b580:px-3 max-b580:py-2"
        >
          자료실 관리
        </Link>
        <Link
          href={`${prefix}/how-to-use`}
          className="shrink-0 whitespace-nowrap rounded-lg border border-sky-300 bg-white px-4 py-2.5 text-[13px] font-bold text-sky-800 transition hover:border-sky-600 max-b580:px-3 max-b580:py-2"
        >
          영상 관리
        </Link>
        {primaryHref && primaryLabel && (
          <Link
            href={primaryHref}
            className="shrink-0 whitespace-nowrap rounded-lg bg-[#0755a4] px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#064885] max-b580:px-3 max-b580:py-2"
          >
            {primaryLabel}
          </Link>
        )}
        <form action={logoutAdminAction}>
          <button
            type="submit"
            className="shrink-0 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 transition hover:border-slate-500 max-b580:px-3 max-b580:py-2"
          >
            로그아웃
          </button>
        </form>
      </div>
    </aside>
  );
}
