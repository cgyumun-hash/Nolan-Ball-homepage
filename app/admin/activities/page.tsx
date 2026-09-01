import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { deleteActivityAction } from "@/app/admin/actions";
import AdminShell from "@/components/admin/AdminShell";
import DeleteActivityButton from "@/components/admin/DeleteActivityButton";
import type { ActivityCategory } from "@/lib/activities";
import { getAdminSession } from "@/lib/server/admin-auth";
import { listAdminActivities } from "@/lib/server/activities";

export const dynamic = "force-dynamic";

const categoryLabels: Record<ActivityCategory, string> = {
  exhibition: "전시회",
  seminar: "학회·세미나",
  demonstration: "제품 시연",
  overseas: "해외 활동",
  other: "기타",
};

function formatDate(value: string | null) {
  if (!value) return "일자 미정";
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(`${value}T00:00:00`));
}

export default async function AdminActivitiesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const activities = await listAdminActivities();

  return (
    <AdminShell username={session.username}>
      <div className="mb-8 flex items-end justify-between gap-5 max-b580:items-start">
        <div>
          <p className="mb-2 text-[12px] font-extrabold tracking-[0.2em] text-[#1677c8]">ACTIVITIES CMS</p>
          <h1 className="text-[34px] font-extrabold tracking-tight text-[#102a52] max-b580:text-[28px]">주요활동 관리</h1>
          <p className="mt-2 text-[14px] text-slate-500">전시회, 학회, 제품 시연과 국내외 활동을 작성하고 게시합니다.</p>
        </div>
        <Link href="/admin/activities/new" className="shrink-0 rounded-xl bg-[#0755a4] px-5 py-3 text-[14px] font-extrabold text-white shadow-lg shadow-blue-900/10 hover:bg-[#064681]">
          + 새 글 작성
        </Link>
      </div>

      {activities.length === 0 ? (
        <section className="rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-24 text-center shadow-sm">
          <h2 className="text-[22px] font-extrabold text-[#102a52]">등록된 주요활동이 없습니다.</h2>
          <p className="mt-3 text-[14px] text-slate-500">첫 번째 회사 활동을 작성해 보세요.</p>
          <Link href="/admin/activities/new" className="mt-7 inline-flex rounded-xl bg-[#0755a4] px-5 py-3 text-[14px] font-extrabold text-white">새 글 작성</Link>
        </section>
      ) : (
        <section className="overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-[96px_minmax(260px,1fr)_150px_130px_190px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[12px] font-extrabold text-slate-500 b860:grid">
            <span>이미지</span><span>게시물</span><span>분류</span><span>상태</span><span className="text-right">관리</span>
          </div>
          <div className="divide-y divide-slate-200">
            {activities.map((activity) => {
              const publicHref = `/about/activities/${activity.slug}`;
              return (
                <article key={activity.id} className="grid min-w-0 grid-cols-[96px_minmax(0,1fr)_150px_130px_190px] items-center gap-4 px-5 py-4 max-b860:grid-cols-[84px_minmax(0,1fr)] max-b580:grid-cols-[72px_minmax(0,1fr)] max-b580:px-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#0a397e,#1677c8)]">
                    {activity.coverImageUrl && (
                      <Image src={activity.coverImageUrl} alt="" fill sizes="96px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2 text-[12px] text-slate-500">
                      <span>{formatDate(activity.eventStartDate)}</span>
                      {activity.location && <span className="truncate">· {activity.location}</span>}
                    </div>
                    <h2 className="truncate text-[16px] font-extrabold text-[#102a52]">{activity.titleKo}</h2>
                    <p className="mt-1 truncate text-[12px] text-slate-400">/{activity.slug}</p>
                  </div>
                  <span className="text-[13px] font-bold text-slate-600 max-b860:col-start-2">{categoryLabels[activity.category]}</span>
                  <span className={`w-fit rounded-full px-3 py-1.5 text-[12px] font-extrabold max-b860:col-start-2 ${activity.status === "published" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {activity.status === "published" ? "공개" : "임시 저장"}
                  </span>
                  <div className="flex items-center justify-end gap-2 max-b860:col-span-2 max-b860:justify-start max-b860:border-t max-b860:border-slate-100 max-b860:pt-3">
                    {activity.status === "published" && (
                      <Link href={publicHref} target="_blank" className="rounded-lg border border-slate-300 px-3 py-2 text-[12px] font-bold text-slate-600 hover:bg-slate-50">보기</Link>
                    )}
                    <Link href={`/admin/activities/${activity.id}/edit`} className="rounded-lg bg-[#e8f3ff] px-3 py-2 text-[12px] font-bold text-[#0755a4] hover:bg-[#d5eaff]">수정</Link>
                    <DeleteActivityButton action={deleteActivityAction.bind(null, activity.id)} title={activity.titleKo} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </AdminShell>
  );
}
