-- Niko Udon kitchen app — enable live sync for the stock list (2026-08-13)
-- Run this once in the Supabase SQL Editor on your LIVE project.
-- Without this, the Stock Check page's "auto-refresh when someone else
-- changes a status" feature won't receive any updates — Supabase only
-- pushes live changes for tables added to the realtime publication.

do $$
begin
  alter publication supabase_realtime add table stock_items;
exception when duplicate_object then
  null;
end $$;
