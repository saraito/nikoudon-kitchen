"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(true);
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h1 className="text-lg font-medium mb-4">Staff edit — PIN</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          className="border border-black px-3 py-2"
          autoFocus
        />
        {error && <p className="text-sm text-red-600">Wrong PIN, try again.</p>}
        <button type="submit" className="bg-black text-white py-2">
          Enter
        </button>
      </form>
    </div>
  );
}
