"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { StockItem } from "@/lib/types";
import Accordion from "@/components/Accordion";
import MeatballMenu from "@/components/MeatballMenu";
import { useEditMode } from "@/components/EditMode";
import { useDragReorder, DragHandleProps } from "@/components/useDragReorder";

function isWeekend(day: number) {
  // WE = Thursday(4), Friday(5), Saturday(6). WD = Sunday(0)-Wednesday(3).
  return day === 4 || day === 5 || day === 6;
}

const emptyForm = {
  section: "",
  name: "",
  gf_par_wd: "",
  gf_par_we: "",
  gf_unit: "",
  bw_par_wd: "",
  bw_par_we: "",
  bw_unit: "",
  bd_par_wd: "",
  bd_par_we: "",
  bd_unit: "",
  closing_options: "prep/fill/unsure",
  note: "",
};

type FormT = typeof emptyForm;

function toForm(item: StockItem): FormT {
  return {
    section: item.section,
    name: item.name,
    gf_par_wd: item.gf_par_wd ?? "",
    gf_par_we: item.gf_par_we ?? "",
    gf_unit: item.gf_unit ?? "",
    bw_par_wd: item.bw_par_wd ?? "",
    bw_par_we: item.bw_par_we ?? "",
    bw_unit: item.bw_unit ?? "",
    bd_par_wd: item.bd_par_wd ?? "",
    bd_par_we: item.bd_par_we ?? "",
    bd_unit: item.bd_unit ?? "",
    closing_options: item.closing_options,
    note: item.note ?? "",
  };
}

function inputCls() {
  return "border border-black px-2 py-1 text-sm w-full";
}

function DragHandle(props: DragHandleProps) {
  return (
    <button
      {...props}
      type="button"
      aria-label="Drag to reorder"
      className="w-8 h-8 -ml-1 -mt-1 flex items-center justify-center text-gray-400 cursor-grab active:cursor-grabbing shrink-0"
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

function StockForm({
  initial,
  lockSection,
  onSave,
  onCancel,
}: {
  initial: FormT;
  lockSection?: boolean;
  onSave: (v: FormT) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof FormT, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="border border-black p-3 mb-3 grid grid-cols-2 gap-2">
      {!lockSection && (
        <input
          className={inputCls() + " col-span-2"}
          placeholder="Section (e.g. Tempura)"
          value={form.section}
          onChange={(e) => set("section", e.target.value)}
        />
      )}
      <input
        className={inputCls() + " col-span-2"}
        placeholder="Item name"
        value={form.name}
        onChange={(e) => set("name", e.target.value)}
        autoFocus
      />

      <div className="col-span-2 text-[10px] uppercase tracking-widest text-gray-400 mt-1">Upstairs</div>
      <input className={inputCls()} placeholder="Par WD" value={form.gf_par_wd} onChange={(e) => set("gf_par_wd", e.target.value)} />
      <input className={inputCls()} placeholder="Par WE" value={form.gf_par_we} onChange={(e) => set("gf_par_we", e.target.value)} />
      <input
        className={inputCls() + " col-span-2"}
        placeholder="Unit (box/bottle/pack…)"
        value={form.gf_unit}
        onChange={(e) => set("gf_unit", e.target.value)}
      />

      <div className="col-span-2 text-[10px] uppercase tracking-widest text-gray-400 mt-1">Downstairs walk-in</div>
      <input className={inputCls()} placeholder="Par WD" value={form.bw_par_wd} onChange={(e) => set("bw_par_wd", e.target.value)} />
      <input className={inputCls()} placeholder="Par WE" value={form.bw_par_we} onChange={(e) => set("bw_par_we", e.target.value)} />
      <input className={inputCls() + " col-span-2"} placeholder="Unit" value={form.bw_unit} onChange={(e) => set("bw_unit", e.target.value)} />

      <div className="col-span-2 text-[10px] uppercase tracking-widest text-gray-400 mt-1">Defrost needed</div>
      <input className={inputCls()} placeholder="Par WD" value={form.bd_par_wd} onChange={(e) => set("bd_par_wd", e.target.value)} />
      <input className={inputCls()} placeholder="Par WE" value={form.bd_par_we} onChange={(e) => set("bd_par_we", e.target.value)} />
      <input className={inputCls() + " col-span-2"} placeholder="Unit" value={form.bd_unit} onChange={(e) => set("bd_unit", e.target.value)} />

      <input
        className={inputCls()}
        placeholder="Closing options e.g. prep/fill/unsure"
        value={form.closing_options}
        onChange={(e) => set("closing_options", e.target.value)}
      />
      <input className={inputCls()} placeholder="Note" value={form.note} onChange={(e) => set("note", e.target.value)} />

      <div className="col-span-2 flex gap-2 mt-1">
        <button onClick={() => onSave(form)} className="bg-black text-white text-sm px-3 py-1">
          Save
        </button>
        <button onClick={onCancel} className="text-sm px-3 py-1 border border-black">
          Cancel
        </button>
      </div>
    </div>
  );
}

function ParCell({
  label,
  wd,
  we,
  unit,
  todayIsWE,
}: {
  label: string;
  wd: string | null;
  we: string | null;
  unit: string | null;
  todayIsWE: boolean;
}) {
  if (!wd && !we && !unit) {
    return (
      <div className="text-xs text-gray-300">
        <div className="uppercase tracking-wide text-gray-400 mb-0.5">{label}</div>—
      </div>
    );
  }
  return (
    <div className="text-xs">
      <div className="uppercase tracking-wide text-gray-400 mb-0.5">{label}</div>
      <div className="flex gap-2">
        <span className={!todayIsWE && wd ? "font-semibold text-black" : "text-gray-400"}>WD {wd || "–"}</span>
        <span className={todayIsWE && we ? "font-semibold text-black" : "text-gray-400"}>WE {we || "–"}</span>
      </div>
      {unit && <div className="text-gray-500">{unit}</div>}
    </div>
  );
}

function StockRow({
  item,
  todayIsWE,
  editMode,
  dragHandleProps,
  itemRef,
  dragging,
  onEdit,
  onArchive,
}: {
  item: StockItem;
  todayIsWE: boolean;
  editMode: boolean;
  dragHandleProps: DragHandleProps;
  itemRef: (el: HTMLElement | null) => void;
  dragging: boolean;
  onEdit: () => void;
  onArchive: () => void;
}) {
  const [status, setStatus] = useState(item.closing_status || "");
  const options = item.closing_options ? item.closing_options.split("/").map((s) => s.trim()) : [];

  async function updateStatus(value: string) {
    setStatus(value);
    await supabase.from("stock_items").update({ closing_status: value }).eq("id", item.id);
  }

  return (
    <li ref={itemRef} className={`py-3 border-b border-gray-200 last:border-b-0 ${dragging ? "opacity-50" : ""}`}>
      <div className="flex items-start gap-1">
        {editMode && <DragHandle {...dragHandleProps} />}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <span className="font-medium">{item.name}</span>
            <div className="flex items-center gap-2 shrink-0">
              {options.length > 0 && (
                <select
                  value={status}
                  onChange={(e) => updateStatus(e.target.value)}
                  className="border border-black text-xs px-1 py-1"
                >
                  <option value="">—</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
              {editMode && <MeatballMenu onEdit={onEdit} onArchive={onArchive} />}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <ParCell label="Upstairs" wd={item.gf_par_wd} we={item.gf_par_we} unit={item.gf_unit} todayIsWE={todayIsWE} />
            <ParCell label="Downstairs walk-in" wd={item.bw_par_wd} we={item.bw_par_we} unit={item.bw_unit} todayIsWE={todayIsWE} />
            <ParCell label="Defrost needed" wd={item.bd_par_wd} we={item.bd_par_we} unit={item.bd_unit} todayIsWE={todayIsWE} />
          </div>
          {item.note && <p className="text-xs text-gray-500 italic mt-2">{item.note}</p>}
        </div>
      </div>
    </li>
  );
}

function Section({
  section,
  items,
  todayIsWE,
  onAddItem,
  onUpdateItem,
  onSetArchived,
  onReorder,
}: {
  section: string;
  items: StockItem[];
  todayIsWE: boolean;
  onAddItem: (section: string, form: FormT) => void;
  onUpdateItem: (id: string, form: FormT) => void;
  onSetArchived: (id: string, value: boolean) => void;
  onReorder: (reordered: StockItem[]) => void;
}) {
  const { editMode } = useEditMode();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const active = useMemo(() => items.filter((i) => !i.is_archived), [items]);
  const archived = useMemo(() => items.filter((i) => i.is_archived), [items]);

  const { order, draggingId, setItemRef, getHandleProps } = useDragReorder(active, onReorder);

  return (
    <Accordion key={section} title={section} subtitle={`${active.length} items`} defaultOpen={editMode}>
      <ul>
        {order.map((item) =>
          editingId === item.id ? (
            <li key={item.id} className="py-2">
              <StockForm initial={toForm(item)} onSave={(form) => { onUpdateItem(item.id, form); setEditingId(null); }} onCancel={() => setEditingId(null)} />
            </li>
          ) : (
            <StockRow
              key={item.id}
              item={item}
              todayIsWE={todayIsWE}
              editMode={editMode}
              dragHandleProps={getHandleProps(item.id)}
              itemRef={(el) => setItemRef(item.id, el)}
              dragging={draggingId === item.id}
              onEdit={() => setEditingId(item.id)}
              onArchive={() => onSetArchived(item.id, true)}
            />
          )
        )}
      </ul>

      {editMode && (
        <div className="mt-3">
          {adding ? (
            <StockForm
              initial={{ ...emptyForm, section }}
              lockSection
              onSave={(form) => { onAddItem(section, form); setAdding(false); }}
              onCancel={() => setAdding(false)}
            />
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full border border-dashed border-black text-sm py-2 text-gray-600"
            >
              + Add item
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
                  <span>{item.name}</span>
                  <button
                    onClick={() => onSetArchived(item.id, false)}
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
    </Accordion>
  );
}

export default function StockPage() {
  const { editMode } = useEditMode();
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingSection, setAddingSection] = useState(false);
  const todayIsWE = useMemo(() => isWeekend(new Date().getDay()), []);
  const todayLabel = useMemo(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const day = d.toLocaleDateString("en-US", { weekday: "short" });
    return `${dd}/${mo} (${day})`;
  }, []);

  async function load() {
    const { data } = await supabase.from("stock_items").select("*").order("sort_order", { ascending: true });
    setItems((data as StockItem[]) || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const sections = useMemo(() => {
    const map = new Map<string, StockItem[]>();
    for (const i of items) {
      if (!map.has(i.section)) map.set(i.section, []);
      map.get(i.section)!.push(i);
    }
    return Array.from(map.entries());
  }, [items]);

  function toRow(form: FormT) {
    return {
      section: form.section,
      name: form.name,
      gf_par_wd: form.gf_par_wd || null,
      gf_par_we: form.gf_par_we || null,
      gf_unit: form.gf_unit || null,
      bw_par_wd: form.bw_par_wd || null,
      bw_par_we: form.bw_par_we || null,
      bw_unit: form.bw_unit || null,
      bd_par_wd: form.bd_par_wd || null,
      bd_par_we: form.bd_par_we || null,
      bd_unit: form.bd_unit || null,
      closing_options: form.closing_options,
      note: form.note || null,
    };
  }

  async function addItem(section: string, form: FormT) {
    const maxSort = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
    await supabase.from("stock_items").insert({ ...toRow({ ...form, section }), sort_order: maxSort + 1, closing_status: "" });
    load();
  }

  async function updateItem(id: string, form: FormT) {
    await supabase.from("stock_items").update(toRow(form)).eq("id", id);
    load();
  }

  async function setArchived(id: string, value: boolean) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, is_archived: value } : i)));
    await supabase.from("stock_items").update({ is_archived: value }).eq("id", id);
  }

  async function reorderSection(sectionItems: StockItem[], reordered: StockItem[]) {
    const sortValues = sectionItems.filter((i) => !i.is_archived).map((i) => i.sort_order).sort((a, b) => a - b);
    const updates = reordered.map((item, idx) => ({ id: item.id, sort_order: sortValues[idx] }));
    setItems((prev) => {
      const map = new Map(updates.map((u) => [u.id, u.sort_order]));
      return prev
        .map((i) => (map.has(i.id) ? { ...i, sort_order: map.get(i.id)! } : i))
        .sort((a, b) => a.sort_order - b.sort_order);
    });
    await Promise.all(updates.map((u) => supabase.from("stock_items").update({ sort_order: u.sort_order }).eq("id", u.id)));
  }

  return (
    <div className="p-4">
      <div className="mb-3">
        <div className="text-2xl font-bold tracking-tight">{todayLabel}</div>
        <span className="inline-block mt-1 bg-gray-100 text-gray-500 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded">
          {todayIsWE ? "Thu–Sat prep day" : "Sunday/weekdays prep day"}
        </span>
      </div>
      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {!loading && sections.length === 0 && !editMode && (
        <p className="text-sm text-gray-500">No stock items yet.</p>
      )}

      {sections.map(([section, sectionItems]) => (
        <Section
          key={section}
          section={section}
          items={sectionItems}
          todayIsWE={todayIsWE}
          onAddItem={addItem}
          onUpdateItem={updateItem}
          onSetArchived={setArchived}
          onReorder={(reordered) => reorderSection(sectionItems, reordered)}
        />
      ))}

      {editMode && (
        <div className="mt-4">
          {addingSection ? (
            <StockForm
              initial={emptyForm}
              onSave={(form) => { addItem(form.section, form); setAddingSection(false); }}
              onCancel={() => setAddingSection(false)}
            />
          ) : (
            <button
              onClick={() => setAddingSection(true)}
              className="w-full border border-dashed border-black text-sm py-2 text-gray-600"
            >
              + Add new section
            </button>
          )}
        </div>
      )}
    </div>
  );
}
