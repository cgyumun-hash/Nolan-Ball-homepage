"use client";

import { upload } from "@vercel/blob/client";
import { useActionState, useId, useState } from "react";

import VideoPlayer from "@/components/media/VideoPlayer";

const MAX_VIDEO_SIZE = 250 * 1024 * 1024;

export type HowToUseVideoManagerState = {
  ok: boolean;
  message: string;
};

type Props = {
  action: (
    state: HowToUseVideoManagerState,
    formData: FormData,
  ) => Promise<HowToUseVideoManagerState>;
  initialMediaUrl?: string | null;
  initialBlobPathname?: string | null;
  initialOriginalName?: string | null;
  initialMimeType?: string | null;
};

const initialActionState: HowToUseVideoManagerState = { ok: false, message: "" };

function makeUploadPath(mimeType: string) {
  const extension = mimeType === "video/webm" ? "webm" : "mp4";
  const id = typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `site/how-to-use/videos/${id}.${extension}`;
}

export default function HowToUseVideoManager({
  action,
  initialMediaUrl = "",
  initialBlobPathname = "",
  initialOriginalName = "",
  initialMimeType = "",
}: Props) {
  const inputId = useId();
  const [state, formAction, pending] = useActionState(action, initialActionState);
  const [mediaUrl, setMediaUrl] = useState(initialMediaUrl ?? "");
  const [blobPathname, setBlobPathname] = useState(initialBlobPathname ?? "");
  const [originalName, setOriginalName] = useState(initialOriginalName ?? "");
  const [mimeType, setMimeType] = useState(initialMimeType ?? "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState("");

  async function onFileSelected(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    if (file.type !== "video/mp4" && file.type !== "video/webm") {
      setUploadMessage("MP4 또는 WebM 영상만 업로드할 수 있습니다.");
      return;
    }
    if (file.size > MAX_VIDEO_SIZE) {
      setUploadMessage("영상은 250MB 이하만 업로드할 수 있습니다.");
      return;
    }

    setUploading(true);
    setProgress(0);
    setUploadMessage("영상을 업로드하고 있습니다.");

    try {
      const blob = await upload(makeUploadPath(file.type), file, {
        access: "public",
        handleUploadUrl: "/api/admin/how-to-use-video-upload",
        multipart: true,
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });
      setMediaUrl(blob.url);
      setBlobPathname(blob.pathname);
      setOriginalName(file.name);
      setMimeType(file.type);
      setUploadMessage("업로드가 끝났습니다. 아래 저장 버튼을 눌러 공개 페이지에 반영해 주세요.");
    } catch (error) {
      setUploadMessage(error instanceof Error ? error.message : "영상 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  }

  function clearMedia() {
    setMediaUrl("");
    setBlobPathname("");
    setOriginalName("");
    setMimeType("");
    setProgress(0);
    setUploadMessage("영상 제거를 적용하려면 저장 버튼을 눌러 주세요.");
  }

  return (
    <form
      action={formAction}
      className="space-y-5"
      onSubmit={(event) => {
        if (uploading) event.preventDefault();
      }}
    >
      <input type="hidden" name="mediaUrl" value={mediaUrl} />
      <input type="hidden" name="blobPathname" value={blobPathname} />
      <input type="hidden" name="originalName" value={originalName} />
      <input type="hidden" name="mimeType" value={mimeType} />

      <div className="rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50/60 px-6 py-8 text-center max-b580:px-4">
        <p className="text-[16px] font-extrabold text-slate-800">제품 가이드 영상 업로드</p>
        <p className="mx-auto mt-2 max-w-[620px] text-[13px] leading-relaxed text-slate-500">
          MP4 또는 WebM 파일을 최대 250MB까지 등록할 수 있습니다. 업로드 후 반드시 저장 버튼을 눌러 주세요.
        </p>
        <label
          htmlFor={inputId}
          className={`mt-5 inline-flex rounded-lg bg-[#0755a4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#064885] ${
            uploading ? "cursor-wait opacity-60" : "cursor-pointer"
          }`}
        >
          {uploading ? "업로드 중" : mediaUrl ? "다른 영상 선택" : "영상 파일 선택"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="video/mp4,video/webm"
          className="sr-only"
          disabled={uploading}
          onChange={(event) => {
            const input = event.currentTarget;
            void onFileSelected(input.files).finally(() => {
              input.value = "";
            });
          }}
        />
      </div>

      {(uploading || uploadMessage) && (
        <div className="rounded-xl bg-sky-50 px-4 py-3 text-[13px] text-sky-800" role="status">
          {uploadMessage}{uploading ? ` · ${progress}%` : ""}
          {uploading && <progress className="mt-2 block h-2 w-full" max={100} value={progress} />}
        </div>
      )}

      {mediaUrl && (
        <div className="space-y-4">
          <div className="flex min-w-0 items-center justify-between gap-4 max-b580:items-start">
            <div className="min-w-0">
              <p className="text-[14px] font-extrabold text-slate-800">선택된 영상</p>
              <p className="mt-1 truncate text-[12px] text-slate-500">{originalName}</p>
            </div>
            <button
              type="button"
              onClick={clearMedia}
              className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-[13px] font-bold text-slate-600 hover:bg-slate-50"
            >
              영상 제거
            </button>
          </div>
          <VideoPlayer src={mediaUrl} title="제품 가이드 영상 미리보기" mimeType={mimeType} />
        </div>
      )}

      {state.message && (
        <p
          role="alert"
          className={`rounded-xl px-5 py-4 text-[14px] font-medium ${
            state.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
          }`}
        >
          {state.message}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending || uploading}
          className="rounded-xl bg-[#0755a4] px-6 py-3.5 text-[15px] font-extrabold text-white transition hover:bg-[#064681] disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "저장 중" : "영상 설정 저장"}
        </button>
      </div>
    </form>
  );
}
