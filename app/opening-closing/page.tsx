"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ChecklistItem } from "@/lib/types";
import Accordion from "@/components/Accordion";
import MeatballMenu from "@/components/MeatballMenu";
import { useEditMode } from "@/components/EditMode";
import { useDragReorder, DragHandleProps } from "@/components/useDragReorder";

function DragHandle(props: DragHandleProps) {
  return (
    <button
      {...props}
      type="button"
      aria-label="Drag to reorder"
      className="w-8 h-8 -ml-1 flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing shrink-0"
    >
      <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
        <circle cx="3" cy="3" r="1.3" />
        <circle cx="9" cy="3" r="1.3" />
        <circle cx="3" cy="8" r="1.3" />
        <circle cx="9" cy="8" r="1.3" />
        <circle cx="3" cy="13" r="1.3" />
        <circle cx="9" cy="13" r="1.3" />
      </svg>
    </button>
  );
}

function EditForm({
  item,
  onSave,
  onCancel,
}: {
  item: ChecklistItem;
  onSave: (label: string, detail: string) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(item.label);
  const [detail, setDetail] = useState(item.detail ?? "");
  return (
    <div className="flex flex-col gap-2 border border-black p-2 flex-1">
      <input
        className="border border-black px-2 py-1 text-sm"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="作業項目"
        autoFocus
      />
      <textarea
        className="border border-gray-300 px-2 py-1 text-xs"
        rows={2}
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        placeholder="作業内容（任意）"
      />
      <div className="flex gap-2">
        <button onClick={() => onSave(label, detail)} className="bg-black text-white text-xs px-3 py-1.5">
          Save
        </button>
        <button onClick={onCancel} className="border border-black text-xs px-3 py-1.5">
          Cancel
        </button>
      </div>
    </div>
  );
}

function List({ type, title }: { type: "opening" | "closing"; title: string }) {
  const { editMode } = useEditMode();
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  async function load() {
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

  const active = useMemo(() => items.filter((i) => !i.is_archived), [items]);
  const archived = useMemo(() => items.filter((i) => i.is_archived), [items]);

  const { order, draggingId, setItemRef, getHandleProps } = useDragReorder(active, async (reordered) => {
    const sortValues = active.map((i) => i.sort_order).sort((a, b) => a - b);
    const updates = reordered.map((item, idx) => ({ id: item.id, sort_order: sortValues[idx] }));
    setItems((prev) => {
      const map = new Map(updates.map((u) => [u.id, u.sort_order]));
      return prev
        .map((i) => (map.has(i.id) ? { ...i, sort_order: map.get(i.id)! } : i))
        .sort((a, b) => a.sort_order - b.sort_order);
    });
    await Promise.all(
      updates.map((u) => supabase.from("checklist_items").update({ sort_order: u.sort_order }).eq("id", u.id))
    );
  });

  async function toggle(item: ChecklistItem) {
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, is_checked: !i.is_checked } : i)));
    await supabase.from("checklist_items").update({ is_checked: !item.is_checked }).eq("id", item.id);
  }

  async function resetAll() {
    setItems((prev) => prev.map((i) => ({ ...i, is_checked: false })));
    await supabase.from("checklist_items").update({ is_checked: false }).eq("type", type);
  }

  async function saveEdit(id: string, label: string, detail: string) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, label, detail: detail.trim() || null } : i))
    );
    await supabase.from("checklist_items").update({ label, detail: detail.trim() || null }).eq("id", id);
    setEditingId(null);
  }

  async function setArchived(id: string, value: boolean) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, is_archived: value } : i)));
    await supabase.from("checklist_items").update({ is_archived: value }).eq("id", id);
  }

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
    setAdding(false);
    load();
  }

  const doneCount = active.filter((i) => i.is_checked).length;

  return (
    <Accordion title={title} subtitle={loading ? "Loading…" : `${doneCount} / ${active.length} done`} defaultOpen={editMode}>
      {active.length === 0 && !loading && <p className="text-sm text-gray-500 py-2">No items yet.</p>}
      <ul className="divide-y divide-gray-200">
        {order.map((item) =>
          editingId === item.id ? (
            <li key={item.id} className="py-2">
              <EditForm
                item={item}
                onSave={(label, detail) => saveEdit(item.id, label, detail)}
                onCancel={() => setEditingId(null)}
              />
            </li>
          ) : (
            <li
              key={item.id}
              ref={(el) => setItemRef(item.id, el)}
              className={`flex items-start gap-2 py-2 ${draggingId === item.id ? "opacity-50" : ""}`}
            >
              {editMode && <DragHandle {...getHandleProps(item.id)} />}
              <input
                type="checkbox"
                checked={item.is_checked}
                onChange={() => toggle(item)}
                className="h-5 w-5 accent-black shrink-0 mt-0.5"
              />
              <span className="flex-1">
                <span className={item.is_checked ? "line-through text-gray-400" : ""}>{item.label}</span>
                {item.detail && (
                  <span
                    className={`block text-xs whitespace-pre-line mt-0.5 ${
                      item.is_checked ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {item.detail}
                  </span>
                )}
              </span>
              {editMode && (
                <MeatballMenu onEdit={() => setEditingId(item.id)} onArchive={() => setArchived(item.id, true)} />
              )}
            </li>
          )
        )}
      </ul>

      {editMode && (
        <div className="mt-3">
          {adding ? (
            <div className="flex flex-col gap-2 border border-black p-2">
              <input
                className="border border-black px-2 py-1 text-sm"
                placeholder="作業項目（New task）"
                value={newLabel}
                onChange={(e) => setNewLabel(e.target.value)}
                autoFocus
              />
              <textarea
                className="border border-gray-300 px-2 py-1 text-xs"
                rows={2}
                placeholder="作業内容（任意）"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
              />
              <div className="flex gap-2">
                <button onClick={addItem} className="bg-black text-white text-xs px-3 py-1.5">
                  Add
                </button>
                <button
                  onClick={() => {
                    setAdding(false);
                    setNewLabel("");
                    setNewDetail("");
                  }}
                  className="border border-black text-xs px-3 py-1.5"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full border border-dashed border-black text-sm py-2 text-gray-600"
            >
              + Add task
            </button>
          )}
        </div>
      )}

      {editMode && archived.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowArchived((s) => !s)}
            className="text-xs uppercase tracking-widest text-gray-400"
          >
            {showArchived ? "Hide" : "Show"} archived ({archived.length})
          </button>
          {showArchived && (
            <ul className="mt-2 divide-y divide-gray-200">
              {archived.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-2 text-sm text-gray-400">
                  <span>{item.label}</span>
                  <button
                    onClick={() => setArchived(item.id, false)}
                    className="text-xs uppercase text-gray-500 underline"
                  >
                    Unarchive
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {active.length > 0 && (
        <button onClick={resetAll} className="mt-3 text-xs uppercase tracking-wide border border-black px-3 py-1.5">
          Reset all
        </button>
      )}
    </Accordion>
  );
}

export default function OpeningClosingPage() {
  return (
    <div className="p-4">
      <List type="opening" title="Opening" />
      <List type="closing" title="Closing" />
    </div>
  );
}
