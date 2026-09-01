import "server-only";

import { cache } from "react";

import { getAdminSession } from "@/lib/server/admin-auth";
import { isDatabaseConfigured } from "@/lib/server/db";

/**
 * 공개 페이지에서 관리 도구를 표시할 때 사용하는 fail-closed 세션 조회입니다.
 * 인증 저장소가 잠시 응답하지 않아도 공개 콘텐츠는 계속 표시하고 관리 도구만 숨깁니다.
 */
export const getOptionalAdminSession = cache(async () => {
  if (!isDatabaseConfigured()) return null;

  try {
    return await getAdminSession();
  } catch (error) {
    console.error("Could not verify the optional admin session", {
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return null;
  }
});
