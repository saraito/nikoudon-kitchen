"use client";

import { useState, ReactNode } from "react";

export default function Accordion({
  title,
  subtitle,
  children,
  defaultOpen = false,
  headerActions,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  headerActions?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-black mb-3">
      <div className="w-full flex items-center justify-between px-4 py-3">
        <button onClick={() => setOpen(!open)} className="flex-1 flex items-center justify-between text-left min-w-0">
          <span className="min-w-0">
            <span className="font-medium">{title}</span>
            {subtitle && <span className="block text-xs text-gray-500 mt-0.5">{subtitle}</span>}
          </span>
          <span className="text-lg leading-none ml-2 shrink-0">{open ? "−" : "+"}</span>
        </button>
        {headerActions && (
          <div className="ml-2 shrink-0" onClick={(e) => e.stopPropagation()}>
            {headerActions}
          </div>
        )}
      </div>
      {open && <div className="px-4 pb-4 border-t border-gray-200">{children}</div>}
    </div>
  );
}
