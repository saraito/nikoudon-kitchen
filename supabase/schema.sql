-- Niko Udon kitchen app — schema
create extension if not exists "pgcrypto";

create table if not exists checklist_items (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('opening','closing')),
  label text not null,
  is_checked boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists stock_items (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  name text not null,
  gf_par_wd text,
  gf_par_we text,
  gf_unit text,
  bw_par_wd text,
  bw_par_we text,
  bw_unit text,
  bd_par_wd text,
  bd_par_we text,
  bd_unit text,
  closing_options text not null default 'prep/fill/unsure',
  closing_status text not null default '',
  note text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists menu_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  note text,
  sort_order int not null default 0
);

create table if not exists menu_dishes (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references menu_categories(id) on delete cascade,
  name text not null,
  name_jp text,
  tags text[] not null default '{}',
  serving text,
  prep text,
  image_path text,
  sort_order int not null default 0
);

-- Prototype access model: anon key can read AND write everything.
-- This is fine for an internal, unlisted-URL staff tool but is not real security.
-- Before relying on this long-term, add Supabase Auth and scope these policies
-- to authenticated staff accounts instead of `using (true)`.
alter table checklist_items enable row level security;
alter table stock_items enable row level security;
alter table menu_categories enable row level security;
alter table menu_dishes enable row level security;

drop policy if exists "public all checklist_items" on checklist_items;
create policy "public all checklist_items" on checklist_items for all using (true) with check (true);

drop policy if exists "public all stock_items" on stock_items;
create policy "public all stock_items" on stock_items for all using (true) with check (true);

drop policy if exists "public all menu_categories" on menu_categories;
create policy "public all menu_categories" on menu_categories for all using (true) with check (true);

drop policy if exists "public all menu_dishes" on menu_dishes;
create policy "public all menu_dishes" on menu_dishes for all using (true) with check (true);
