"use client";

import { useActionState } from "react";

import type { AdminActionState } from "@/app/admin/actions";

const initialState: AdminActionState = { ok: false, message: "" };

export default function AdminAuthForm({
  mode,
  action,
}: {
  mode: "setup" | "login";
  action: (state: AdminActionState, formData: FormData) => Promise<AdminActionState>;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const setup = mode === "setup";

  return (
    <form action={formAction} className="space-y-5">
      {setup && (
        <label className="block">
          <span className="mb-2 block text-[13px] font-bold text-slate-700">최초 설정 토큰</span>
          <input name="setupToken" type="password" required autoComplete="off" className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#1677c8]" />
        </label>
      )}
      <label className="block">
        <span className="mb-2 block text-[13px] font-bold text-slate-700">관리자 아이디</span>
        <input name="username" required minLength={4} maxLength={50} autoComplete="username" className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#1677c8]" />
      </label>
      <label className="block">
        <span className="mb-2 block text-[13px] font-bold text-slate-700">비밀번호</span>
        <input name="password" type="password" required minLength={setup ? 12 : 4} autoComplete={setup ? "new-password" : "current-password"} className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#1677c8]" />
      </label>
      {setup && (
        <label className="block">
          <span className="mb-2 block text-[13px] font-bold text-slate-700">비밀번호 확인</span>
          <input name="passwordConfirm" type="password" required minLength={12} autoComplete="new-password" className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none focus:border-[#1677c8]" />
        </label>
      )}
      {state.message && (
        <p role="alert" className={`rounded-xl px-4 py-3 text-[13px] ${state.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{state.message}</p>
      )}
      <button disabled={pending} className="w-full rounded-xl bg-[#0755a4] px-5 py-3.5 font-extrabold text-white disabled:cursor-wait disabled:opacity-60">
        {pending ? "처리 중…" : setup ? "최초 관리자 만들기" : "로그인"}
      </button>
    </form>
  );
}
