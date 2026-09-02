"use client";

import { upload } from "@vercel/blob/client";
import { useActionState, useId, useRef, useState, useTransition } from "react";

export type ResourceDownloadsActionState = {
  ok: boolean;
  message: string;
};

export type ResourceDownloadAdminItem = {
  id: string;
  sourceKey: string | null;
  title: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
  fileUrl: string;
  blobPathname: string | null;
  fileName: string;
  mimeType: string;
  fileSizeBytes: number;
};

type CreateResourceAction = (
  previousState: ResourceDownloadsActionState,
  formData: FormData,
) => Promise<ResourceDownloadsActionState>;

type UpdateResourceAction = (
  id: string,
  previousState: ResourceDownloadsActionState,
  formData: FormData,
) => Promise<ResourceDownloadsActionState>;

type DeleteResourceAction = (
  id: string,
) => Promise<ResourceDownloadsActionState | void>;

type UploadedDocument = {
  url: string;
  downloadUrl: string;
  pathname: string;
  originalFilename: string;
  mimeType: string;
  size: number;
};

type ResourceEditorDraft = {
  sourceKey?: string;
  title: string;
  description: string;
  sortOrder: number;
  isPublished: boolean;
};

const initialActionState: ResourceDownloadsActionState = {
  ok: false,
  message: "",
};

const MAX_DOCUMENT_SIZE = 100 * 1024 * 1024;

const DOCUMENT_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "hwp",
  "hwpx",
]);

const DOCUMENT_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/x-hwp",
  "application/haansofthwp",
  "application/vnd.hancom.hwp",
  "application/vnd.hancom.hwpx",
]);

const inputClass = "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-[#1677c8] focus:ring-2 focus:ring-sky-100";

const IFU_DRAFT: ResourceEditorDraft = {
  sourceKey: "bundled-ifu",
  title: "사용설명서 (IFU)",
  description: "단계별 사용 순서와 주의사항",
  sortOrder: 4,
  isPublished: true,
};

function getExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() ?? "";
}

function validateDocument(file: File) {
  const extension = getExtension(file.name);
  if (!DOCUMENT_EXTENSIONS.has(extension)) {
    throw new Error("PDF, Word, Excel, PowerPoint, 한글 문서만 등록할 수 있습니다.");
  }
  if (file.type && !DOCUMENT_MIME_TYPES.has(file.type)) {
    throw new Error("파일 형식이 확장자와 일치하지 않습니다.");
  }
  if (file.size <= 0 || file.size > MAX_DOCUMENT_SIZE) {
    throw new Error("문서는 100MB 이하의 파일만 등록할 수 있습니다.");
  }
  return extension;
}

function randomDocumentPath(extension: string) {
  const id = typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `downloads/${id}.${extension}`;
}

function formatBytes(value: number | null) {
  if (!value || value < 1) return "파일 없음";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  const size = value / 1024 ** index;
  return `${size >= 10 || index === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[index]}`;
}

function DocumentUploadField({
  initialDocument,
  allowClear = true,
}: {
  initialDocument?: UploadedDocument | null;
  allowClear?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const [document, setDocument] = useState<UploadedDocument | null>(initialDocument ?? null);
  const [busy, setBusy] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  async function onDocument(file: File | undefined) {
    if (!file) return;

    setBusy(true);
    setProgress(0);
    setMessage("자료를 업로드하고 있습니다.");
    try {
      const extension = validateDocument(file);
      const blob = await upload(randomDocumentPath(extension), file, {
        access: "public",
        handleUploadUrl: "/api/admin/download-upload",
        multipart: true,
        onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
      });

      setDocument({
        url: blob.url,
        downloadUrl: blob.downloadUrl,
        pathname: blob.pathname,
        originalFilename: file.name,
        mimeType: blob.contentType || file.type,
        size: file.size,
      });
      setMessage("자료 업로드가 완료되었습니다. 저장 버튼을 눌러 반영해 주세요.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "자료 업로드에 실패했습니다.");
    } finally {
      setBusy(false);
    }
  }

  function onDragEnter(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (busy) return;
    dragDepth.current += 1;
    setIsDragging(true);
  }

  function onDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (!busy) event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    if (busy) return;
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) setIsDragging(false);
  }

  function onDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    dragDepth.current = 0;
    setIsDragging(false);
    if (busy) return;
    void onDocument(event.dataTransfer.files?.[0]);
  }

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-4 transition-colors ${
        isDragging
          ? "border-[#1677c8] bg-sky-100 ring-2 ring-sky-200"
          : "border-slate-200 bg-slate-50"
      }`}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      aria-label="자료 파일 업로드 영역"
    >
      <input type="hidden" name="fileUrl" value={document?.url ?? ""} />
      <input type="hidden" name="fileDownloadUrl" value={document?.downloadUrl ?? ""} />
      <input type="hidden" name="blobPathname" value={document?.pathname ?? ""} />
      <input type="hidden" name="fileName" value={document?.originalFilename ?? ""} />
      <input type="hidden" name="mimeType" value={document?.mimeType ?? ""} />
      <input type="hidden" name="fileSizeBytes" value={document?.size ?? ""} />

      <div className="flex items-start justify-between gap-4 max-b580:flex-col">
        <div className="min-w-0">
          <p className="text-[14px] font-extrabold text-slate-800">자료 파일</p>
          {document ? (
            <>
              <p className="mt-1 break-all text-[13px] text-slate-600">{document.originalFilename}</p>
              <p className="mt-1 text-[12px] text-slate-400">{formatBytes(document.size)}</p>
            </>
          ) : (
            <p className="mt-1 text-[13px] text-slate-500">
              파일을 끌어다 놓거나 파일 선택 버튼을 이용해 등록해 주세요.
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <label
            htmlFor={inputId}
            tabIndex={busy ? -1 : 0}
            role="button"
            onKeyDown={(event) => {
              if (!busy && (event.key === "Enter" || event.key === " ")) {
                event.preventDefault();
                inputRef.current?.click();
              }
            }}
            className={`rounded-lg bg-[#0755a4] px-4 py-2.5 text-[13px] font-bold text-white hover:bg-[#064681] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${busy ? "cursor-wait opacity-60" : "cursor-pointer"}`}
          >
            {busy ? `업로드 ${progress}%` : document ? "파일 교체" : "파일 선택"}
            <input
              ref={inputRef}
              id={inputId}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.hwp,.hwpx"
              className="sr-only"
              disabled={busy}
              onChange={(event) => {
                const input = event.currentTarget;
                void onDocument(input.files?.[0]).finally(() => {
                  input.value = "";
                });
              }}
            />
          </label>
          {document && allowClear && (
            <button
              type="button"
              onClick={() => {
                setDocument(null);
                setMessage("파일을 제거했습니다. 저장 버튼을 눌러 반영해 주세요.");
              }}
              disabled={busy}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-600 hover:bg-slate-100"
            >
              제거
            </button>
          )}
        </div>
      </div>

      {(busy || message) && (
        <div className="mt-3 rounded-lg bg-sky-50 px-3 py-2 text-[12px] text-sky-800" role="status" aria-live="polite">
          {message}
          {busy && <progress className="mt-2 block h-2 w-full" max={100} value={progress} />}
        </div>
      )}
    </div>
  );
}

function ResourceEditor({
  item,
  draft,
  action,
  submitLabel,
}: {
  item?: ResourceDownloadAdminItem;
  draft?: ResourceEditorDraft;
  action: CreateResourceAction;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialActionState);
  // sourceKey is only accepted while creating a managed bundled slot.
  // Existing rows keep their immutable source_key on update.
  const sourceKey = item ? "" : draft?.sourceKey ?? "";
  const title = item?.title ?? draft?.title ?? "";
  const description = item?.description ?? draft?.description ?? "";
  const sortOrder = item?.sortOrder ?? draft?.sortOrder ?? 0;
  const isPublished = item?.isPublished ?? draft?.isPublished ?? false;
  const initialDocument = item?.fileUrl
      ? {
        url: item.fileUrl,
        downloadUrl: item.fileUrl,
        pathname: item.blobPathname ?? "",
        originalFilename: item.fileName,
        mimeType: item.mimeType,
        size: item.fileSizeBytes,
      }
    : null;

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="sourceKey" value={sourceKey} />
      <div className="grid grid-cols-[minmax(0,1fr)_160px_180px] gap-4 max-b860:grid-cols-1">
        <label className="text-[13px] font-bold text-slate-700">
          제목 <span className="text-red-500">*</span>
          <input className={inputClass} name="title" required maxLength={200} defaultValue={title} />
        </label>
        <label className="text-[13px] font-bold text-slate-700">
          정렬 순서
          <input className={inputClass} name="sortOrder" type="number" min={0} max={9999} defaultValue={sortOrder} />
        </label>
        <label className="text-[13px] font-bold text-slate-700">
          공개 상태
          <select className={inputClass} name="isPublished" defaultValue={isPublished ? "true" : "false"}>
            <option value="false">임시 저장</option>
            <option value="true">공개</option>
          </select>
        </label>
      </div>

      <label className="block text-[13px] font-bold text-slate-700">
        설명
        <textarea className={`${inputClass} min-h-24 resize-y leading-relaxed`} name="description" maxLength={4000} defaultValue={description} />
      </label>

      <DocumentUploadField initialDocument={initialDocument} allowClear={!item} />

      {state.message && (
        <p className={`rounded-lg px-4 py-3 text-[13px] ${state.ok ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`} role="status" aria-live="polite">
          {state.message}
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[#0755a4] px-5 py-3 text-[14px] font-extrabold text-white shadow-lg shadow-blue-900/10 hover:bg-[#064681] disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "저장 중..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

function ResourceListItem({
  item,
  updateAction,
  deleteAction,
}: {
  item: ResourceDownloadAdminItem;
  updateAction: UpdateResourceAction;
  deleteAction: DeleteResourceAction;
}) {
  const [deleting, startDelete] = useTransition();
  const [deleteMessage, setDeleteMessage] = useState("");
  const boundUpdateAction = updateAction.bind(null, item.id);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm max-b580:p-4">
      <div className="flex items-start justify-between gap-5 max-b580:flex-col">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold">
            <span className="rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">순서 {item.sortOrder}</span>
            <span className={`rounded-full px-2.5 py-1 ${item.isPublished ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
              {item.isPublished ? "공개" : "임시 저장"}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500">{formatBytes(item.fileSizeBytes)}</span>
          </div>
          <h3 className="mt-3 break-words text-[18px] font-extrabold text-[#102a52]">{item.title}</h3>
          {item.description && <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">{item.description}</p>}
        </div>
        <button
          type="button"
          disabled={deleting}
          onClick={() => {
            if (!window.confirm(`“${item.title}” 자료를 삭제할까요? 삭제 후에는 복구할 수 없습니다.`)) return;
            startDelete(async () => {
              const result = await deleteAction(item.id);
              setDeleteMessage(result?.message ?? "자료를 삭제했습니다.");
            });
          }}
          className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-[12px] font-bold text-red-600 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
        >
          {deleting ? "삭제 중..." : "삭제"}
        </button>
      </div>

      <details className="mt-4 border-t border-slate-100 pt-4">
        <summary className="w-fit cursor-pointer text-[13px] font-extrabold text-[#0755a4]">내용 및 파일 수정</summary>
        <div className="mt-5">
          <ResourceEditor item={item} action={boundUpdateAction} submitLabel="수정 내용 저장" />
        </div>
      </details>

      {deleteMessage && <p className="mt-3 text-[12px] text-slate-500" role="status">{deleteMessage}</p>}
    </article>
  );
}

function PendingIfuListItem({
  createAction,
}: {
  createAction: CreateResourceAction;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm max-b580:p-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold">
          <span className="rounded-full bg-sky-50 px-2.5 py-1 text-sky-700">순서 4</span>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-700">파일 준비 중</span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-500">파일 없음</span>
        </div>
        <h3 className="mt-3 break-words text-[18px] font-extrabold text-[#102a52]">
          {IFU_DRAFT.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-slate-500">
          {IFU_DRAFT.description}
        </p>
      </div>

      <details className="mt-4 border-t border-slate-100 pt-4">
        <summary className="w-fit cursor-pointer text-[13px] font-extrabold text-[#0755a4]">
          내용 및 파일 등록
        </summary>
        <div className="mt-5">
          <ResourceEditor draft={IFU_DRAFT} action={createAction} submitLabel="사용설명서 저장" />
        </div>
      </details>
    </article>
  );
}

export default function ResourceDownloadsManager({
  items,
  createAction,
  updateAction,
  deleteAction,
  embedded = false,
}: {
  items: ResourceDownloadAdminItem[];
  createAction: CreateResourceAction;
  updateAction: UpdateResourceAction;
  deleteAction: DeleteResourceAction;
  embedded?: boolean;
}) {
  const hasIfuResource = items.some(isIfuResource);
  const managerContent = (
    <div className={`space-y-6 ${embedded ? "" : "border-t border-sky-200 px-6 py-6 max-b580:px-4"}`}>
        <div>
          <p className="text-[12px] font-extrabold tracking-[0.18em] text-[#1677c8]">DOWNLOADS CMS</p>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-500">
            제목과 설명, 정렬 순서, 공개 상태를 관리하고 문서 파일을 등록할 수 있습니다.
          </p>
        </div>

        <details className="rounded-2xl border border-dashed border-sky-300 bg-white p-5 max-b580:p-4">
          <summary className="cursor-pointer text-[15px] font-extrabold text-[#0755a4]">+ 새 다운로드 자료 등록</summary>
          <div className="mt-5">
            <ResourceEditor action={createAction} submitLabel="새 자료 저장" />
          </div>
        </details>

        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-[14px] text-slate-500">
              등록된 다운로드 자료가 없습니다.
            </div>
          ) : (
            items.map((item) => (
              <ResourceListItem
                key={item.id}
                item={item}
                updateAction={updateAction}
                deleteAction={deleteAction}
              />
            ))
          )}
          {!hasIfuResource && <PendingIfuListItem createAction={createAction} />}
        </div>
      </div>
  );

  if (embedded) {
    return managerContent;
  }

  return (
    <details className="mt-12 rounded-[22px] border border-sky-200 bg-[#f3f8fd] shadow-sm">
      <summary className="cursor-pointer px-6 py-5 text-[16px] font-extrabold text-[#102a52] marker:text-[#1677c8] max-b580:px-4">
        관리자 자료 다운로드 관리
      </summary>
      {managerContent}
    </details>
  );
}

function isIfuResource(item: ResourceDownloadAdminItem) {
  return item.sourceKey === "bundled-ifu" || /\bifu\b/i.test(item.title) || item.title.includes("사용설명서");
}
