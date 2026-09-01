import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { requireAdminSession } from "@/lib/server/admin-auth";

export const runtime = "nodejs";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        await requireAdminSession();

        if (!pathname.startsWith("activities/") || pathname.includes("..")) {
          throw new Error("허용되지 않은 업로드 경로입니다.");
        }

        return {
          addRandomSuffix: true,
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: 250 * 1024 * 1024,
          validUntil: Date.now() + 10 * 60 * 1000,
          cacheControlMaxAge: 60 * 60 * 24 * 30,
        };
      },
      onUploadCompleted: async () => {
        // The database row is saved only when the authenticated editor submits the form.
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "업로드에 실패했습니다." },
      { status: 400 },
    );
  }
}
