-- Niko Udon kitchen app — seed data
-- Generated from restaurant-provided files. Replace/extend via /admin as things change.

truncate table checklist_items restart identity cascade;
truncate table menu_dishes restart identity cascade;
truncate table menu_categories restart identity cascade;
truncate table stock_items restart identity cascade;

insert into checklist_items (type, label, sort_order) values
('opening', 'Turn on rice cookers and start rice', 1),
('opening', 'Check ground floor fridge & freezer temperatures', 2),
('opening', 'Check basement walk-in & defrost fridge temperatures', 3),
('opening', 'Prep dashi stock for the day', 4),
('opening', 'Restock ground floor counter from basement stock', 5),
('opening', 'Turn on tempura fryer oil and bring to temperature', 6),
('opening', 'Set up sushi station (rice, nori, tools)', 7),
('opening', 'Run through Stock Check tab for anything marked ''prep/fill/?'' from last night', 8),
('opening', 'Wipe down and sanitize all prep surfaces', 9),
('opening', 'Turn on POS / kitchen display system', 10),
('closing', 'Go through Stock Check tab and mark prep / fill / ? for tomorrow', 1),
('closing', 'Turn off fryers, rice cookers, and burners', 2),
('closing', 'Cover and label all prepped ingredients with today''s date', 3),
('closing', 'Move required items from basement defrost to walk-in for tomorrow (see [!] notes in Stock Check)', 4),
('closing', 'Wipe down and sanitize all surfaces and equipment', 5),
('closing', 'Empty and clean fryer oil filters', 6),
('closing', 'Take out trash and recycling', 7),
('closing', 'Restock basement items that ran low today', 8),
('closing', 'Lock walk-in fridge and freezer doors', 9),
('closing', 'Turn off lights and lock kitchen', 10);

insert into stock_items (section, name, gf_par_wd, gf_par_we, gf_unit, bw_par_wd, bw_par_we, bw_unit, bd_par_wd, bd_par_we, bd_unit, closing_options, closing_status, note, sort_order) values
('Tempura', 'Shrimp', '2', '3', 'box', NULL, NULL, NULL, '4', '4', 'pack', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x4', 1),
('Tempura', 'Chicken', '4', '6', 'box', '0', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 2),
('Tempura', 'Lotus Root', '2', '4', 'box', NULL, NULL, NULL, '2', '2', 'pack', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x2', 3),
('Tempura', 'Eggplant', '2', '4', 'box', '0', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 4),
('Tempura', 'Shiso (1 box = 2 packs)', '2', '3', 'box', '4', '6', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 5),
('Tempura', 'Batter', '1', '2', 'bat', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 6),
('Tempura', 'Vegetable Kakiage', '4', '4', 'bag', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 7),
('Sushi & Sashimi Prep', 'Nori', 'half', 'full', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', 'Room temp', 8),
('Sushi & Sashimi Prep', 'Sushi Rice', '2', '3', 'box', '2', '4', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 9),
('Sushi & Sashimi Prep', 'Cut Shiso', '3', '6', 'leaves', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 10),
('Sushi & Sashimi Prep', 'Cut Cucumber', '1', '2', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 11),
('Sushi & Sashimi Prep', 'White Ginger', '0.5', '1', 'box', '1', '1', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 12),
('Sushi & Sashimi Prep', 'Fried Tofu (Inari)', '0.25', '0.5', 'box', NULL, NULL, NULL, '1', '1', 'pack', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x1', 13),
('Sushi & Sashimi Prep', 'Guacamole', '0.5', '1', 'bag', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 14),
('Sushi & Sashimi Prep', 'Ponzu Jelly', '0.5', '1', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 15),
('Sushi & Sashimi Prep', 'Tsuma', '0.5', '1', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 16),
('Sushi & Sashimi Prep', 'Eel', '2', '4', 'pack', NULL, NULL, NULL, '2', '4', 'pack', 'fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x3', 17),
('Sushi & Sashimi Prep', 'Tuna', '1', '2', 'plate', NULL, NULL, NULL, '2', '3', 'saku', 'prep/fill/unsure', '', 'Defrost needed', 18),
('Sushi & Sashimi Prep', 'Salmon', '1', '2', 'plate', NULL, NULL, NULL, '2', '3', 'saku', 'prep/fill/unsure', '', 'Defrost needed', 19),
('Sushi & Sashimi Prep', 'Scallop', '1', '2', 'plate', NULL, NULL, NULL, '10', '15', 'pcs', 'prep/fill/unsure', '', 'Defrost needed', 20),
('Sushi & Sashimi Prep', 'Ikura', '0.5', '1', 'box', NULL, NULL, NULL, '0', '0', 'box', 'prep/fill/unsure', '', 'Defrost needed', 21),
('Sushi & Sashimi Prep', 'Wasabi', '0.5', '1', 'bag', NULL, NULL, NULL, '1', '2', 'bag', 'prep/fill/unsure', '', 'Defrost needed', 22),
('Cold Vegetables', 'Oyster', '0.5', '1', 'box', '1', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 23),
('Cold Vegetables', 'Opened Oyster', '6', '12', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, 24),
('Cold Vegetables', 'Oyster Mixed Ponzu', '1', '1', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 25),
('Cold Vegetables', 'Salad Leaf', '1', '1', 'bat', '1', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 26),
('Cold Vegetables', 'Cut Cucumber (cold prep)', '1', '2', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 27),
('Cold Vegetables', 'Radish', '1', '2', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 28),
('Cold Vegetables', 'Cauliflower', '1', '1', 'bat', '2', '4', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 29),
('Cold Vegetables', 'Cut Lemon', '12', '24', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 30),
('Cold Vegetables', 'Sliced Lemon', '6', '12', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 31),
('Cold Vegetables', 'Fish Tartare', '1', '2', 'bag', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 32),
('Cold Vegetables', 'Orange Zest', '1', '1', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 33),
('Cold Vegetables', 'Daikon Cress', '1', '1.5', 'pack', '2', '3', 'pack', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 34),
('Cold Vegetables', 'Pink Ginger', '0.5', '1', 'bat', '1', '1', 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 35),
('Cold Vegetables', 'Grated Ginger', '1', '1', 'bat', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 36),
('Cold Vegetables', 'Grated White Radish', '2', '2', 'bat', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 37),
('Cold Vegetables', 'Wakame', '2', '2', 'bat', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 38),
('Cold Vegetables', 'Onion', '2', '2', 'bat', '2', '4', 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x1', 39),
('Cold Vegetables', 'Udon Crisp', '0.5', '1', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', 'Room temp', 40),
('Cold Vegetables', 'Egg', '1', '1', 'bat', '1', '1', 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 41),
('Cold Vegetables', 'Edamame', '4', '6', 'bag', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 42),
('Main Udon', 'Txuleton', NULL, NULL, 'pcs', NULL, NULL, 'pcs', '2', '2', 'pcs', 'prep/fill/unsure', '', 'Defrost needed', 43),
('Main Udon', 'Entrecote', '4', '8', 'pcs', NULL, NULL, 'pcs', NULL, NULL, 'pcs', 'prep/fill/unsure', '', 'Defrost needed', 44),
('Main Udon', 'Watercress', '1', '1', 'bag', NULL, NULL, 'bag', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 45),
('Main Udon', 'Tuna Katsu', '4', '8', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 46),
('Main Udon', 'Duck', NULL, NULL, 'bat', NULL, NULL, 'bag', NULL, NULL, 'bag', 'prep/fill/unsure', '', NULL, 47),
('Main Udon', 'Duck Leek', NULL, NULL, 'box', NULL, NULL, 'bag', NULL, NULL, 'bag', 'prep/fill/unsure', '', NULL, 48),
('Main Udon', 'Shigure', NULL, NULL, 'bat', NULL, NULL, 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 49),
('Main Udon', 'Cha-siu', NULL, NULL, 'bat', NULL, NULL, 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 50),
('Main Udon', 'Kitsune', NULL, NULL, 'bat', NULL, NULL, 'bag', NULL, NULL, 'bag', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x1', 51),
('Main Udon', 'Udon Soup Base', NULL, NULL, 'bat', NULL, NULL, 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 52),
('Main Udon', 'Okinawa Soup Base', NULL, NULL, 'bat', NULL, NULL, 'container', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 53),
('Main Udon', 'Vegan Soup Base', NULL, NULL, 'bat', NULL, NULL, 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 54),
('Main Udon', 'BK Soup Base', NULL, NULL, 'bat', NULL, NULL, 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 55),
('Main Udon', 'BK Vegan Soup Base', NULL, NULL, 'bottle', NULL, NULL, 'bottle', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 56),
('Desserts', 'Crème Brûlée Base', NULL, NULL, 'pcs', NULL, NULL, 'pcs', NULL, NULL, NULL, 'prep/fill/unsure', '', 'Defrost needed', 57),
('Desserts', 'Mochi Ice', NULL, NULL, 'box', NULL, NULL, NULL, NULL, NULL, 'box', 'prep/fill/unsure', '', NULL, 58),
('Desserts', 'Sesame Kinako', NULL, NULL, 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 59),
('Desserts', 'Whip Cream', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 60),
('Sauces & Condiments', 'Vegan Ponzu', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', 'Check downstairs for details', 61),
('Sauces & Condiments', 'Nikiri', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 62),
('Sauces & Condiments', 'Dontare Sauce', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 63),
('Sauces & Condiments', 'Tuna Tamari', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 64),
('Sauces & Condiments', 'Duck Sauce', NULL, NULL, 'bag', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 65),
('Sauces & Condiments', 'Onion Dressing', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', 'Check downstairs for details', 66),
('Sauces & Condiments', 'Garlic Oil', NULL, NULL, 'can', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 67),
('Sauces & Condiments', 'Cauliflower Sauce', NULL, NULL, 'bag', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 68),
('Sauces & Condiments', 'Okinawa Shochu', NULL, NULL, 'dispenser', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 69),
('Sauces & Condiments', 'Sweet Chili Sauce', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'buy/fill/unsure', '', NULL, 70),
('Sauces & Condiments', 'Kewpie Mayo', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'buy/fill/unsure', '', NULL, 71),
('Sauces & Condiments', 'Yuzu Kosho', NULL, NULL, 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'buy/fill/unsure', '', NULL, 72);

with new_categories as (
  insert into menu_categories (name, note, sort_order) values
    ('STARTERS & SMALL DISHES', NULL, 1),
    ('SUSHI', 'Min 2 rolls per sort. Price per roll. All rolls served with nori, wasabi and nikiri.', 2),
    ('SASHIMI', 'All sashimi served with kizami wasabi and nikiri.', 3),
    ('OKAZU', 'Sharing dishes — can be main with rice for 2.', 4),
    ('UDON SOUP', 'Noodle soup with dashi broth and various toppings.', 5),
    ('BK UDON', 'Cold udon with chilled broth served on the side.', 6),
    ('DONBURI / RICE BOWL', NULL, 7),
    ('EXTRA', NULL, 8),
    ('LUNCH DEAL (TILL 17:00)', NULL, 9),
    ('DESSERTS', NULL, 10)
  returning id, name, sort_order
)
select 1;

-- Menu dishes (joined to the category we just inserted, matched by name)
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Oysters', '生牡蠣', '{}'::text[], 'Serve with yuzu ponzu, grated radish with chili pepper and spring onion.', 'Prep yuzu ponzu. Grate radish. Slice spring onion. Plate 3–6 oysters per order.', 'images/dishes/oysters.jpg', 1 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Edamame ''Aglio Olio''', '黒えだまめ', ARRAY['vegan']::text[], 'Steamed green soybeans with red pepper and garlic.', 'Steam edamame. Toss with garlic, chili, oil.', 'images/dishes/edamame.jpg', 2 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Salad with White Miso Dressing', '白味噌ドレッシングのサラダ', ARRAY['vegan']::text[], 'Green salad with cucumber, radish and white miso dressing.', 'Prep miso dressing. Cut cucumber and radish.', 'images/dishes/salad-miso.jpg', 3 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Udon Crisps, Mayo & Sweet Chili Sauce', 'うどんクリスプ', ARRAY['vegetarian']::text[], 'Crispy udon with kewpie mayo and sweet chili sauce.', 'Fry udon crisps. Portion mayo and sweet chili.', 'images/dishes/udon-crisps.jpg', 4 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Cauliflower Karaage', 'カリフラワーの唐揚げ', ARRAY['vegan']::text[], 'Fried cauliflower with celeriac flavored white miso sauce.', 'Batter and fry cauliflower. Prep celeriac miso sauce.', 'images/dishes/cauliflower-karaage.jpg', 5 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Chicken Tempura (4 pcs)', 'とりの天ぷら', '{}'::text[], 'Lightly fried chicken tempura with tsuyu dipping sauce.', 'Prep chicken tempura batch. Tsuyu in small dish.', 'images/dishes/chicken-tempura.jpg', 6 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Shrimp Tempura (4 pcs)', '海老の天ぷら', '{}'::text[], 'Lightly fried shrimp tempura with tsuyu dipping sauce.', 'Prep shrimp tempura. Tsuyu in small dish.', 'images/dishes/shrimp-tempura.jpg', 7 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Fish Tartare', '魚介のタルタル', '{}'::text[], 'Scallop and salmon tartare with orange zest, wasabi, spring onion.', 'Dice fish. Mix with zest, wasabi, spring onion. Chill.', 'images/dishes/fish-tartare.jpg', 8 from menu_categories where name = 'STARTERS & SMALL DISHES' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Inarizushi', 'いなり寿司', ARRAY['vegan']::text[], 'Seasoned fried tofu, shiso, sesame seeds.', 'Fill inari pockets. Top with shiso and sesame.', 'images/dishes/inarizushi.jpg', 9 from menu_categories where name = 'SUSHI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Guacamole Temaki', 'ワカモレ手巻き寿司', ARRAY['vegan']::text[], 'Handroll with guacamole, cucumber and beetroot.', 'Roll by hand with nori.', 'images/dishes/guacamole-temaki.jpg', 10 from menu_categories where name = 'SUSHI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Salmon ''Open'' Temaki', 'サーモン手巻き寿司', '{}'::text[], 'Handroll with salmon, cucumber, shiso, trout roe.', 'Open temaki style — fish visible on top.', 'images/dishes/salmon-temaki.jpg', 11 from menu_categories where name = 'SUSHI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Unagi ''Open'' Temaki', '鰻の手巻き寿司', '{}'::text[], 'Handroll with grilled eel, cucumber and sansho.', 'Warm eel. Roll open style.', 'images/dishes/unagi-temaki.jpg', 12 from menu_categories where name = 'SUSHI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Hotate ''Open'' Temaki', 'ホタテの手巻き寿司', '{}'::text[], 'Handroll with scallop, cucumber, shiso and trout roe.', 'Slice scallop. Open temaki.', 'images/dishes/hotate-temaki.jpg', 13 from menu_categories where name = 'SUSHI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Kihada Maguro ''Open'' Temaki', 'マグロ赤身の手巻き寿司', '{}'::text[], 'Handroll with yellowfin tuna, cucumber and shiso.', 'Slice tuna. Open temaki.', 'images/dishes/kihada-temaki.jpg', 14 from menu_categories where name = 'SUSHI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Sushi Mix (5 pcs)', '手巻き寿司といなり寿司の盛り合わせ', '{}'::text[], 'Mix of all temaki and inarizushi.', 'Plate assortment per spec.', 'images/dishes/sushi-mix.jpg', 15 from menu_categories where name = 'SUSHI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Salmon Sashimi', 'サーモンの刺身', '{}'::text[], 'Sashimi of salmon.', 'Slice salmon. Plate with wasabi and nikiri.', 'images/dishes/salmon-sashimi.jpg', 16 from menu_categories where name = 'SASHIMI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Kihada Maguro Sashimi', 'キハダマグロの刺身', '{}'::text[], 'Sashimi of yellowfin tuna.', 'Slice tuna. Standard sashimi plate.', 'images/dishes/kihada-sashimi.jpg', 17 from menu_categories where name = 'SASHIMI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Hotate Sashimi', 'ホタテの刺身', '{}'::text[], 'Sashimi of scallop.', 'Slice scallop. Standard sashimi plate.', 'images/dishes/hotate-sashimi.jpg', 18 from menu_categories where name = 'SASHIMI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Sashimi Mix', '刺身の盛り合わせ', '{}'::text[], 'Yellowfin tuna, salmon and scallop.', 'Portion all three fish. Mixed plate.', 'images/dishes/sashimi-mix.jpg', 19 from menu_categories where name = 'SASHIMI' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Txuleton (1kg, 3–4 persons)', 'チュレトンビーフステーキ', '{}'::text[], 'Pan-fried dry-aged Basque beef with red wine teriyaki. Reserve 1 day ahead.', 'Rest meat. Sauce separately.', 'images/dishes/txuleton.jpg', 20 from menu_categories where name = 'OKAZU' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Entrecote Tataki', 'サーロインステーキ', '{}'::text[], 'Entrecote with red wine teriyaki.', 'Sear rare. Slice tataki style.', 'images/dishes/entrecote-tataki.jpg', 21 from menu_categories where name = 'OKAZU' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Kamo Roast', '鴨ロースト', '{}'::text[], 'Smoked and baked duck with kamo sauce.', 'Roast duck breast. Kamo sauce warm.', 'images/dishes/kamo-roast.jpg', 22 from menu_categories where name = 'OKAZU' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Tuna Katsu', 'マグロ赤身のレアカツ', '{}'::text[], 'Panko breaded tuna served rare with tamari.', 'Quick fry — rare center.', 'images/dishes/tuna-katsu.jpg', 23 from menu_categories where name = 'OKAZU' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Vegetable Kakiage', '野菜のかき揚げ', ARRAY['vegan']::text[], 'Kakiage of carrots and onion with watercress.', 'Mix batter. Fry in clusters.', 'images/dishes/vegetable-kakiage.jpg', 24 from menu_categories where name = 'OKAZU' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Niku Udon', '肉うどん', '{}'::text[], 'Simmered lightly sweet beef, ginger, soft boiled egg.', 'Heat niku. Cook noodles. Assemble bowl.', 'images/dishes/niku-udon.jpg', 25 from menu_categories where name = 'UDON SOUP' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Okinawa Udon', '沖縄うどん', ARRAY['limited']::text[], 'Char siu, soft egg, pink ginger, chili shochu.', 'Limited availability — check stock.', 'images/dishes/okinawa-udon.jpg', 26 from menu_categories where name = 'UDON SOUP' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Kamo Udon', '鴨うどん', '{}'::text[], 'Smoked and fried duck breast with leek.', 'Slice duck. Leek garnish.', 'images/dishes/kamo-udon.jpg', 27 from menu_categories where name = 'UDON SOUP' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Shrimp Tempura Udon', '海老天うどん', '{}'::text[], 'Shrimp and vegetable tempura on udon.', 'Fry tempura to order. Hot broth.', 'images/dishes/shrimp-tempura-udon.jpg', 28 from menu_categories where name = 'UDON SOUP' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Chicken Tempura Udon', 'とり天うどん', '{}'::text[], 'Chicken and vegetable tempura on udon.', 'Fry tempura. Assemble bowl.', 'images/dishes/chicken-tempura-udon.jpg', 29 from menu_categories where name = 'UDON SOUP' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Vegetable Kakiage Udon', '野菜のかき揚げうどん', ARRAY['vegan optional']::text[], 'Kakiage of vegetables on udon.', 'Fry kakiage. Vegan broth if requested.', 'images/dishes/vegetable-kakiage-udon.jpg', 30 from menu_categories where name = 'UDON SOUP' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Kitsune Udon', 'キツネうどん', ARRAY['vegan optional']::text[], 'Fried and seasoned tofu on udon.', 'Heat inari/tofu. Vegan broth if requested.', 'images/dishes/kitsune-udon.jpg', 31 from menu_categories where name = 'UDON SOUP' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'BK Niku Udon', '肉ぶっかけうどん', '{}'::text[], 'Cold niku udon. Broth chilled, served separately.', 'Chill noodles and broth.', 'images/dishes/bk-niku-udon.jpg', 32 from menu_categories where name = 'BK UDON' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'BK Shrimp Tempura Udon', '海老天ぶっかけうどん', '{}'::text[], 'Cold udon with shrimp tempura.', 'Tempura fresh. Broth cold on side.', 'images/dishes/bk-shrimp-udon.jpg', 33 from menu_categories where name = 'BK UDON' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'BK Chicken Tempura Udon', 'とり天ぶっかけうどん', '{}'::text[], 'Cold udon with chicken tempura.', 'Same as BK shrimp — cold assembly.', 'images/dishes/bk-chicken-udon.jpg', 34 from menu_categories where name = 'BK UDON' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'BK Sashimi Udon', '刺身ぶっかけうどん', '{}'::text[], 'Cold udon with sashimi topping.', 'Slice fish fresh. Cold broth side.', 'images/dishes/bk-sashimi-udon.jpg', 35 from menu_categories where name = 'BK UDON' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'BK Vegetable Kakiage Udon', '野菜のかき揚げぶっかけうどん', ARRAY['vegan optional']::text[], 'Cold udon with vegetable kakiage.', 'Kakiage crispy. Vegan option available.', 'images/dishes/bk-vegetable-kakiage-udon.jpg', 36 from menu_categories where name = 'BK UDON' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Donburi Niku with Soft Boiled Egg', '温玉乗せ牛丼', '{}'::text[], 'Simmered beef, ginger, soft boiled egg on rice.', 'Heat niku. Rice base. Egg on top.', 'images/dishes/donburi-niku.jpg', 37 from menu_categories where name = 'DONBURI / RICE BOWL' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Donburi Shrimp Tempura', '海老天丼', '{}'::text[], 'Rice bowl with shrimp and vegetable tempura.', 'Fry tempura. Sauce over rice.', 'images/dishes/donburi-shrimp.jpg', 38 from menu_categories where name = 'DONBURI / RICE BOWL' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Donburi Chicken Tempura', 'とり天丼', '{}'::text[], 'Rice bowl with chicken and vegetable tempura.', 'Fry tempura. Assemble donburi.', 'images/dishes/donburi-chicken.jpg', 39 from menu_categories where name = 'DONBURI / RICE BOWL' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Donburi Vegetable Kakiage', '野菜のかき揚げ丼', ARRAY['vegan']::text[], 'Rice bowl with vegetable kakiage.', 'Fry kakiage. Plate on rice.', 'images/dishes/donburi-kakiage.jpg', 40 from menu_categories where name = 'DONBURI / RICE BOWL' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Donburi Sashimi', '海鮮丼', '{}'::text[], 'Tuna, salmon, scallop sashimi with wasabi and nikiri.', 'Slice fish. Over seasoned rice.', 'images/dishes/donburi-sashimi.jpg', 41 from menu_categories where name = 'DONBURI / RICE BOWL' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Add Noodles', '麺大盛り', '{}'::text[], 'Extra portion of udon noodles.', 'Boil extra serving.', NULL, 42 from menu_categories where name = 'EXTRA' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Add Soft Boiled Egg', '温泉卵', '{}'::text[], 'One soft boiled egg.', 'From egg batch.', NULL, 43 from menu_categories where name = 'EXTRA' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Bowl of White Rice', 'ご飯', '{}'::text[], 'Steamed white rice.', 'From rice cooker.', NULL, 44 from menu_categories where name = 'EXTRA' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Kizami Wasabi', '刻みわさび漬け', '{}'::text[], 'Side of kizami wasabi.', 'Portion from prep container.', NULL, 45 from menu_categories where name = 'EXTRA' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Yuzu Kosho', '柚子胡椒', '{}'::text[], 'Side of yuzu kosho.', 'Portion.', NULL, 46 from menu_categories where name = 'EXTRA' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Kewpie Mayo', 'キューピーマヨネーズ', '{}'::text[], 'Side of kewpie mayo.', 'Squeeze bottle.', NULL, 47 from menu_categories where name = 'EXTRA' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Fish Miso Soup', '魚の赤だ', '{}'::text[], 'Fish miso soup.', 'Heat soup. Garnish.', 'images/dishes/fish-miso-soup.jpg', 48 from menu_categories where name = 'EXTRA' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Add 1 Temaki (Salmon/Eel/Tuna/Scallop)', NULL, '{}'::text[], 'One temaki roll — salmon, eel, tuna, or scallop.', 'Roll to order.', NULL, 49 from menu_categories where name = 'LUNCH DEAL (TILL 17:00)' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Add 1 Inarizushi', NULL, '{}'::text[], 'One piece of inarizushi.', 'From prep.', NULL, 50 from menu_categories where name = 'LUNCH DEAL (TILL 17:00)' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Black Sesame Mochi Ice', '黒ゴマもちアイス', '{}'::text[], 'Serve frozen mochi ice.', 'Pull from freezer. Plate.', 'images/dishes/black-sesame-mochi.jpg', 51 from menu_categories where name = 'DESSERTS' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Miso Chococake', '味噌チョコケーキ', '{}'::text[], 'Slice and plate.', 'From dessert prep.', 'images/dishes/miso-chococake.jpg', 52 from menu_categories where name = 'DESSERTS' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Basque Cheesecake', 'バスクチーズケーキ', '{}'::text[], 'Slice and plate.', 'Room temp or lightly chilled.', 'images/dishes/basque-cheesecake.jpg', 53 from menu_categories where name = 'DESSERTS' limit 1;
insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) select id, 'Matcha Creme Brulée', '抹茶のクリームブリュレ', '{}'::text[], 'Torch sugar top if needed.', 'From fridge. Brulée to order.', 'images/dishes/matcha-creme-brulee.jpg', 54 from menu_categories where name = 'DESSERTS' limit 1;
