"use client";

import { useEffect, useRef, useState } from "react";

export default function MeatballMenu({
  onEdit,
  onArchive,
  archiveLabel = "Archive",
}: {
  onEdit: () => void;
  onArchive: () => void;
  archiveLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="More actions"
        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black shrink-0"
      >
        <svg width="4" height="16" viewBox="0 0 4 16" fill="currentColor">
          <circle cx="2" cy="2" r="2" />
          <circle cx="2" cy="8" r="2" />
          <circle cx="2" cy="14" r="2" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-black min-w-[120px] z-20 text-sm">
          <button
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onArchive();
            }}
            className="block w-full text-left px-3 py-2 hover:bg-gray-100 border-t border-gray-200 text-gray-600"
          >
            {archiveLabel}
          </button>
        </div>
      )}
    </div>
  );
}
