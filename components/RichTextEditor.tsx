"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function ToolbarButton({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`w-7 h-7 flex items-center justify-center text-sm border border-transparent ${
        active ? "bg-black text-white" : "text-gray-700 hover:border-black"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({
  value,
  onChange,
  uploadId,
  placeholder,
}: {
  value: string;
  onChange: (html: string) => void;
  uploadId: string;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = value || "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInput() {
    onChange(ref.current?.innerHTML || "");
  }

  function exec(cmd: string) {
    ref.current?.focus();
    document.execCommand(cmd);
    handleInput();
  }

  async function handleImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${uploadId}-inline-${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("dish-images")
      .upload(path, file, { upsert: true, contentType: file.type });
    setUploading(false);
    if (error) return;
    const { data } = supabase.storage.from("dish-images").getPublicUrl(path);
    ref.current?.focus();
    document.execCommand("insertImage", false, data.publicUrl);
    handleInput();
  }

  return (
    <div className="border border-black">
      <div className="flex items-center gap-0.5 border-b border-black p-1 bg-gray-50">
        <ToolbarButton label="Bold" onClick={() => exec("bold")}>
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton label="Underline" onClick={() => exec("underline")}>
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => exec("insertOrderedList")}>
          1.
        </ToolbarButton>
        <ToolbarButton label="Bullet list" onClick={() => exec("insertUnorderedList")}>
          •
        </ToolbarButton>
        <ToolbarButton label="Insert image" onClick={() => fileInput.current?.click()}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="4" width="18" height="16" rx="1.5" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="M21 15l-5-5-9 9" />
          </svg>
        </ToolbarButton>
        <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
        {uploading && <span className="text-xs text-gray-400 ml-1">Uploading…</span>}
      </div>
      <div
        ref={ref}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className="rich-text min-h-[80px] px-2 py-1.5 text-sm outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400"
      />
    </div>
  );
}
