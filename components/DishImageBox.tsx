"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function resolveSrc(path: string) {
  return path.startsWith("http") ? path : `/${path}`;
}

export default function DishImageBox({
  dishId,
  value,
  alt,
  onChange,
}: {
  dishId: string;
  value: string | null;
  alt: string;
  onChange: (newPath: string) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${dishId}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("dish-images")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (uploadError) {
      setError("Upload failed — try again");
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("dish-images").getPublicUrl(path);
    setFailed(false);
    onChange(data.publicUrl);
    setUploading(false);
  }

  const hasImage = !!value && !failed;

  return (
    <div className="relative w-full h-40 mb-1">
      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      {hasImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resolveSrc(value!)}
            alt={alt}
            onError={() => setFailed(true)}
            className="w-full h-40 object-cover border border-black"
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            aria-label="Replace photo"
            className="absolute top-1.5 right-1.5 w-8 h-8 bg-white border border-black flex items-center justify-center"
          >
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="black" strokeWidth="1.5">
              <path d="M14.5 2.5a1.7 1.7 0 0 1 2.4 2.4L6 15.8l-3 1 1-3L14.5 2.5Z" />
            </svg>
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          className="w-full h-40 bg-gray-100 border border-gray-300 flex items-center justify-center"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
            <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {uploading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs text-gray-600">
          Uploading…
        </div>
      )}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
