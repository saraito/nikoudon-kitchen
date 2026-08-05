"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const links = [
    { href: "/admin/opening-closing", label: "Edit Opening / Closing checklists" },
    { href: "/admin/stock", label: "Edit Stock Check list" },
    { href: "/admin/menu", label: "Edit Menu" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-lg font-medium mb-4">Staff edit</h1>
      <div className="flex flex-col gap-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="border border-black px-4 py-3">
            {l.label}
          </Link>
        ))}
      </div>
      <button onClick={logout} className="mt-6 text-xs uppercase tracking-widest text-gray-400">
        Log out
      </button>
    </div>
  );
}
