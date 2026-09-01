import Link from "next/link";
import { redirect } from "next/navigation";

import { createActivityAction } from "@/app/admin/actions";
import ActivityEditorForm from "@/components/admin/ActivityEditorForm";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";

export default async function NewActivityPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell username={session.username}>
      <div className="mb-8">
        <Link href="/admin/activities" className="mb-4 inline-flex text-[13px] font-bold text-[#0755a4]">← 목록으로</Link>
        <h1 className="text-[34px] font-extrabold tracking-tight text-[#102a52] max-b580:text-[28px]">새 주요활동 작성</h1>
        <p className="mt-2 text-[14px] text-slate-500">제목과 목록 요약, 본문을 작성하고 필요한 사진이나 영상을 함께 등록하세요.</p>
      </div>
      <ActivityEditorForm action={createActivityAction} />
    </AdminShell>
  );
}
