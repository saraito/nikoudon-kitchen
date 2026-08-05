"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { MenuCategory, MenuDish } from "@/lib/types";

function inputCls() {
  return "border border-black px-2 py-1 text-sm w-full";
}

const emptyDish = {
  category_id: "",
  name: "",
  name_jp: "",
  tags: "",
  serving: "",
  prep: "",
  image_path: "",
};

function DishForm({
  categories,
  initial,
  onSave,
  onCancel,
}: {
  categories: MenuCategory[];
  initial: typeof emptyDish;
  onSave: (v: typeof emptyDish) => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof typeof emptyDish, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="border border-black p-3 mb-3 flex flex-col gap-2">
      <select className={inputCls()} value={form.category_id} onChange={(e) => set("category_id", e.target.value)}>
        <option value="">Select category…</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <input className={inputCls()} placeholder="Dish name" value={form.name} onChange={(e) => set("name", e.target.value)} />
      <input className={inputCls()} placeholder="Japanese name (optional)" value={form.name_jp} onChange={(e) => set("name_jp", e.target.value)} />
      <input className={inputCls()} placeholder="Tags, comma separated (vegan, limited…)" value={form.tags} onChange={(e) => set("tags", e.target.value)} />
      <textarea className={inputCls()} placeholder="Presentation / serving instructions" value={form.serving} onChange={(e) => set("serving", e.target.value)} rows={2} />
      <textarea className={inputCls()} placeholder="Prep instructions" value={form.prep} onChange={(e) => set("prep", e.target.value)} rows={2} />
      <input className={inputCls()} placeholder="Image path, e.g. images/dishes/oysters.jpg" value={form.image_path} onChange={(e) => set("image_path", e.target.value)} />
      <div className="flex gap-2">
        <button onClick={() => onSave(form)} className="bg-black text-white text-sm px-3 py-1">Save</button>
        {onCancel && <button onClick={onCancel} className="text-sm px-3 py-1 border border-black">Cancel</button>}
      </div>
    </div>
  );
}

export default function AdminMenu() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [dishes, setDishes] = useState<MenuDish[]>([]);
  const [newCatName, setNewCatName] = useState("");
  const [addingDish, setAddingDish] = useState(false);
  const [editingDishId, setEditingDishId] = useState<string | null>(null);

  async function load() {
    const [{ data: cats }, { data: dishData }] = await Promise.all([
      supabase.from("menu_categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("menu_dishes").select("*").order("sort_order", { ascending: true }),
    ]);
    setCategories((cats as MenuCategory[]) || []);
    setDishes((dishData as MenuDish[]) || []);
  }

  useEffect(() => {
    load();
  }, []);

  const dishesByCategory = useMemo(() => {
    const map = new Map<string, MenuDish[]>();
    for (const d of dishes) {
      if (!map.has(d.category_id)) map.set(d.category_id, []);
      map.get(d.category_id)!.push(d);
    }
    return map;
  }, [dishes]);

  async function addCategory() {
    if (!newCatName.trim()) return;
    const maxSort = categories.reduce((m, c) => Math.max(m, c.sort_order), 0);
    await supabase.from("menu_categories").insert({ name: newCatName.trim(), sort_order: maxSort + 1 });
    setNewCatName("");
    load();
  }

  async function removeCategory(id: string) {
    await supabase.from("menu_categories").delete().eq("id", id);
    load();
  }

  function toDishRow(form: typeof emptyDish) {
    return {
      category_id: form.category_id,
      name: form.name,
      name_jp: form.name_jp || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      serving: form.serving || null,
      prep: form.prep || null,
      image_path: form.image_path || null,
    };
  }

  async function createDish(form: typeof emptyDish) {
    const maxSort = dishes.reduce((m, d) => Math.max(m, d.sort_order), 0);
    await supabase.from("menu_dishes").insert({ ...toDishRow(form), sort_order: maxSort + 1 });
    setAddingDish(false);
    load();
  }

  async function updateDish(id: string, form: typeof emptyDish) {
    await supabase.from("menu_dishes").update(toDishRow(form)).eq("id", id);
    setEditingDishId(null);
    load();
  }

  async function removeDish(id: string) {
    await supabase.from("menu_dishes").delete().eq("id", id);
    load();
  }

  return (
    <div className="p-4">
      <a href="/admin" className="text-xs text-gray-400 uppercase tracking-widest">← Back</a>
      <h1 className="text-lg font-medium my-3">Menu</h1>

      <div className="mb-6">
        <h2 className="font-medium mb-2">Categories</h2>
        <ul className="mb-2">
          {categories.map((c) => (
            <li key={c.id} className="flex items-center justify-between border-b border-gray-200 py-1.5">
              <span>{c.name}</span>
              <button onClick={() => removeCategory(c.id)} className="text-xs text-gray-400 uppercase">Delete</button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <input className={inputCls()} placeholder="New category name" value={newCatName} onChange={(e) => setNewCatName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCategory()} />
          <button onClick={addCategory} className="bg-black text-white text-sm px-3">Add</button>
        </div>
      </div>

      <div>
        <h2 className="font-medium mb-2">Dishes</h2>
        {addingDish ? (
          <DishForm categories={categories} initial={emptyDish} onSave={createDish} onCancel={() => setAddingDish(false)} />
        ) : (
          <button onClick={() => setAddingDish(true)} className="bg-black text-white text-sm px-3 py-1.5 mb-4">
            + Add dish
          </button>
        )}

        {categories.map((cat) => (
          <div key={cat.id} className="mb-4">
            <h3 className="text-sm uppercase tracking-wide text-gray-400 mb-1">{cat.name}</h3>
            {(dishesByCategory.get(cat.id) || []).map((dish) =>
              editingDishId === dish.id ? (
                <DishForm
                  key={dish.id}
                  categories={categories}
                  initial={{
                    category_id: dish.category_id,
                    name: dish.name,
                    name_jp: dish.name_jp || "",
                    tags: (dish.tags || []).join(", "),
                    serving: dish.serving || "",
                    prep: dish.prep || "",
                    image_path: dish.image_path || "",
                  }}
                  onSave={(form) => updateDish(dish.id, form)}
                  onCancel={() => setEditingDishId(null)}
                />
              ) : (
                <div key={dish.id} className="flex items-center justify-between border-b border-gray-200 py-1.5">
                  <span>{dish.name}</span>
                  <span className="flex gap-3 text-xs uppercase tracking-widest text-gray-400">
                    <button onClick={() => setEditingDishId(dish.id)}>Edit</button>
                    <button onClick={() => removeDish(dish.id)}>Delete</button>
                  </span>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
