"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminShell from "../components/AdminShell";
import CrudPanel from "../components/CrudPanel";

export default function AdminTemplatesPage() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);
  if (status !== "authenticated") return null;

  return (
    <AdminShell>
      <CrudPanel
        title="Templates"
        endpoint="/api/admin/templates"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "category", label: "Category", type: "text" },
          { name: "previewUrl", label: "Preview URL", type: "url" },
          { name: "order", label: "Order", type: "number" },
        ]}
      />
    </AdminShell>
  );
}
