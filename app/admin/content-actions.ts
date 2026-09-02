"use server";

import { del } from "@vercel/blob";
import { revalidatePath, updateTag } from "next/cache";
import { after } from "next/server";

import type { HowToUseVideoManagerState } from "@/components/admin/HowToUseVideoManager";
import { AdminAuthError, requireAdminSession } from "@/lib/server/admin-auth";
import {
  createResourceDownload,
  deleteResourceDownload,
  getAdminResourceDownload,
  ResourceDownloadValidationError,
  updateResourceDownload,
  type ResourceDownloadMutationInput,
} from "@/lib/server/resource-downloads";
import {
  deleteHowToUseGuideVideo,
  getHowToUseGuideVideo,
  SiteMediaValidationError,
  upsertHowToUseGuideVideo,
} from "@/lib/server/site-media";

export type ManagedContentActionState = {
  ok: boolean;
  message: string;
};

export async function createResourceDownloadAction(
  _state: ManagedContentActionState,
  formData: FormData,
): Promise<ManagedContentActionState> {
  try {
    await requireAdminSession();
    await createResourceDownload(parseResourceDownloadForm(formData));
    revalidateDownloadRoutes();
    return { ok: true, message: "자료가 등록되었습니다." };
  } catch (error) {
    return contentFailure(error, "자료를 등록하지 못했습니다.");
  }
}

export async function updateResourceDownloadAction(
  id: string,
  _state: ManagedContentActionState,
  formData: FormData,
): Promise<ManagedContentActionState> {
  try {
    await requireAdminSession();
    const previous = await getAdminResourceDownload(id);
    if (!previous) return { ok: false, message: "수정할 자료를 찾지 못했습니다." };

    const updated = await updateResourceDownload(id, parseResourceDownloadForm(formData));
    if (!updated) return { ok: false, message: "수정할 자료를 찾지 못했습니다." };

    if (previous.blobPathname && previous.blobPathname !== updated.blobPathname) {
      after(() => deleteSafeBlob(previous.blobPathname!, "downloads/"));
    }
    revalidateDownloadRoutes();
    return { ok: true, message: "자료가 수정되었습니다." };
  } catch (error) {
    return contentFailure(error, "자료를 수정하지 못했습니다.");
  }
}

export async function deleteResourceDownloadAction(
  id: string,
): Promise<ManagedContentActionState> {
  try {
    await requireAdminSession();
    const deleted = await deleteResourceDownload(id);
    if (!deleted) return { ok: false, message: "삭제할 자료를 찾지 못했습니다." };
    if (deleted?.blobPathname) {
      after(() => deleteSafeBlob(deleted.blobPathname!, "downloads/"));
    }
    revalidateDownloadRoutes();
    return { ok: true, message: "자료가 삭제되었습니다." };
  } catch (error) {
    return contentFailure(error, "자료를 삭제하지 못했습니다.");
  }
}

export async function saveHowToUseGuideVideoAction(
  _state: HowToUseVideoManagerState,
  formData: FormData,
): Promise<HowToUseVideoManagerState> {
  try {
    await requireAdminSession();
    const previous = await getHowToUseGuideVideo();
    const mediaUrl = formText(formData, "mediaUrl");

    if (!mediaUrl) {
      const deleted = await deleteHowToUseGuideVideo();
      if (deleted?.blobPathname) {
        after(() => deleteSafeBlob(deleted.blobPathname!, "site/how-to-use/videos/"));
      }
      revalidateHowToUseRoutes();
      return { ok: true, message: "제품 가이드 영상이 제거되었습니다." };
    }

    const updated = await upsertHowToUseGuideVideo({
      mediaUrl,
      blobPathname: nullableFormText(formData, "blobPathname"),
      originalName: formText(formData, "originalName"),
      mimeType: formText(formData, "mimeType"),
    });

    if (previous?.blobPathname && previous.blobPathname !== updated.blobPathname) {
      after(() => deleteSafeBlob(previous.blobPathname!, "site/how-to-use/videos/"));
    }
    revalidateHowToUseRoutes();
    return { ok: true, message: "제품 가이드 영상이 저장되었습니다." };
  } catch (error) {
    return contentFailure(error, "영상 설정을 저장하지 못했습니다.");
  }
}

function parseResourceDownloadForm(formData: FormData): ResourceDownloadMutationInput {
  const fileSizeBytes = Number.parseInt(formText(formData, "fileSizeBytes"), 10);
  const sortOrder = Number.parseInt(formText(formData, "sortOrder") || "0", 10);

  return {
    sourceKey: nullableFormText(formData, "sourceKey"),
    title: formText(formData, "title"),
    description: formText(formData, "description"),
    fileUrl: formText(formData, "fileDownloadUrl") || formText(formData, "fileUrl"),
    blobPathname: nullableFormText(formData, "blobPathname"),
    fileName: formText(formData, "fileName"),
    fileSizeBytes,
    mimeType: formText(formData, "mimeType"),
    sortOrder,
    isPublished: formData.get("isPublished") === "on" || formData.get("isPublished") === "true",
  };
}

function formText(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.replaceAll("\0", "").trim() : "";
}

function nullableFormText(formData: FormData, key: string): string | null {
  const value = formText(formData, key);
  return value || null;
}

function revalidateDownloadRoutes() {
  updateTag("resource-downloads");
  revalidatePath("/admin/activities");
  revalidatePath("/customer-support/resources-downloads");
  revalidatePath("/en/customer-support/resources-downloads");
  revalidatePath("/cn/customer-support/resources-downloads");
}

function revalidateHowToUseRoutes() {
  updateTag("how-to-use-video");
  revalidatePath("/admin/activities");
  revalidatePath("/how-to-use");
  revalidatePath("/en/how-to-use");
  revalidatePath("/cn/how-to-use");
}

async function deleteSafeBlob(pathname: string, prefix: string) {
  if (!pathname.startsWith(prefix) || pathname.includes("..") || pathname.includes("\\")) {
    console.warn("Skipped deleting an unsafe Blob pathname", { prefix });
    return;
  }

  try {
    await del(pathname);
  } catch (error) {
    console.error("Could not remove an obsolete Blob object", {
      name: error instanceof Error ? error.name : "UnknownError",
      prefix,
    });
  }
}

function contentFailure(
  error: unknown,
  fallback: string,
): ManagedContentActionState {
  if (
    error instanceof ResourceDownloadValidationError
    || error instanceof SiteMediaValidationError
    || error instanceof AdminAuthError
  ) {
    return { ok: false, message: error.message };
  }

  console.error("Unexpected managed content action failure", {
    name: error instanceof Error ? error.name : "UnknownError",
  });
  return { ok: false, message: fallback };
}
