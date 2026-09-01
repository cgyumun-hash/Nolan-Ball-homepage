import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { AdminAuthError, requireAdminSession } from "@/lib/server/admin-auth";

export const runtime = "nodejs";

const MAX_VIDEO_SIZE = 250 * 1024 * 1024;
const VIDEO_PATH_PATTERN = /^site\/how-to-use\/videos\/[A-Za-z0-9-]+\.(?:mp4|webm)$/;

class UploadValidationError extends Error {}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandleUploadBody;
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        await requireAdminSession();

        if (!VIDEO_PATH_PATTERN.test(pathname) || pathname.includes("..")) {
          throw new UploadValidationError("허용되지 않은 영상 업로드 경로입니다.");
        }

        return {
          addRandomSuffix: true,
          allowedContentTypes: ["video/mp4", "video/webm"],
          maximumSizeInBytes: MAX_VIDEO_SIZE,
          validUntil: Date.now() + 10 * 60 * 1000,
          cacheControlMaxAge: 60 * 60 * 24 * 30,
        };
      },
      onUploadCompleted: async () => {
        // 관리자가 저장 버튼을 눌렀을 때 DB 설정을 교체합니다.
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

    console.error("Unexpected guide video upload failure", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return NextResponse.json(
      { error: "영상 업로드에 실패했습니다. 잠시 후 다시 시도해 주세요." },
      { status: 500 },
    );
  }
}
