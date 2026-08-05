-- Niko Udon kitchen app — editing UI update (2026-08-05)
-- Run this once in the Supabase SQL Editor on your LIVE project.
-- Adds "archive" support to checklist/stock/menu items, and a public
-- storage bucket the new Menu edit screen uploads dish photos into.
-- Nothing existing is deleted or changed — this only adds new columns
-- and a new bucket.

alter table checklist_items add column if not exists is_archived boolean not null default false;
alter table stock_items add column if not exists is_archived boolean not null default false;
alter table menu_dishes add column if not exists is_archived boolean not null default false;

insert into storage.buckets (id, name, public)
values ('dish-images', 'dish-images', true)
on conflict (id) do nothing;

drop policy if exists "public read dish-images" on storage.objects;
create policy "public read dish-images" on storage.objects for select using (bucket_id = 'dish-images');

drop policy if exists "public insert dish-images" on storage.objects;
create policy "public insert dish-images" on storage.objects for insert with check (bucket_id = 'dish-images');

drop policy if exists "public update dish-images" on storage.objects;
create policy "public update dish-images" on storage.objects for update using (bucket_id = 'dish-images');

drop policy if exists "public delete dish-images" on storage.objects;
create policy "public delete dish-images" on storage.objects for delete using (bucket_id = 'dish-images');
