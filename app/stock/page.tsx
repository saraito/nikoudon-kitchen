"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { StockItem } from "@/lib/types";
import Accordion from "@/components/Accordion";

function isWeekend(day: number) {
  // WE = Thursday(4), Friday(5), Saturday(6). WD = Sunday(0)-Wednesday(3).
  return day === 4 || day === 5 || day === 6;
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
        <span className={!todayIsWE && wd ? "font-semibold text-black" : "text-gray-400"}>
          WD {wd || "–"}
        </span>
        <span className={todayIsWE && we ? "font-semibold text-black" : "text-gray-400"}>
          WE {we || "–"}
        </span>
      </div>
      {unit && <div className="text-gray-500">{unit}</div>}
    </div>
  );
}

function StockRow({ item, todayIsWE }: { item: StockItem; todayIsWE: boolean }) {
  const [status, setStatus] = useState(item.closing_status || "");
  const options = item.closing_options
    ? item.closing_options.split("/").map((s) => s.trim())
    : [];

  async function updateStatus(value: string) {
    setStatus(value);
    await supabase.from("stock_items").update({ closing_status: value }).eq("id", item.id);
  }

  return (
    <li className="py-3 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start justify-between gap-2">
        <span className="font-medium">{item.name}</span>
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
      </div>
      <div className="grid grid-cols-3 gap-2 mt-2">
        <ParCell label="Upstairs" wd={item.gf_par_wd} we={item.gf_par_we} unit={item.gf_unit} todayIsWE={todayIsWE} />
        <ParCell label="Downstairs walk-in" wd={item.bw_par_wd} we={item.bw_par_we} unit={item.bw_unit} todayIsWE={todayIsWE} />
        <ParCell label="Defrost needed" wd={item.bd_par_wd} we={item.bd_par_we} unit={item.bd_unit} todayIsWE={todayIsWE} />
      </div>
      {item.note && <p className="text-xs text-gray-500 italic mt-2">{item.note}</p>}
    </li>
  );
}

export default function StockPage() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const todayIsWE = useMemo(() => isWeekend(new Date().getDay()), []);
  const todayLabel = useMemo(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mo = String(d.getMonth() + 1).padStart(2, "0");
    const day = d.toLocaleDateString("en-US", { weekday: "short" });
    return `${dd}/${mo} (${day})`;
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("stock_items")
        .select("*")
        .order("sort_order", { ascending: true });
      setItems((data as StockItem[]) || []);
      setLoading(false);
    })();
  }, []);

  const sections = useMemo(() => {
    const map = new Map<string, StockItem[]>();
    for (const item of items) {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    }
    return Array.from(map.entries());
  }, [items]);

  return (
    <div className="p-4">
      <div className="mb-3">
        <div className="text-2xl font-bold tracking-tight">{todayLabel}</div>
        <span className="inline-block mt-1 bg-gray-100 text-gray-500 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded">
          {todayIsWE ? "Thu–Sat prep day" : "Sunday/weekdays prep day"}
        </span>
      </div>
      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {!loading && sections.length === 0 && (
        <p className="text-sm text-gray-500">No stock items yet. Add some in Staff Edit.</p>
      )}
      {sections.map(([section, sectionItems]) => (
        <Accordion key={section} title={section} subtitle={`${sectionItems.length} items`}>
          <ul>
            {sectionItems.map((item) => (
              <StockRow key={item.id} item={item} todayIsWE={todayIsWE} />
            ))}
          </ul>
        </Accordion>
      ))}
    </div>
  );
}
