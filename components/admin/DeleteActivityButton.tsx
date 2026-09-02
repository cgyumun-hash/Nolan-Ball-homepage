"use client";

import { useActionState, useEffect } from "react";

type DeleteActivityButtonVariant = "admin" | "card";
type DeleteActivityActionState = { ok: boolean; message: string };

export type DeleteActivityFormAction = (
  state: DeleteActivityActionState,
  formData: FormData,
) => Promise<DeleteActivityActionState>;

const initialState: DeleteActivityActionState = { ok: false, message: "" };

const buttonClasses: Record<DeleteActivityButtonVariant, string> = {
  admin: "rounded-lg border border-red-200 px-3 py-2 text-[12px] font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-wait disabled:opacity-60",
  card: "rounded-full bg-white/95 px-4 py-2 text-[12px] font-extrabold text-red-600 shadow-md backdrop-blur-sm transition hover:bg-red-600 hover:text-white disabled:cursor-wait disabled:opacity-70",
};

function SubmitButton({
  variant,
  pending,
}: {
  variant: DeleteActivityButtonVariant;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={buttonClasses[variant]}
    >
      {pending ? "삭제 중…" : "삭제"}
    </button>
  );
}

export default function DeleteActivityButton({
  action,
  title,
  variant = "admin",
}: {
  action: DeleteActivityFormAction;
  title: string;
  variant?: DeleteActivityButtonVariant;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message && !state.ok) window.alert(state.message);
  }, [state]);

  return (
    <form
      action={formAction}
      className="inline-flex"
      onSubmit={(event) => {
        if (!window.confirm(`“${title}” 게시물을 삭제할까요? 삭제한 게시물은 복구할 수 없습니다.`)) {
          event.preventDefault();
        }
      }}
    >
      <SubmitButton variant={variant} pending={pending} />
    </form>
  );
}
