import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { updateActivityAction } from "@/app/admin/actions";
import ActivityEditorForm from "@/components/admin/ActivityEditorForm";
import AdminShell from "@/components/admin/AdminShell";
import { getAdminSession } from "@/lib/server/admin-auth";
import { getAdminActivity } from "@/lib/server/activities";

export const dynamic = "force-dynamic";

export default async function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const { id } = await params;
  const activity = await getAdminActivity(id);
  if (!activity) notFound();

  return (
    <AdminShell username={session.username}>
      <div className="mb-8">
        <Link href="/admin/activities" className="mb-4 inline-flex text-[13px] font-bold text-[#0755a4]">← 목록으로</Link>
        <h1 className="break-words text-[34px] font-extrabold tracking-tight text-[#102a52] max-b580:text-[28px]">{activity.titleKo}</h1>
        <p className="mt-2 text-[14px] text-slate-500">게시물 내용과 이미지, 공개 상태를 수정합니다.</p>
      </div>
      <ActivityEditorForm activity={activity} action={updateActivityAction.bind(null, activity.id)} />
    </AdminShell>
  );
}
