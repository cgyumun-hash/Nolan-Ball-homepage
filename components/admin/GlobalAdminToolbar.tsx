"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import InlineAdminToolbar from "@/components/admin/InlineAdminToolbar";

type SessionResponse = {
  authenticated: boolean;
  username?: string;
};

export default function GlobalAdminToolbar() {
  const pathname = usePathname();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    void fetch("/api/admin/session", {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) return null;
        return (await response.json()) as SessionResponse;
      })
      .then((session) => {
        if (session?.authenticated && session.username) {
          setUsername(session.username);
        } else {
          setUsername(null);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setUsername(null);
      });

    return () => controller.abort();
  }, [pathname]);

  if (!username) return null;

  return <InlineAdminToolbar username={username} />;
}
