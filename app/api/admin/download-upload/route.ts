import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { AdminAuthError, requireAdminSession } from "@/lib/server/admin-auth";

export const runtime = "nodejs";

const MAX_DOCUMENT_SIZE = 100 * 1024 * 1024;

const ALLOWED_DOCUMENT_TYPES = [
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
] as const;

class UploadValidationError extends Error {}

function isSafeDownloadPath(pathname: string) {
  return pathname.length <= 512
    && pathname.startsWith("downloads/")
    && !pathname.includes("..")
    && !pathname.includes("\\")
    && /^downloads\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(pathname);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        await requireAdminSession();

        if (!isSafeDownloadPath(pathname)) {
          throw new UploadValidationError("허용되지 않은 자료 업로드 경로입니다.");
        }

        return {
          addRandomSuffix: true,
          allowedContentTypes: [...ALLOWED_DOCUMENT_TYPES],
          maximumSizeInBytes: MAX_DOCUMENT_SIZE,
          validUntil: Date.now() + 10 * 60 * 1000,
          cacheControlMaxAge: 60 * 60 * 24 * 30,
        };
      },
      onUploadCompleted: async () => {
        // The authenticated form action stores the returned Blob metadata in Neon.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json(
        { error: "관리자 로그인이 필요합니다." },
        { status: 401 },
      );
    }
    if (error instanceof UploadValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Unexpected resource upload failure", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { error: "자료 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
