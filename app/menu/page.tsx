"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { MenuCategory, MenuDish } from "@/lib/types";
import Accordion from "@/components/Accordion";

function DishImage({ path, name }: { path: string | null; name: string }) {
  const [failed, setFailed] = useState(false);
  if (!path || failed) {
    return (
      <div className="w-full h-40 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs text-gray-400 mb-3">
        No photo yet — add one at /public/{path || "images/dishes/…"}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/${path}`}
      alt={name}
      onError={() => setFailed(true)}
      className="w-full h-40 object-cover border border-black mb-3"
    />
  );
}

function DishRow({ dish }: { dish: MenuDish }) {
  return (
    <Accordion
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
        <DishImage path={dish.image_path} name={dish.name} />
        {dish.serving && (
          <div className="mb-3">
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Presentation / serving</div>
            <p className="text-sm">{dish.serving}</p>
          </div>
        )}
        {dish.prep && (
          <Accordion title="Prep instructions">
            <p className="text-sm pt-2">{dish.prep}</p>
          </Accordion>
        )}
      </div>
    </Accordion>
  );
}

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [dishes, setDishes] = useState<MenuDish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: cats }, { data: dishData }] = await Promise.all([
        supabase.from("menu_categories").select("*").order("sort_order", { ascending: true }),
        supabase.from("menu_dishes").select("*").order("sort_order", { ascending: true }),
      ]);
      setCategories((cats as MenuCategory[]) || []);
      setDishes((dishData as MenuDish[]) || []);
      setLoading(false);
    })();
  }, []);

  const dishesByCategory = useMemo(() => {
    const map = new Map<string, MenuDish[]>();
    for (const dish of dishes) {
      if (!map.has(dish.category_id)) map.set(dish.category_id, []);
      map.get(dish.category_id)!.push(dish);
    }
    return map;
  }, [dishes]);

  return (
    <div className="p-4">
      <h1 className="text-xs uppercase tracking-widest text-gray-400 mb-3">Eetkaart — Menu</h1>
      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {!loading && categories.length === 0 && (
        <p className="text-sm text-gray-500">No menu categories yet. Add some in Staff Edit.</p>
      )}
      {categories.map((cat) => (
        <Accordion key={cat.id} title={cat.name} subtitle={cat.note || undefined}>
          {(dishesByCategory.get(cat.id) || []).map((dish) => (
            <DishRow key={dish.id} dish={dish} />
          ))}
          {(dishesByCategory.get(cat.id) || []).length === 0 && (
            <p className="text-sm text-gray-500 py-2">No dishes in this category yet.</p>
          )}
        </Accordion>
      ))}
    </div>
  );
}
