import { redirect } from "next/navigation";

import { setupAdminAction } from "@/app/admin/actions";
import AdminAuthForm from "@/components/admin/AdminAuthForm";
import { getAdminSession, hasAdminAccount } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminSetupPage() {
  if (await getAdminSession()) redirect("/admin/activities");
  if (await hasAdminAccount()) redirect("/admin/login");

  const configured = Boolean(process.env.ADMIN_SETUP_TOKEN);

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_10%,#154e91_0%,#071d43_42%,#04112b_100%)] px-5 py-12">
      <section className="w-full max-w-[460px] rounded-[26px] bg-white p-8 shadow-2xl max-b580:p-6">
        <p className="mb-3 text-[12px] font-extrabold tracking-[0.22em] text-[#1677c8]">ONE-TIME SETUP</p>
        <h1 className="mb-2 text-[30px] font-extrabold text-[#102a52]">최초 관리자 설정</h1>
        <p className="mb-7 text-[14px] leading-relaxed text-slate-500">이 화면은 관리자 계정이 없을 때만 열립니다. 계정 생성 후에는 자동으로 닫힙니다.</p>
        {configured ? (
          <AdminAuthForm mode="setup" action={setupAdminAction} />
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-4 text-[14px] leading-relaxed text-amber-800">
            Vercel 프로젝트 환경변수에 <code className="font-bold">ADMIN_SETUP_TOKEN</code>을 긴 임의 문자열로 추가한 뒤 다시 배포해 주세요.
          </div>
        )}
      </section>
    </main>
  );
}
