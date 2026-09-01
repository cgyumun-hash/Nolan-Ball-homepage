import { redirect } from "next/navigation";

import { getAdminSession, hasAdminAccount } from "@/lib/server/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getAdminSession();
  if (session) redirect("/about/activities");
  redirect((await hasAdminAccount()) ? "/admin/login" : "/admin/setup");
}
