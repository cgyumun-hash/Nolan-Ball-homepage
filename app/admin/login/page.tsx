import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAdminAction } from "@/app/admin/actions";
import AdminAuthForm from "@/components/admin/AdminAuthForm";
import { getAdminSession, hasAdminAccount } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin/activities");
  if (!(await hasAdminAccount())) redirect("/admin/setup");

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_10%,#154e91_0%,#071d43_42%,#04112b_100%)] px-5 py-12">
      <section className="w-full max-w-[430px] rounded-[26px] bg-white p-8 shadow-2xl max-b580:p-6">
        <p className="mb-3 text-[12px] font-extrabold tracking-[0.22em] text-[#1677c8]">NOLAN BALL KOREA</p>
        <h1 className="mb-2 text-[30px] font-extrabold text-[#102a52]">관리자 로그인</h1>
        <p className="mb-8 text-[14px] leading-relaxed text-slate-500">주요활동 게시물을 작성하고 관리합니다.</p>
        <AdminAuthForm mode="login" action={loginAdminAction} />
        <Link href="/" className="mt-6 block text-center text-[13px] text-slate-500 hover:text-[#0755a4]">홈페이지로 돌아가기</Link>
      </section>
    </main>
  );
}
