"use server";

import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  ActivityValidationError,
  type ActivityAdminRecord,
  type ActivityCategory,
  type ActivityMutationInput,
  type ActivityStatus,
} from "@/lib/activities";
import {
  ADMIN_SESSION_COOKIE_NAME,
  AdminAuthError,
  loginAdmin,
  logoutAdmin,
  requireAdminSession,
  setupAdmin,
} from "@/lib/server/admin-auth";
import {
  createActivity,
  deleteActivity,
  getAdminActivity,
  updateActivity,
} from "@/lib/server/activities";

export type AdminActionState = {
  ok: boolean;
  message: string;
};

export async function setupAdminAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const setupToken = formText(formData, "setupToken");
  const username = formText(formData, "username");
  const password = formText(formData, "password", false);
  const passwordConfirm = formText(formData, "passwordConfirm", false);

  if (password !== passwordConfirm) {
    return { ok: false, message: "비밀번호 확인이 일치하지 않습니다." };
  }

  try {
    await setupAdmin({ setupToken, username, password });
  } catch (error) {
    return actionFailure(error, "관리자 초기 설정을 완료할 수 없습니다.");
  }

  redirect("/admin/login");
}

export async function loginAdminAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const username = formText(formData, "username");
  const password = formText(formData, "password", false);

  try {
    await loginAdmin({ username, password });
  } catch (error) {
    return actionFailure(error, "로그인을 처리할 수 없습니다.");
  }

  redirect("/admin/activities");
}

export async function logoutAdminAction(): Promise<void> {
  try {
    await logoutAdmin();
  } catch {
    // DB가 일시적으로 응답하지 않아도 브라우저 세션은 반드시 폐기합니다.
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      expires: new Date(0),
      maxAge: 0,
    });
  }

  redirect("/admin/login");
}

export async function createActivityAction(
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await requireAdminSession();
    const activity = await createActivity(parseActivityFormData(formData));
    revalidateActivityRoutes(activity.slug);
  } catch (error) {
    return actionFailure(error, "주요활동을 저장할 수 없습니다.");
  }

  redirect("/admin/activities");
}

export async function updateActivityAction(
  id: string,
  _state: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await requireAdminSession();
    const previous = await getAdminActivity(id);
    if (!previous) return { ok: false, message: "수정할 게시물을 찾을 수 없습니다." };

    const updated = await updateActivity(id, parseActivityFormData(formData));
    if (!updated) return { ok: false, message: "수정할 게시물을 찾을 수 없습니다." };

    await cleanupReplacedBlobs(previous, updated);
    revalidateActivityRoutes(previous.slug, updated.slug);
  } catch (error) {
    return actionFailure(error, "주요활동을 수정할 수 없습니다.");
  }

  redirect("/admin/activities");
}

export async function deleteActivityAction(id: string): Promise<void> {
  try {
    await requireAdminSession();
    const deleted = await deleteActivity(id);
    if (deleted) {
      await cleanupDeletedActivityBlobs(deleted);
      revalidateActivityRoutes(deleted.slug);
    }
  } catch (error) {
    if (error instanceof AdminAuthError && error.code === "UNAUTHORIZED") {
      redirect("/admin/login");
    }

    console.error("Unexpected activity deletion failure", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
  }

  redirect("/admin/activities");
}

function parseActivityFormData(formData: FormData): ActivityMutationInput {
  const gallery = parseGallery(formData.get("gallery"));
  const category = formText(formData, "category") as ActivityCategory;
  const status = formText(formData, "status") as ActivityStatus;
  const titleKo = formText(formData, "titleKo");

  return {
    slug: nullableFormText(formData, "slug"),
    titleKo,
    titleEn: nullableFormText(formData, "titleEn"),
    titleCn: nullableFormText(formData, "titleCn"),
    excerptKo: nullableFormText(formData, "excerptKo"),
    excerptEn: nullableFormText(formData, "excerptEn"),
    excerptCn: nullableFormText(formData, "excerptCn"),
    contentKo: formText(formData, "contentKo", false),
    contentEn: nullableFormText(formData, "contentEn", false),
    contentCn: nullableFormText(formData, "contentCn", false),
    category,
    coverImageUrl: nullableFormText(formData, "coverImageUrl"),
    coverImagePathname: nullableFormText(formData, "coverImagePathname"),
    coverImageAlt: titleKo,
    gallery,
    videoUrl: nullableFormText(formData, "videoUrl"),
    location: nullableFormText(formData, "location"),
    eventStartDate: nullableFormText(formData, "eventStartDate"),
    eventEndDate: nullableFormText(formData, "eventEndDate"),
    status,
    publishedAt: nullableFormText(formData, "publishedAt"),
  };
}

function formText(formData: FormData, key: string, trim = true): string {
  const value = formData.get(key);
  if (typeof value !== "string") return "";
  return trim ? value.trim() : value;
}

function nullableFormText(
  formData: FormData,
  key: string,
  trim = true,
): string | null {
  const value = formText(formData, key, trim);
  return value.length > 0 ? value : null;
}

function parseGallery(value: FormDataEntryValue | null): string[] {
  if (value == null || value === "") return [];
  if (typeof value !== "string") {
    throw new ActivityValidationError("갤러리 이미지 정보를 확인해 주세요.");
  }

  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed) || parsed.some((item) => typeof item !== "string")) {
      throw new Error("Invalid gallery");
    }
    return parsed;
  } catch {
    throw new ActivityValidationError("갤러리 이미지 정보를 확인해 주세요.");
  }
}

function revalidateActivityRoutes(...slugs: string[]) {
  revalidatePath("/about/activities");
  revalidatePath("/en/about/activities");
  revalidatePath("/cn/about/activities");
  revalidatePath("/admin/activities");

  for (const slug of new Set(slugs.filter(Boolean))) {
    revalidatePath(`/about/activities/${slug}`);
    revalidatePath(`/en/about/activities/${slug}`);
    revalidatePath(`/cn/about/activities/${slug}`);
  }
}

async function cleanupReplacedBlobs(
  previous: ActivityAdminRecord,
  updated: ActivityAdminRecord,
): Promise<void> {
  const retainedUrls = new Set(
    [
      updated.coverImageUrl,
      ...updated.gallery,
      updated.videoUrl,
    ].filter((value): value is string => Boolean(value)),
  );
  const candidates: Array<string | null> = [];

  if (
    previous.coverImageUrl
    && !retainedUrls.has(previous.coverImageUrl)
  ) {
    candidates.push(previous.coverImagePathname ?? previous.coverImageUrl);
  }

  for (const url of previous.gallery) {
    if (!retainedUrls.has(url)) candidates.push(url);
  }

  if (previous.videoUrl && !retainedUrls.has(previous.videoUrl)) {
    candidates.push(previous.videoUrl);
  }

  await deleteSafeActivityBlobs(candidates);
}

async function cleanupDeletedActivityBlobs(activity: ActivityAdminRecord): Promise<void> {
  await deleteSafeActivityBlobs([
    activity.coverImagePathname ?? activity.coverImageUrl,
    ...activity.gallery,
    activity.videoUrl,
  ]);
}

async function deleteSafeActivityBlobs(candidates: Array<string | null>): Promise<void> {
  const safeTargets = [...new Set(
    candidates
      .filter((value): value is string => Boolean(value))
      .map(toSafeActivityBlobTarget)
      .filter((value): value is string => Boolean(value)),
  )];

  if (safeTargets.length === 0) return;

  try {
    await del(safeTargets);
  } catch (error) {
    console.error("Failed to clean up activity blobs", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
  }
}

function toSafeActivityBlobTarget(value: string): string | null {
  if (
    value.startsWith("activities/")
    && !value.includes("..")
    && /^[A-Za-z0-9._/-]+$/.test(value)
  ) {
    return value;
  }

  try {
    const url = new URL(value);
    const decodedPathname = decodeURIComponent(url.pathname);
    const isBlobHost = url.hostname.endsWith(".blob.vercel-storage.com");
    const isActivityPath = decodedPathname.startsWith("/activities/")
      && !decodedPathname.includes("..")
      && /^[A-Za-z0-9._/-]+$/.test(decodedPathname);
    return url.protocol === "https:" && isBlobHost && isActivityPath
      ? `${url.origin}${url.pathname}`
      : null;
  } catch {
    return null;
  }
}

function actionFailure(error: unknown, fallback: string): AdminActionState {
  if (error instanceof AdminAuthError || error instanceof ActivityValidationError) {
    return { ok: false, message: error.message };
  }

  console.error("Unexpected admin action failure", {
    name: error instanceof Error ? error.name : "UnknownError",
  });
  return { ok: false, message: fallback };
}
