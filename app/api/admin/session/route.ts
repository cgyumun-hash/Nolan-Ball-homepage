import { NextResponse } from "next/server";

import { getOptionalAdminSession } from "@/lib/server/optional-admin-session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getOptionalAdminSession();

  return NextResponse.json(
    session
      ? { authenticated: true, username: session.username }
      : { authenticated: false },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
