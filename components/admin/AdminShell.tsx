import Link from "next/link";
import type { ReactNode } from "react";

import { logoutAdminAction } from "@/app/admin/actions";

export default function AdminShell({ children, username }: { children: ReactNode; username: string }) {
  return (
    <div className="min-h-screen bg-[#eef3f8] text-slate-900">
      <header className="border-b border-white/10 bg-[#071d43] text-white">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-6 py-4 max-b580:px-4">
          <div className="min-w-0">
            <Link href="/admin/activities" className="text-[18px] font-extrabold tracking-tight">Nolan Ball Korea 관리자</Link>
            <p className="mt-0.5 truncate text-[12px] text-sky-200">로그인: {username}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link href="/about/activities" target="_blank" className="rounded-lg border border-white/30 px-3 py-2 text-[13px] font-bold hover:bg-white/10">사이트 보기</Link>
            <form action={logoutAdminAction}>
              <button className="rounded-lg bg-white px-3 py-2 text-[13px] font-bold text-[#071d43]">로그아웃</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1480px] px-6 py-10 max-b580:px-4 max-b580:py-7">{children}</main>
    </div>
  );
}
