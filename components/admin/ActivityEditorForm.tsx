"use client";

import { useActionState } from "react";

import type { AdminActionState } from "@/app/admin/actions";
import type { ActivityAdminRecord } from "@/lib/activities";

import ActivityMediaManager from "./ActivityMediaManager";

const initialState: AdminActionState = { ok: false, message: "" };

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1677c8] focus:ring-2 focus:ring-[#1677c8]/15";
const labelClass = "mb-2 block text-[13px] font-extrabold text-slate-700";

function TextField({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: "text" | "date";
  placeholder?: string;
}) {
  return (
    <label className="block min-w-0">
      <span className={labelClass}>{label}{required ? " *" : ""}</span>
      <input
        className={inputClass}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
      />
    </label>
  );
}

function ContentFields({
  activity,
}: {
  activity?: ActivityAdminRecord | null;
}) {
  return (
    <section className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm max-b580:p-5">
      <div className="space-y-5">
        <label className="block">
          <span className={labelClass}>제목 *</span>
          <input className={inputClass} name="titleKo" required maxLength={200} defaultValue={activity?.titleKo ?? ""} />
        </label>
        <label className="block">
          <span className={labelClass}>목록 요약</span>
          <textarea className={`${inputClass} min-h-24 resize-y leading-relaxed`} name="excerptKo" maxLength={600} defaultValue={activity?.excerptKo ?? ""} />
        </label>
        <label className="block">
          <span className={labelClass}>본문 *</span>
          <textarea
            className={`${inputClass} min-h-[300px] resize-y leading-[1.8] max-b580:min-h-[240px]`}
            name="contentKo"
            required
            defaultValue={activity?.contentKo ?? ""}
            placeholder="문단 사이를 한 줄 비우면 공개 페이지에서도 문단으로 구분됩니다."
          />
        </label>
      </div>
    </section>
  );
}

export default function ActivityEditorForm({
  activity,
  action,
}: {
  activity?: ActivityAdminRecord | null;
  action: (state: AdminActionState, formData: FormData) => Promise<AdminActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-7">
      <section className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm max-b580:p-5">
        <div className="mb-6 border-b border-slate-200 pb-4">
          <h2 className="text-[20px] font-extrabold text-[#102a52]">게시 설정</h2>
          <p className="mt-1 text-[12px] text-slate-500">공개 상태, 분류, 행사 일자와 주소를 설정합니다.</p>
        </div>

        <div className="grid grid-cols-3 gap-5 max-b1080:grid-cols-2 max-b580:grid-cols-1">
          <label className="block">
            <span className={labelClass}>게시 상태 *</span>
            <select className={inputClass} name="status" required defaultValue={activity?.status ?? "draft"}>
              <option value="draft">임시 저장</option>
              <option value="published">공개 게시</option>
            </select>
          </label>
          <label className="block">
            <span className={labelClass}>활동 분류 *</span>
            <select className={inputClass} name="category" required defaultValue={activity?.category ?? "exhibition"}>
              <option value="exhibition">전시회</option>
              <option value="seminar">학회·세미나</option>
              <option value="demonstration">제품 시연</option>
              <option value="overseas">해외 활동</option>
              <option value="other">기타</option>
            </select>
          </label>
          <TextField label="게시물 주소" name="slug" defaultValue={activity?.slug} placeholder="비워 두면 한국어 제목으로 자동 생성" />
          <TextField label="행사 시작일" name="eventStartDate" type="date" defaultValue={activity?.eventStartDate} />
          <TextField label="행사 종료일" name="eventEndDate" type="date" defaultValue={activity?.eventEndDate} />
          <TextField label="장소" name="location" defaultValue={activity?.location} placeholder="예: 서울 COEX" />
        </div>
      </section>

      <ContentFields activity={activity} />

      {/* 기존 번역이 있는 게시물을 수정할 때 보이지 않는 번역값이 사라지지 않게 보존합니다. */}
      <input type="hidden" name="titleEn" value={activity?.titleEn ?? ""} />
      <input type="hidden" name="excerptEn" value={activity?.excerptEn ?? ""} />
      <input type="hidden" name="contentEn" value={activity?.contentEn ?? ""} />
      <input type="hidden" name="titleCn" value={activity?.titleCn ?? ""} />
      <input type="hidden" name="excerptCn" value={activity?.excerptCn ?? ""} />
      <input type="hidden" name="contentCn" value={activity?.contentCn ?? ""} />

      <ActivityMediaManager
        initialCoverUrl={activity?.coverImageUrl ?? ""}
        initialCoverPathname={activity?.coverImagePathname ?? ""}
        initialGallery={activity?.gallery ?? []}
        initialVideoUrl={activity?.videoUrl ?? ""}
      />

      {state.message && (
        <p role="alert" className={`rounded-xl px-5 py-4 text-[14px] font-medium ${state.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
          {state.message}
        </p>
      )}

      <div className="sticky bottom-4 z-20 flex justify-end rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-xl backdrop-blur max-b580:bottom-2">
        <button
          type="submit"
          disabled={pending}
          className="min-w-40 rounded-xl bg-[#0755a4] px-6 py-3.5 text-[15px] font-extrabold text-white transition hover:bg-[#064681] disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "저장 중…" : activity ? "수정 내용 저장" : "주요활동 저장"}
        </button>
      </div>
    </form>
  );
}
