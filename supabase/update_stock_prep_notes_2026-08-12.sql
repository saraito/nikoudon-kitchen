-- Niko Udon kitchen app — stock prep instructions (2026-08-12)
-- Run this once in the Supabase SQL Editor on your LIVE project.
-- Adds an optional prep instruction (rich text) and photo to each stock
-- item, shown via the book icon on the Stock Check page. Also renames
-- the closing-status option "unsure" to "check" (label and stored value).
-- Nothing existing is deleted — this only adds columns and renames a word.

alter table stock_items add column if not exists prep_note text;
alter table stock_items add column if not exists prep_image text;

update stock_items set closing_options = replace(closing_options, 'unsure', 'check') where closing_options like '%unsure%';
update stock_items set closing_status = 'check' where closing_status = 'unsure';
