"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ChecklistItem } from "@/lib/types";
import Accordion from "@/components/Accordion";

function Checklist({ type, title }: { type: "opening" | "closing"; title: string }) {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("checklist_items")
      .select("*")
      .eq("type", type)
      .order("sort_order", { ascending: true });
    setItems((data as ChecklistItem[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function toggle(item: ChecklistItem) {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, is_checked: !i.is_checked } : i))
    );
    await supabase
      .from("checklist_items")
      .update({ is_checked: !item.is_checked })
      .eq("id", item.id);
  }

  async function resetAll() {
    setItems((prev) => prev.map((i) => ({ ...i, is_checked: false })));
    await supabase.from("checklist_items").update({ is_checked: false }).eq("type", type);
  }

  const doneCount = items.filter((i) => i.is_checked).length;

  return (
    <Accordion
      title={title}
      subtitle={loading ? "Loading…" : `${doneCount} / ${items.length} done`}
    >
      {items.length === 0 && !loading && (
        <p className="text-sm text-gray-500 py-2">No items yet. Add some in Staff Edit.</p>
      )}
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-2">
            <input
              type="checkbox"
              checked={item.is_checked}
              onChange={() => toggle(item)}
              className="h-5 w-5 accent-black shrink-0"
            />
            <span className={item.is_checked ? "line-through text-gray-400" : ""}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
      {items.length > 0 && (
        <button
          onClick={resetAll}
          className="mt-3 text-xs uppercase tracking-wide border border-black px-3 py-1.5"
        >
          Reset all
        </button>
      )}
    </Accordion>
  );
}

export default function OpeningClosingPage() {
  return (
    <div className="p-4">
      <Checklist type="opening" title="Opening" />
      <Checklist type="closing" title="Closing" />
    </div>
  );
}
