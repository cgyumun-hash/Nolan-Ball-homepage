"use client";

import { upload } from "@vercel/blob/client";
import { useId, useRef, useState } from "react";

async function imageToWebp(file: File) {
  if (file.type === "image/webp") return file;

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("이미지를 읽을 수 없습니다."));
      element.src = objectUrl;
    });

    const maxSide = 2400;
    const scale = Math.min(1, maxSide / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("이미지 변환을 시작할 수 없습니다.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (value) => (value ? resolve(value) : reject(new Error("WebP 변환에 실패했습니다."))),
        "image/webp",
        0.86,
      );
    });

    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.webp`, {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function randomPath(folder: "images" | "videos", extension: string) {
  const id = typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `activities/${folder}/${id}.${extension}`;
}

export default function ActivityMediaManager({
  initialCoverUrl = "",
  initialCoverPathname = "",
  initialGallery = [],
  initialVideoUrl = "",
}: {
  initialCoverUrl?: string;
  initialCoverPathname?: string;
  initialGallery?: string[];
  initialVideoUrl?: string;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);
  const [coverUrl, setCoverUrl] = useState(initialCoverUrl);
  const [coverPathname, setCoverPathname] = useState(initialCoverPathname);
  const [gallery, setGallery] = useState(initialGallery);
  const [videoUrl, setVideoUrl] = useState(initialVideoUrl);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");

  async function uploadImage(file: File) {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      throw new Error("JPG, PNG, WebP 이미지만 업로드할 수 있습니다.");
    }
    if (file.size > 20 * 1024 * 1024) throw new Error("이미지는 20MB 이하만 업로드할 수 있습니다.");
    const webp = await imageToWebp(file);
    return upload(randomPath("images", "webp"), webp, {
      access: "public",
      handleUploadUrl: "/api/admin/activity-upload",
      onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
    });
  }

  async function uploadVideo(file: File) {
    if (!file.type.match(/^video\/(mp4|webm)$/)) {
      throw new Error("MP4 또는 WebM 영상만 업로드할 수 있습니다.");
    }
    if (file.size > 250 * 1024 * 1024) {
      throw new Error("영상은 250MB 이하만 업로드할 수 있습니다.");
    }

    const extension = file.type === "video/webm" ? "webm" : "mp4";
    return upload(randomPath("videos", extension), file, {
      access: "public",
      handleUploadUrl: "/api/admin/activity-upload",
      multipart: true,
      onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
    });
  }

  async function onMedia(files: FileList | null) {
    if (!files?.length) return;

    const selected = Array.from(files);
    const imageFiles = selected.filter((file) => /^image\/(jpeg|png|webp)$/.test(file.type));
    const videoFiles = selected.filter((file) => /^video\/(mp4|webm)$/.test(file.type));
    const unsupported = selected.length - imageFiles.length - videoFiles.length;

    if (unsupported > 0) {
      setMessage("JPG·PNG·WebP 이미지와 MP4·WebM 영상만 선택할 수 있습니다.");
      return;
    }
    if (videoFiles.length > 1) {
      setMessage("영상은 한 번에 1개만 등록할 수 있습니다.");
      return;
    }

    const galleryAdditions = coverUrl
      ? imageFiles.length
      : Math.max(0, imageFiles.length - 1);
    if (gallery.length + galleryAdditions > 12) {
      setMessage("대표 이미지를 제외한 상세 이미지는 최대 12장까지 등록할 수 있습니다.");
      return;
    }

    setBusy(true);
    setProgress(0);
    try {
      let nextCoverUrl = coverUrl;

      for (const [index, file] of imageFiles.entries()) {
        setMessage(`사진 ${index + 1}/${imageFiles.length} 변환 및 업로드 중`);
        const blob = await uploadImage(file);
        if (!nextCoverUrl) {
          nextCoverUrl = blob.url;
          setCoverUrl(blob.url);
          setCoverPathname(blob.pathname);
        } else {
          setGallery((current) => [...current, blob.url]);
        }
      }

      if (videoFiles[0]) {
        setProgress(0);
        setMessage("영상을 업로드하고 있습니다.");
        const blob = await uploadVideo(videoFiles[0]);
        setVideoUrl(blob.url);
      }

      setMessage("선택한 사진·영상 업로드가 완료되었습니다.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "미디어 업로드에 실패했습니다.");
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
    void onMedia(event.dataTransfer.files);
  }

  return (
    <section className="space-y-7 rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-[20px] font-extrabold text-slate-900">사진·영상</h2>
        <p className="mt-1 text-[13px] leading-relaxed text-slate-500">JPG·PNG 이미지는 업로드 전에 자동으로 WebP로 변환됩니다.</p>
      </div>

      <input type="hidden" name="coverImageUrl" value={coverUrl} />
      <input type="hidden" name="coverImagePathname" value={coverPathname} />
      <input type="hidden" name="gallery" value={JSON.stringify(gallery)} />
      <input type="hidden" name="videoUrl" value={videoUrl} />

      <div
        className={`rounded-2xl border-2 border-dashed px-6 py-7 text-center transition-colors max-b580:px-4 ${
          isDragging
            ? "border-[#1677c8] bg-sky-100 ring-2 ring-sky-200"
            : "border-sky-200 bg-sky-50/60"
        }`}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        aria-label="주요활동 사진 및 영상 업로드 영역"
      >
        <p className="text-[15px] font-extrabold text-slate-800">사진·영상 파일</p>
        <p className="mx-auto mt-2 max-w-[620px] text-[13px] leading-relaxed text-slate-500">
          사진과 영상을 끌어다 놓거나 한 번에 선택할 수 있습니다. 첫 번째 사진은 목록의 대표 이미지가 되고,
          나머지는 본문 상세 이미지로 등록됩니다.
        </p>
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
          className={`mt-5 inline-flex rounded-lg bg-[#0755a4] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#064885] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${busy ? "cursor-wait opacity-60" : "cursor-pointer"}`}
        >
          {busy ? "업로드 중…" : "사진·영상 선택"}
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
            className="sr-only"
            disabled={busy}
            onChange={(event) => {
              const input = event.currentTarget;
              void onMedia(input.files).finally(() => {
                input.value = "";
              });
            }}
          />
        </label>
        <p className="mt-3 text-[12px] text-slate-400">사진 JPG·PNG·WebP · 영상 MP4·WebM (영상 1개)</p>
      </div>

      {(coverUrl || gallery.length > 0) && (
        <div className="space-y-3">
          <h3 className="text-[14px] font-bold text-slate-700">등록된 사진</h3>
          {coverUrl && (
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt="대표 이미지 미리보기" className="aspect-[16/9] w-full object-cover" />
              <span className="absolute left-3 top-3 rounded-full bg-[#0755a4] px-3 py-1 text-[12px] font-bold text-white">
                대표 이미지
              </span>
              <button
                type="button"
                onClick={() => {
                  setCoverUrl("");
                  setCoverPathname("");
                }}
                className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[12px] font-bold text-white"
              >
                제거
              </button>
            </div>
          )}
          {gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3 max-b580:grid-cols-2">
              {gallery.map((url, index) => (
                <div key={url} className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt={`상세 이미지 ${index + 1}`} className="aspect-square w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setGallery((current) => current.filter((item) => item !== url))}
                    className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-[15px] text-white"
                    aria-label={`상세 이미지 ${index + 1} 제거`}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {videoUrl && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 max-b580:items-start">
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-slate-800">영상 1개 등록됨</p>
            <p className="mt-1 truncate text-[12px] text-slate-500">{videoUrl}</p>
          </div>
          <button
            type="button"
            onClick={() => setVideoUrl("")}
            className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-[13px] font-bold text-slate-600"
          >
            제거
          </button>
        </div>
      )}

      {(busy || message) && (
        <div className="rounded-lg bg-sky-50 px-4 py-3 text-[13px] text-sky-800" role="status">
          {message}{busy ? ` · ${progress}%` : ""}
          {busy && <progress className="mt-2 block h-2 w-full" max={100} value={progress} />}
        </div>
      )}
    </section>
  );
}
