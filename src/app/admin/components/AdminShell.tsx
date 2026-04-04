"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Works", href: "/admin/works" },
  { label: "Templates", href: "/admin/templates" },
  { label: "Products", href: "/admin/products" },
  { label: "Blog", href: "/admin/blog" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#fafafa] flex">
      {/* Sidebar */}
      <aside className="w-[240px] bg-white border-r border-[#eaecee] p-[24px] flex flex-col gap-[32px] shrink-0">
        <Link
          href="/admin"
          className="font-[family-name:var(--font-geist)] font-semibold text-[20px] text-black tracking-[-0.4px]"
        >
          Admin
        </Link>
        <nav className="flex flex-col gap-[4px]">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-[family-name:var(--font-geist)] text-[15px] tracking-[-0.3px] px-[12px] py-[8px] rounded-[8px] transition-colors ${
                pathname === item.href
                  ? "bg-primary text-white"
                  : "text-black/60 hover:bg-[#f0f0f0]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="font-[family-name:var(--font-geist)] text-[14px] text-black/40 hover:text-black transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 p-[32px]">{children}</main>
    </div>
  );
}
