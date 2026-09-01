"use client";

export default function DeleteActivityButton({
  action,
  title,
}: {
  action: (formData: FormData) => void | Promise<void>;
  title: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`“${title}” 게시물을 삭제할까요? 삭제한 게시물은 복구할 수 없습니다.`)) {
          event.preventDefault();
        }
      }}
    >
      <button className="rounded-lg border border-red-200 px-3 py-2 text-[12px] font-bold text-red-600 transition hover:bg-red-50">
        삭제
      </button>
    </form>
  );
}
