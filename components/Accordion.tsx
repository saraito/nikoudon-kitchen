"use client";

import { useState, ReactNode } from "react";

export default function Accordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-black mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <span>
          <span className="font-medium">{title}</span>
          {subtitle && <span className="block text-xs text-gray-500 mt-0.5">{subtitle}</span>}
        </span>
        <span className="text-lg leading-none">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="px-4 pb-4 border-t border-gray-200">{children}</div>}
    </div>
  );
}
