"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { MenuCategory, MenuDish } from "@/lib/types";
import Accordion from "@/components/Accordion";
import MeatballMenu from "@/components/MeatballMenu";
import DishImageBox from "@/components/DishImageBox";
import RichTextEditor from "@/components/RichTextEditor";
import { useEditMode } from "@/components/EditMode";

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

type DishFormT = typeof emptyDish;

function toDishForm(dish: MenuDish): DishFormT {
  return {
    category_id: dish.category_id,
    name: dish.name,
    name_jp: dish.name_jp || "",
    tags: (dish.tags || []).join(", "),
    serving: dish.serving || "",
    prep: dish.prep || "",
    image_path: dish.image_path || "",
  };
}

function DishImage({ path, name }: { path: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!path || failed) {
    return (
      <div className="w-full h-40 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-400 mb-3">
        No photo yet
      </div>
    );
  }
  const src = path.startsWith("http") ? path : `/${path}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="w-full h-40 object-cover border border-black mb-3"
    />
  );
}

function DishForm({
  dishId,
  categories,
  initial,
  lockCategory,
  onSave,
  onCancel,
}: {
  dishId: string;
  categories: MenuCategory[];
  initial: DishFormT;
  lockCategory?: boolean;
  onSave: (v: DishFormT) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof DishFormT, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="border border-black p-3 mb-3 flex flex-col gap-2">
      <DishImageBox
        dishId={dishId}
        value={form.image_path || null}
        alt={form.name || "dish"}
        onChange={(path) => set("image_path", path)}
      />
      {!lockCategory && (
        <select className={inputCls()} value={form.category_id} onChange={(e) => set("category_id", e.target.value)}>
          <option value="">Select category…</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      )}
      <input className={inputCls()} placeholder="Dish name" value={form.name} onChange={(e) => set("name", e.target.value)} autoFocus />
      <input
        className={inputCls()}
        placeholder="Japanese name (optional)"
        value={form.name_jp}
        onChange={(e) => set("name_jp", e.target.value)}
      />
      <input
        className={inputCls()}
        placeholder="Tags, comma separated (vegan, limited…)"
        value={form.tags}
        onChange={(e) => set("tags", e.target.value)}
      />
      <div>
        <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Presentation / serving</div>
        <RichTextEditor
          uploadId={dishId}
          value={form.serving}
          onChange={(html) => set("serving", html)}
          placeholder="Presentation / serving instructions"
        />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Note</div>
        <RichTextEditor
          uploadId={dishId}
          value={form.prep}
          onChange={(html) => set("prep", html)}
          placeholder="Note"
        />
      </div>
      <div className="flex gap-2">
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

function DishView({
  dish,
  editMode,
  onImageChange,
  headerActions,
}: {
  dish: MenuDish;
  editMode: boolean;
  onImageChange: (path: string) => void;
  headerActions?: React.ReactNode;
}) {
  return (
    <Accordion
      headerActions={headerActions}
      title={
        <span>
          {dish.name}
          {dish.name_jp && <span className="text-gray-400 font-normal ml-2">{dish.name_jp}</span>}
        </span>
      }
      subtitle={
        dish.tags?.length ? (
          <span className="flex gap-1 flex-wrap mt-1">
            {dish.tags.map((t) => (
              <span key={t} className="border border-gray-400 text-gray-500 px-1.5 py-0.5 text-[10px] uppercase">
                {t}
              </span>
            ))}
          </span>
        ) : undefined
      }
    >
      <div className="pt-3">
        {editMode ? (
          <DishImageBox dishId={dish.id} value={dish.image_path} alt={dish.name} onChange={onImageChange} />
        ) : (
          <DishImage path={dish.image_path} name={dish.name} />
        )}
        {dish.serving && (
          <div className="mb-3 mt-3">
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Presentation / serving</div>
            <div className="rich-text text-sm" dangerouslySetInnerHTML={{ __html: dish.serving }} />
          </div>
        )}
        {dish.prep && (
          <div className="mb-3 mt-3">
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Note</div>
            <div className="rich-text text-sm" dangerouslySetInnerHTML={{ __html: dish.prep }} />
          </div>
        )}
      </div>
    </Accordion>
  );
}

function CategorySection({
  category,
  dishes,
  categories,
  onAddDish,
  onUpdateDish,
  onSetArchived,
}: {
  category: MenuCategory;
  dishes: MenuDish[];
  categories: MenuCategory[];
  onAddDish: (categoryId: string, form: DishFormT) => void;
  onUpdateDish: (id: string, form: DishFormT) => void;
  onSetArchived: (id: string, value: boolean) => void;
}) {
  const { editMode } = useEditMode();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const active = useMemo(() => dishes.filter((d) => !d.is_archived), [dishes]);
  const archived = useMemo(() => dishes.filter((d) => d.is_archived), [dishes]);

  return (
    <Accordion key={category.id} title={category.name} subtitle={category.note || undefined} defaultOpen={editMode}>
      {active.length === 0 && <p className="text-sm text-gray-500 py-2">No dishes in this category yet.</p>}
      {active.map((dish) =>
        editingId === dish.id ? (
          <DishForm
            key={dish.id}
            dishId={dish.id}
            categories={categories}
            initial={toDishForm(dish)}
            onSave={(form) => {
              onUpdateDish(dish.id, form);
              setEditingId(null);
            }}
            onCancel={() => setEditingId(null)}
          />
        ) : (
          <DishView
            key={dish.id}
            dish={dish}
            editMode={editMode}
            onImageChange={(path) => onUpdateDish(dish.id, { ...toDishForm(dish), image_path: path })}
            headerActions={
              editMode ? (
                <MeatballMenu onEdit={() => setEditingId(dish.id)} onArchive={() => onSetArchived(dish.id, true)} />
              ) : undefined
            }
          />
        )
      )}

      {editMode && (
        <div className="mt-2">
          {adding ? (
            <DishForm
              dishId={`new-${category.id}-${Date.now()}`}
              categories={categories}
              initial={{ ...emptyDish, category_id: category.id }}
              lockCategory
              onSave={(form) => {
                onAddDish(category.id, form);
                setAdding(false);
              }}
              onCancel={() => setAdding(false)}
            />
          ) : (
            <button
              onClick={() => setAdding(true)}
              className="w-full border border-dashed border-black text-sm py-2 text-gray-600"
            >
              + Add dish
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
              {archived.map((dish) => (
                <li key={dish.id} className="flex items-center justify-between py-2 text-sm text-gray-400">
                  <span>{dish.name}</span>
                  <button
                    onClick={() => onSetArchived(dish.id, false)}
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

export default function MenuPage() {
  const { editMode } = useEditMode();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [dishes, setDishes] = useState<MenuDish[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);

  async function load() {
    const [{ data: cats }, { data: dishData }] = await Promise.all([
      supabase.from("menu_categories").select("*").order("sort_order", { ascending: true }),
      supabase.from("menu_dishes").select("*").order("sort_order", { ascending: true }),
    ]);
    setCategories((cats as MenuCategory[]) || []);
    setDishes((dishData as MenuDish[]) || []);
    setLoading(false);
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

  function cleanHtml(html: string) {
    const hasText = html.replace(/<[^>]*>/g, "").trim().length > 0;
    const hasImage = html.includes("<img");
    return hasText || hasImage ? html : null;
  }

  function toDishRow(form: DishFormT) {
    return {
      category_id: form.category_id,
      name: form.name,
      name_jp: form.name_jp || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      serving: cleanHtml(form.serving),
      prep: cleanHtml(form.prep),
      image_path: form.image_path || null,
    };
  }

  async function addDish(categoryId: string, form: DishFormT) {
    const maxSort = dishes.reduce((m, d) => Math.max(m, d.sort_order), 0);
    await supabase
      .from("menu_dishes")
      .insert({ ...toDishRow({ ...form, category_id: categoryId }), sort_order: maxSort + 1 });
    load();
  }

  async function updateDish(id: string, form: DishFormT) {
    const row = toDishRow(form);
    setDishes((prev) => prev.map((d) => (d.id === id ? { ...d, ...row } : d)));
    await supabase.from("menu_dishes").update(row).eq("id", id);
  }

  async function setArchived(id: string, value: boolean) {
    setDishes((prev) => prev.map((d) => (d.id === id ? { ...d, is_archived: value } : d)));
    await supabase.from("menu_dishes").update({ is_archived: value }).eq("id", id);
  }

  async function addCategory() {
    if (!newCatName.trim()) return;
    const maxSort = categories.reduce((m, c) => Math.max(m, c.sort_order), 0);
    await supabase.from("menu_categories").insert({ name: newCatName.trim(), sort_order: maxSort + 1 });
    setNewCatName("");
    setAddingCategory(false);
    load();
  }

  return (
    <div className="p-4">
      <h1 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Eetkaart — Menu</h1>
      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {!loading && categories.length === 0 && !editMode && (
        <p className="text-sm text-gray-500">No menu categories yet.</p>
      )}

      {categories.map((cat) => (
        <CategorySection
          key={cat.id}
          category={cat}
          dishes={dishesByCategory.get(cat.id) || []}
          categories={categories}
          onAddDish={addDish}
          onUpdateDish={updateDish}
          onSetArchived={setArchived}
        />
      ))}

      {editMode && (
        <div className="mt-4">
          {addingCategory ? (
            <div className="flex gap-2 border border-black p-2">
              <input
                className={inputCls()}
                placeholder="New category name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                autoFocus
              />
              <button onClick={addCategory} className="bg-black text-white text-sm px-3">
                Add
              </button>
              <button
                onClick={() => {
                  setAddingCategory(false);
                  setNewCatName("");
                }}
                className="border border-black text-sm px-3"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAddingCategory(true)}
              className="w-full border border-dashed border-black text-sm py-2 text-gray-600"
            >
              + Add category
            </button>
          )}
        </div>
      )}
    </div>
  );
}
