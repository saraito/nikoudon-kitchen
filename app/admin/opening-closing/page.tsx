"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ChecklistItem } from "@/lib/types";

function List({ type, title }: { type: "opening" | "closing"; title: string }) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newDetail, setNewDetail] = useState("");

  async function load() {
    const { data } = await supabase
      .from("checklist_items")
      .select("*")
      .eq("type", type)
      .order("sort_order", { ascending: true });
    setItems((data as ChecklistItem[]) || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function addItem() {
    if (!newLabel.trim()) return;
    const maxSort = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
    await supabase.from("checklist_items").insert({
      type,
      label: newLabel.trim(),
      detail: newDetail.trim() || null,
      sort_order: maxSort + 1,
    });
    setNewLabel("");
    setNewDetail("");
    load();
  }

  async function updateLabel(id: string, label: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, label } : i)));
  }

  async function saveLabel(id: string, label: string) {
    await supabase.from("checklist_items").update({ label }).eq("id", id);
  }

  async function updateDetail(id: string, detail: string) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, detail } : i)));
  }

  async function saveDetail(id: string, detail: string) {
    await supabase.from("checklist_items").update({ detail: detail.trim() || null }).eq("id", id);
  }

  async function remove(id: string) {
    await supabase.from("checklist_items").delete().eq("id", id);
    load();
  }

  return (
    <div className="mb-8">
      <h2 className="font-medium mb-2">{title}</h2>
      <ul className="flex flex-col gap-3 mb-3">
        {items.map((item) => (
          <li key={item.id} className="flex flex-col gap-1 border border-gray-200 p-2">
            <div className="flex gap-2 items-center">
              <input
                className="border border-black px-2 py-1 text-sm flex-1"
                value={item.label}
                placeholder="作業項目"
                onChange={(e) => updateLabel(item.id, e.target.value)}
                onBlur={(e) => saveLabel(item.id, e.target.value)}
              />
              <button onClick={() => remove(item.id)} className="text-xs text-gray-400 uppercase px-2">
                Delete
              </button>
            </div>
            <textarea
              className="border border-gray-300 px-2 py-1 text-xs text-gray-600"
              value={item.detail ?? ""}
              placeholder="作業内容（任意）"
              rows={2}
              onChange={(e) => updateDetail(item.id, e.target.value)}
              onBlur={(e) => saveDetail(item.id, e.target.value)}
            />
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2 border border-black p-2">
        <input
          className="border border-black px-2 py-1 text-sm"
          placeholder="作業項目（New task）"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <textarea
          className="border border-gray-300 px-2 py-1 text-xs"
          placeholder="作業内容（任意）"
          rows={2}
          value={newDetail}
          onChange={(e) => setNewDetail(e.target.value)}
        />
        <button onClick={addItem} className="bg-black text-white text-sm px-3 py-1.5 self-start">
          Add
        </button>
      </div>
    </div>
  );
}

export default function AdminOpeningClosing() {
  return (
    <div className="p-4">
      <a href="/admin" className="text-xs text-gray-400 uppercase tracking-widest">
        ← Back
      </a>
      <h1 className="text-lg font-medium my-3">Opening / Closing checklists</h1>
      <List type="opening" title="Opening" />
      <List type="closing" title="Closing" />
    </div>
  );
}
