-- Niko Udon kitchen app — seed data
-- Generated from restaurant-provided files. Replace/extend via /admin as things change.

truncate table checklist_items restart identity cascade;
truncate table menu_dishes restart identity cascade;
truncate table menu_categories restart identity cascade;
truncate table stock_items restart identity cascade;

insert into checklist_items (type, label, detail, sort_order) values
('opening', '鍵開け', 'セキュリティの解除', 1),
('opening', '換気扇・電気スイッチ', 'バー奥のスイッチをオン', 2),
('opening', '釜の水量確認・スイッチ', '水の量を確認し、スイッチを入れる', 3),
('opening', 'うどん場の釜のスイッチ', '水の量を確認し、スイッチを入れる', 4),
('opening', 'ネタケースのスイッチ', 'ネタケースのドレーンがバットに入っているか確認、スイッチを入れる', 5),
('opening', 'フライヤーの確認', '洗浄のための水でないか確認、油の量の確認', 6),
('opening', '仕込みリストの確認', '内容を確認（写メを取る、メモを取る）', 7),
('opening', 'スープの冷蔵庫の確認', 'スープの不足がないか確認、不足分をチェック', 8),
('opening', 'スープの保温', '5リットルの鍋にスープを保温する', 9),
('opening', 'トッピング冷蔵庫の確認', 'トッピング、サラダ、調味料の不足分のチェック', 10),
('opening', 'うどん場の冷蔵庫の確認', 'てんつゆの確認、手巻きネタの確認、しぐれ、土手煮、
鴨、チャーシューなどの残量確認
クレームブリュレの残数確認', 11),
('opening', 'うどん場冷凍庫の確認', '枝豆、天かす、ゆず、餅アイスなどの残量チェック', 12),
('opening', '天ぷらネタ冷蔵庫', '天ぷらの具の残量のチェック、牡蠣、ハリング等残量チェック', 13),
('opening', '手巻きネタの確認', '冷蔵庫にしまってあるネタを確認、追加が必要なものを解凍', 14),
('opening', 'ディッシュウォッシャー', '扉を締めた状態でスイッチを入れる', 15),
('opening', '出汁の仕掛けの確認', 'IHに出汁がかかっているか確認、あれば厚削り、鯖節を入れ、温度を上げる', 16),
('opening', 'シャリの確認', '冷蔵庫のシャリを確認し、使用分をレンジで加熱', 17),
('opening', '炊飯の準備', '営業用のお込めの準備、炊飯（シャリ、予約状況で多く炊いたり、朝に洗米をして用意しておく）', 18),
('opening', 'ウォークインの確認', '出汁の残や、食材の在庫、解凍などの状況を確認しておく（ビーガン出汁の鍋などがないか確認）', 19),
('opening', '仕込みの準備', '仕込みリスト、確認した内容に応じて食材を準備', 20),
('opening', '※緊急度が高いものがどれか確認し、欠品しないよう仕込みを進める', NULL, 21),
('opening', '手巻きネタ', '解凍状況を確認し、必要なものを解凍（日付を記載）
不足分を上階に上げる', 22),
('opening', '炊飯', '準備したお米の炊飯', 23),
('opening', '食材の補充と開店準備', '食材の補充を行い、フタ、ラップなどを外しておく', 24),
('closing', '釜の洗浄（大）', '営業の状況によって洗浄、水を張る', 1),
('closing', 'フライヤー', 'フライヤーの網などの洗浄
油が汚れている場合、油を抜き、揚カスを取り除き、水を張る', 2),
('closing', '釜の洗浄（うどん場）', NULL, 3),
('closing', '寿司・刺身ネタの収納', '金属プレートに記載の日付を包んで収納したネタに記載する', 4),
('closing', '冷蔵庫への収納', '時雨煮、土手煮、赤出汁、天つゆを冷蔵庫へ', 5),
('closing', '床の掃除（うどん場）', NULL, 6),
('closing', '床の掃除（地下）', NULL, 7),
('closing', '仕込みの確認', '翌日の仕込みの作業内容を記載', 8);

insert into stock_items (section, name, gf_par_wd, gf_par_we, gf_unit, bw_par_wd, bw_par_we, bw_unit, bd_par_wd, bd_par_we, bd_unit, closing_options, closing_status, note, sort_order) values
('Tempura', 'Shrimp', '2', '3', 'box', NULL, NULL, NULL, '4', '4', 'pack', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x4', 1),
('Tempura', 'Chicken', '4', '6', 'box', '0', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 2),
('Tempura', 'Lotus Root', '2', '4', 'box', NULL, NULL, NULL, '2', '2', 'pack', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x2', 3),
('Tempura', 'Eggplant', '2', '4', 'box', '0', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 4),
('Tempura', 'Shiso (1 box = 2 packages)', '2', '3', 'box', '4', '6', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 5),
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
('Sushi & Sashimi Prep', 'Eel', '2', '4', 'pack', NULL, NULL, NULL, '2', '4', 'pack', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x3', 17),
('Sushi & Sashimi Prep', 'Tuna', '1', '2', 'plate', NULL, NULL, NULL, '2', '3', 'saku', 'prep/fill/unsure', '', '* Defrost needed', 18),
('Sushi & Sashimi Prep', 'Salmon', '1', '2', 'plate', NULL, NULL, NULL, '2', '3', 'saku', 'prep/fill/unsure', '', '* Defrost needed', 19),
('Sushi & Sashimi Prep', 'Scallop', '1', '2', 'plate', NULL, NULL, NULL, '10', '15', 'pcs', 'prep/fill/unsure', '', '* Defrost needed', 20),
('Sushi & Sashimi Prep', 'Ikura', '0.5', '1', 'box', NULL, NULL, NULL, '0', '0', 'box', 'prep/fill/unsure', '', '* Defrost needed', 21),
('Sushi & Sashimi Prep', 'Wasabi', '0.5', '1', 'bag', NULL, NULL, NULL, '1', '2', 'bag', 'prep/fill/unsure', '', '* Defrost needed', 22),
('Cold Vegetables', 'Oyster', '0.5', '1', 'box', '1', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 23),
('Cold Vegetables', 'Opened Oyster', '6', '12', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, '', '', NULL, 24),
('Cold Vegetables', 'Oyster Mixed Ponzu', '1', '1', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 25),
('Cold Vegetables', 'Salad Leaf', '1', '1', 'bat', '1', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 26),
('Cold Vegetables', 'Cut Cucumber', '1', '2', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 27),
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
('Main Udon', 'Txuleton', NULL, NULL, 'pcs', NULL, NULL, 'pcs', NULL, NULL, 'pcs', 'prep/fill/unsure', '', 'Need to order 1 day before', 43),
('Main Udon', 'Entrecote', '4', '8', 'portion', '4', '6', 'pack', NULL, NULL, NULL, 'prep/fill/unsure', '', '* Defrost needed', 44),
('Main Udon', 'Watercress', '1', '2', 'bag', '1', '2', 'bag', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 45),
('Main Udon', 'Tuna Katsu', '4', '8', 'pcs', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 46),
('Main Udon', 'Duck', '1', '1.5', 'bat', '1', '2', 'bag (3-4 pcs in bag)', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 47),
('Main Udon', 'Duck & Leek', '1', '1', 'box', '1', '2', 'bag', NULL, NULL, 'bag', 'prep/fill/unsure', '', NULL, 48),
('Main Udon', 'Shigure', '1', '1', 'bat', '1', '2', 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 49),
('Main Udon', 'Chashu', '1', '2', 'bat', '1', '2', 'box', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 50),
('Main Udon', 'Kitsune', '1', '1', 'bat', NULL, NULL, NULL, '1', '2', 'bag', 'prep/fill/unsure', '', '[!] Move the same number of frozen ones to the walk-in when using a defrosted one x1', 51),
('Main Udon', 'Udon Soup', '2', '2', 'bat', '2', '4', 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 52),
('Main Udon', 'Okinawa Soup', '1', '1', 'bat', '1', '2', 'container', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 53),
('Main Udon', 'Vegan Soup', '1', '1', 'bat', '1', '2', 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 54),
('Main Udon', 'BK Soup', '1', '1', 'bat', '1', '2', 'bat', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 55),
('Main Udon', 'BK Vegan Soup', '0.25', '0.5', 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 56),
('Desserts', 'Crème Brûlée', '6', '6', 'pcs', '6', '12', 'pcs', NULL, NULL, NULL, 'prep/fill/unsure', '', '* Defrost needed', 57),
('Desserts', 'Mochi Ice Cream', '1', '2', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 58),
('Desserts', 'Sesame Kinako', '0.25', '0.5', 'box', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 59),
('Desserts', 'Whipped Cream', '1', '1', NULL, '1', '1', NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 60),
('Sauces & Condiments', 'Vegan Ponzu', '0.5', '1', 'bottle', '1', '1', 'bottle', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 61),
('Sauces & Condiments', 'Nikiri', '0.5', '1', 'bottle', '1', '2', 'bottle', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 62),
('Sauces & Condiments', 'Dontare', '0.5', '1', 'bottle', '1', '2', 'bottle', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 63),
('Sauces & Condiments', 'Tuna Tamari', '0.5', '1', 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 64),
('Sauces & Condiments', 'Duck Sauce', '2', '4', 'bag', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 65),
('Sauces & Condiments', 'Onion Dressing', '0.5', '1', 'bottle', '1', '2', 'bottle', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 66),
('Sauces & Condiments', 'Garlic Oil', NULL, NULL, 'can', NULL, NULL, NULL, NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 67),
('Sauces & Condiments', 'Cauliflower Sauce', '1', '2', 'bag', '3', '6', 'bag', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 68),
('Sauces & Condiments', 'Okinawa Soju', '1', '1', 'bottle', '1', '2', 'bottle', NULL, NULL, NULL, 'prep/fill/unsure', '', NULL, 69),
('Sauces & Condiments', 'S. Chilli', '1', '1', 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'buy/fill/unsure', '', NULL, 70),
('Sauces & Condiments', 'QP Mayo', '1', '2', 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'buy/fill/unsure', '', NULL, 71),
('Sauces & Condiments', 'Yuzu Kosho', '1', '2', 'bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'buy/fill/unsure', '', NULL, 72);

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
