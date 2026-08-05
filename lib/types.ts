export interface ChecklistItem {
  id: string;
  type: "opening" | "closing";
  label: string;
  detail: string | null;
  is_checked: boolean;
  sort_order: number;
}

export interface StockItem {
  id: string;
  section: string;
  name: string;
  gf_par_wd: string | null;
  gf_par_we: string | null;
  gf_unit: string | null;
  bw_par_wd: string | null;
  bw_par_we: string | null;
  bw_unit: string | null;
  bd_par_wd: string | null;
  bd_par_we: string | null;
  bd_unit: string | null;
  closing_options: string;
  closing_status: string;
  note: string | null;
  sort_order: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  note: string | null;
  sort_order: number;
}

export interface MenuDish {
  id: string;
  category_id: string;
  name: string;
  name_jp: string | null;
  tags: string[];
  serving: string | null;
  prep: string | null;
  image_path: string | null;
  sort_order: number;
}
