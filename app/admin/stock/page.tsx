"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { StockItem } from "@/lib/types";

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

function inputCls() {
  return "border border-black px-2 py-1 text-sm w-full";
}

function StockForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: typeof emptyForm;
  onSave: (v: typeof emptyForm) => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof emptyForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="border border-black p-3 mb-3 grid grid-cols-2 gap-2">
      <input className={inputCls()} placeholder="Section (e.g. Tempura)" value={form.section} onChange={(e) => set("section", e.target.value)} />
      <input className={inputCls()} placeholder="Item name" value={form.name} onChange={(e) => set("name", e.target.value)} />

      <div className="col-span-2 text-[10px] uppercase tracking-widest text-gray-400 mt-1">Upstairs</div>
      <input className={inputCls()} placeholder="Par WD" value={form.gf_par_wd} onChange={(e) => set("gf_par_wd", e.target.value)} />
      <input className={inputCls()} placeholder="Par WE" value={form.gf_par_we} onChange={(e) => set("gf_par_we", e.target.value)} />
      <input className={inputCls() + " col-span-2"} placeholder="Unit (box/bottle/pack…)" value={form.gf_unit} onChange={(e) => set("gf_unit", e.target.value)} />

      <div className="col-span-2 text-[10px] uppercase tracking-widest text-gray-400 mt-1">Downstairs walk-in</div>
      <input className={inputCls()} placeholder="Par WD" value={form.bw_par_wd} onChange={(e) => set("bw_par_wd", e.target.value)} />
      <input className={inputCls()} placeholder="Par WE" value={form.bw_par_we} onChange={(e) => set("bw_par_we", e.target.value)} />
      <input className={inputCls() + " col-span-2"} placeholder="Unit" value={form.bw_unit} onChange={(e) => set("bw_unit", e.target.value)} />

      <div className="col-span-2 text-[10px] uppercase tracking-widest text-gray-400 mt-1">Defrost needed</div>
      <input className={inputCls()} placeholder="Par WD" value={form.bd_par_wd} onChange={(e) => set("bd_par_wd", e.target.value)} />
      <input className={inputCls()} placeholder="Par WE" value={form.bd_par_we} onChange={(e) => set("bd_par_we", e.target.value)} />
      <input className={inputCls() + " col-span-2"} placeholder="Unit" value={form.bd_unit} onChange={(e) => set("bd_unit", e.target.value)} />

      <input className={inputCls()} placeholder="Closing options e.g. prep/fill/unsure" value={form.closing_options} onChange={(e) => set("closing_options", e.target.value)} />
      <input className={inputCls()} placeholder="Note" value={form.note} onChange={(e) => set("note", e.target.value)} />

      <div className="col-span-2 flex gap-2 mt-1">
        <button onClick={() => onSave(form)} className="bg-black text-white text-sm px-3 py-1">Save</button>
        {onCancel && (
          <button onClick={onCancel} className="text-sm px-3 py-1 border border-black">Cancel</button>
        )}
      </div>
    </div>
  );
}

export default function AdminStock() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);

  async function load() {
    const { data } = await supabase.from("stock_items").select("*").order("sort_order", { ascending: true });
    setItems((data as StockItem[]) || []);
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

  async function createItem(form: typeof emptyForm) {
    const maxSort = items.reduce((m, i) => Math.max(m, i.sort_order), 0);
    await supabase.from("stock_items").insert({ ...form, sort_order: maxSort + 1, closing_status: "" });
    setAdding(false);
    load();
  }

  async function updateItem(id: string, form: typeof emptyForm) {
    await supabase.from("stock_items").update(form).eq("id", id);
    setEditingId(null);
    load();
  }

  async function remove(id: string) {
    await supabase.from("stock_items").delete().eq("id", id);
    load();
  }

  return (
    <div className="p-4">
      <a href="/admin" className="text-xs text-gray-400 uppercase tracking-widest">← Back</a>
      <h1 className="text-lg font-medium my-3">Stock check list</h1>

      {adding ? (
        <StockForm initial={emptyForm} onSave={createItem} onCancel={() => setAdding(false)} />
      ) : (
        <button onClick={() => setAdding(true)} className="bg-black text-white text-sm px-3 py-1.5 mb-4">
          + Add stock item
        </button>
      )}

      {sections.map(([section, sectionItems]) => (
        <div key={section} className="mb-6">
          <h2 className="font-medium mb-2">{section}</h2>
          {sectionItems.map((item) =>
            editingId === item.id ? (
              <StockForm
                key={item.id}
                initial={{ ...emptyForm, ...item } as any}
                onSave={(form) => updateItem(item.id, form)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div key={item.id} className="flex items-center justify-between border-b border-gray-200 py-2">
                <span>{item.name}</span>
                <span className="flex gap-3 text-xs uppercase tracking-widest text-gray-400">
                  <button onClick={() => setEditingId(item.id)}>Edit</button>
                  <button onClick={() => remove(item.id)}>Delete</button>
                </span>
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
