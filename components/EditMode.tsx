"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Ctx = {
  editMode: boolean;
  requestEditMode: () => void;
  exitEditMode: () => void;
};

const EditModeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "niko_edit_mode";

export function EditModeProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditMode] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setEditMode(true);
  }, []);

  function requestEditMode() {
    setError(false);
    setPin("");
    setShowPinModal(true);
  }

  function exitEditMode() {
    setEditMode(false);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  async function submitPin(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(false);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pin }),
    });
    setChecking(false);
    if (res.ok) {
      setEditMode(true);
      sessionStorage.setItem(STORAGE_KEY, "1");
      setShowPinModal(false);
    } else {
      setError(true);
    }
  }

  return (
    <EditModeContext.Provider value={{ editMode, requestEditMode, exitEditMode }}>
      {children}
      {showPinModal && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPinModal(false)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={submitPin}
            className="bg-white border border-black p-5 w-full max-w-xs flex flex-col gap-3"
          >
            <h2 className="font-medium">Enter staff PIN to edit</h2>
            <input
              type="password"
              inputMode="numeric"
              autoFocus
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="border border-black px-3 py-2"
              placeholder="PIN"
            />
            {error && <p className="text-sm text-red-600">Wrong PIN, try again.</p>}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={checking}
                className="bg-black text-white py-2 px-4 flex-1 disabled:opacity-50"
              >
                {checking ? "Checking…" : "Unlock editing"}
              </button>
              <button
                type="button"
                onClick={() => setShowPinModal(false)}
                className="border border-black py-2 px-4"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </EditModeContext.Provider>
  );
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider");
  return ctx;
}

export function EditModeToggle() {
  const { editMode, requestEditMode, exitEditMode } = useEditMode();
  return (
    <button
      onClick={editMode ? exitEditMode : requestEditMode}
      className={`text-[11px] uppercase tracking-widest px-2 py-1 border ${
        editMode ? "bg-black text-white border-black" : "text-gray-400 border-gray-300"
      }`}
    >
      {editMode ? "Done editing" : "Edit"}
    </button>
  );
}
