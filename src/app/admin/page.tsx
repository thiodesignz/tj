"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminShell from "./components/AdminShell";

export default function AdminPage() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  if (status === "loading") return null;
  if (status === "unauthenticated") return null;

  return (
    <AdminShell>
      <div className="flex flex-col gap-[24px]">
        <h1 className="font-[family-name:var(--font-geist)] font-semibold text-[24px] text-black tracking-[-0.48px]">
          Dashboard
        </h1>
        <p className="font-[family-name:var(--font-geist)] text-[16px] text-black/60">
          Select a section from the sidebar to manage your content.
        </p>
      </div>
    </AdminShell>
  );
}
