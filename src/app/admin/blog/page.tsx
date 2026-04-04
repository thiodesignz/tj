"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminShell from "../components/AdminShell";
import CrudPanel from "../components/CrudPanel";

export default function AdminBlogPage() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);
  if (status !== "authenticated") return null;

  return (
    <AdminShell>
      <CrudPanel
        title="Blog Posts"
        endpoint="/api/admin/blog"
        fields={[
          { name: "title", label: "Title", type: "text" },
          { name: "slug", label: "Slug", type: "text" },
          { name: "excerpt", label: "Excerpt", type: "textarea" },
          { name: "content", label: "Content", type: "textarea" },
          { name: "category", label: "Category", type: "text" },
          { name: "author", label: "Author", type: "text" },
          { name: "published", label: "Published", type: "checkbox" },
        ]}
      />
    </AdminShell>
  );
}
