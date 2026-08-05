"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/opening-closing", label: "Open / Close" },
  { href: "/stock", label: "Stock Check" },
  { href: "/menu", label: "Menu" },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black">
      <div className="max-w-2xl mx-auto grid grid-cols-3">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`text-center py-3 text-sm border-r last:border-r-0 border-black ${
                active ? "bg-black text-white font-medium" : "text-gray-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
