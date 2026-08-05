import json

def esc(s):
    if s is None:
        return "NULL"
    return "'" + str(s).replace("'", "''") + "'"

def esc_or_null(s):
    if s is None or s == "":
        return "NULL"
    return esc(s)

lines = []
lines.append("-- Niko Udon kitchen app — seed data")
lines.append("-- Generated from restaurant-provided files. Replace/extend via /admin as things change.")
lines.append("")
lines.append("truncate table checklist_items restart identity cascade;")
lines.append("truncate table menu_dishes restart identity cascade;")
lines.append("truncate table menu_categories restart identity cascade;")
lines.append("truncate table stock_items restart identity cascade;")
lines.append("")

# ---------- Checklist items (sample — edit freely in /admin) ----------
opening = [
    "Turn on rice cookers and start rice",
    "Check ground floor fridge & freezer temperatures",
    "Check basement walk-in & defrost fridge temperatures",
    "Prep dashi stock for the day",
    "Restock ground floor counter from basement stock",
    "Turn on tempura fryer oil and bring to temperature",
    "Set up sushi station (rice, nori, tools)",
    "Run through Stock Check tab for anything marked 'prep/fill/?' from last night",
    "Wipe down and sanitize all prep surfaces",
    "Turn on POS / kitchen display system",
]
closing = [
    "Go through Stock Check tab and mark prep / fill / ? for tomorrow",
    "Turn off fryers, rice cookers, and burners",
    "Cover and label all prepped ingredients with today's date",
    "Move required items from basement defrost to walk-in for tomorrow (see [!] notes in Stock Check)",
    "Wipe down and sanitize all surfaces and equipment",
    "Empty and clean fryer oil filters",
    "Take out trash and recycling",
    "Restock basement items that ran low today",
    "Lock walk-in fridge and freezer doors",
    "Turn off lights and lock kitchen",
]

lines.append("insert into checklist_items (type, label, sort_order) values")
vals = []
for i, label in enumerate(opening):
    vals.append(f"('opening', {esc(label)}, {i+1})")
for i, label in enumerate(closing):
    vals.append(f"('closing', {esc(label)}, {i+1})")
lines.append(",\n".join(vals) + ";")
lines.append("")

# ---------- Stock items (transcribed from the two PREP CHECKER CSVs) ----------
# Each: section, name, gf(wd,we,unit), bw(wd,we,unit), bd(wd,we,unit), closing_options, note
def item(section, name, gf=(None,None,None), bw=(None,None,None), bd=(None,None,None), closing="prep/fill/unsure", note=None):
    return dict(section=section, name=name, gf=gf, bw=bw, bd=bd, closing=closing, note=note)

stock = []

# Tempura
stock += [
    item("Tempura", "Shrimp", gf=("2","3","box"), bd=("4","4","pack"),
         note="[!] Move the same number of frozen ones to the walk-in when using a defrosted one x4"),
    item("Tempura", "Chicken", gf=("4","6","box"), bw=("0","2","box")),
    item("Tempura", "Lotus Root", gf=("2","4","box"), bd=("2","2","pack"),
         note="[!] Move the same number of frozen ones to the walk-in when using a defrosted one x2"),
    item("Tempura", "Eggplant", gf=("2","4","box"), bw=("0","2","box")),
    item("Tempura", "Shiso (1 box = 2 packs)", gf=("2","3","box"), bw=("4","6","box")),
    item("Tempura", "Batter", gf=("1","2","bat")),
    item("Tempura", "Vegetable Kakiage", gf=("4","4","bag")),
]

# Sushi & Sashimi (stock prep, not the menu category)
stock += [
    item("Sushi & Sashimi Prep", "Nori", gf=("half","full","box"), note="Room temp"),
    item("Sushi & Sashimi Prep", "Sushi Rice", gf=("2","3","box"), bw=("2","4","box")),
    item("Sushi & Sashimi Prep", "Cut Shiso", gf=("3","6","leaves")),
    item("Sushi & Sashimi Prep", "Cut Cucumber", gf=("1","2","box")),
    item("Sushi & Sashimi Prep", "White Ginger", gf=("0.5","1","box"), bw=("1","1","box")),
    item("Sushi & Sashimi Prep", "Fried Tofu (Inari)", gf=("0.25","0.5","box"), bd=("1","1","pack"),
         note="[!] Move the same number of frozen ones to the walk-in when using a defrosted one x1"),
    item("Sushi & Sashimi Prep", "Guacamole", gf=("0.5","1","bag")),
    item("Sushi & Sashimi Prep", "Ponzu Jelly", gf=("0.5","1","box")),
    item("Sushi & Sashimi Prep", "Tsuma", gf=("0.5","1","box")),
    item("Sushi & Sashimi Prep", "Eel", gf=("2","4","pack"), bd=("2","4","pack"), closing="fill/unsure",
         note="[!] Move the same number of frozen ones to the walk-in when using a defrosted one x3"),
    item("Sushi & Sashimi Prep", "Tuna", gf=("1","2","plate"), bd=("2","3","saku"), note="Defrost needed"),
    item("Sushi & Sashimi Prep", "Salmon", gf=("1","2","plate"), bd=("2","3","saku"), note="Defrost needed"),
    item("Sushi & Sashimi Prep", "Scallop", gf=("1","2","plate"), bd=("10","15","pcs"), note="Defrost needed"),
    item("Sushi & Sashimi Prep", "Ikura", gf=("0.5","1","box"), bd=("0","0","box"), note="Defrost needed"),
    item("Sushi & Sashimi Prep", "Wasabi", gf=("0.5","1","bag"), bd=("1","2","bag"), note="Defrost needed"),
]

# Cold Vegetables
stock += [
    item("Cold Vegetables", "Oyster", gf=("0.5","1","box"), bw=("1","2","box")),
    item("Cold Vegetables", "Opened Oyster", gf=("6","12","pcs"), closing=""),
    item("Cold Vegetables", "Oyster Mixed Ponzu", gf=("1","1","box")),
    item("Cold Vegetables", "Salad Leaf", gf=("1","1","bat"), bw=("1","2","box")),
    item("Cold Vegetables", "Cut Cucumber (cold prep)", gf=("1","2","box")),
    item("Cold Vegetables", "Radish", gf=("1","2","box")),
    item("Cold Vegetables", "Cauliflower", gf=("1","1","bat"), bw=("2","4","box")),
    item("Cold Vegetables", "Cut Lemon", gf=("12","24","pcs")),
    item("Cold Vegetables", "Sliced Lemon", gf=("6","12","pcs")),
    item("Cold Vegetables", "Fish Tartare", gf=("1","2","bag")),
    item("Cold Vegetables", "Orange Zest", gf=("1","1","box")),
    item("Cold Vegetables", "Daikon Cress", gf=("1","1.5","pack"), bw=("2","3","pack")),
    item("Cold Vegetables", "Pink Ginger", gf=("0.5","1","bat"), bw=("1","1","bat")),
    item("Cold Vegetables", "Grated Ginger", gf=("1","1","bat")),
    item("Cold Vegetables", "Grated White Radish", gf=("2","2","bat")),
    item("Cold Vegetables", "Wakame", gf=("2","2","bat")),
    item("Cold Vegetables", "Onion", gf=("2","2","bat"), bw=("2","4","bat"),
         note="[!] Move the same number of frozen ones to the walk-in when using a defrosted one x1"),
    item("Cold Vegetables", "Udon Crisp", gf=("0.5","1","box"), note="Room temp"),
    item("Cold Vegetables", "Egg", gf=("1","1","bat"), bw=("1","1","bat")),
    item("Cold Vegetables", "Edamame", gf=("4","6","bag")),
]

# Main Udon
stock += [
    item("Main Udon", "Txuleton", gf=(None,None,"pcs"), bw=(None,None,"pcs"), bd=("2","2","pcs"), note="Defrost needed"),
    item("Main Udon", "Entrecote", gf=("4","8","pcs"), bw=(None,None,"pcs"), bd=(None,None,"pcs"), note="Defrost needed"),
    item("Main Udon", "Watercress", gf=("1","1","bag"), bw=(None,None,"bag")),
    item("Main Udon", "Tuna Katsu", gf=("4","8","pcs")),
    item("Main Udon", "Duck", gf=(None,None,"bat"), bw=(None,None,"bag"), bd=(None,None,"bag")),
    item("Main Udon", "Duck Leek", gf=(None,None,"box"), bw=(None,None,"bag"), bd=(None,None,"bag")),
    item("Main Udon", "Shigure", gf=(None,None,"bat"), bw=(None,None,"bat")),
    item("Main Udon", "Cha-siu", gf=(None,None,"bat"), bw=(None,None,"box")),
    item("Main Udon", "Kitsune", gf=(None,None,"bat"), bw=(None,None,"bag"), bd=(None,None,"bag"),
         note="[!] Move the same number of frozen ones to the walk-in when using a defrosted one x1"),
    item("Main Udon", "Udon Soup Base", gf=(None,None,"bat"), bw=(None,None,"bat")),
    item("Main Udon", "Okinawa Soup Base", gf=(None,None,"bat"), bw=(None,None,"container")),
    item("Main Udon", "Vegan Soup Base", gf=(None,None,"bat"), bw=(None,None,"bat")),
    item("Main Udon", "BK Soup Base", gf=(None,None,"bat"), bw=(None,None,"bat")),
    item("Main Udon", "BK Vegan Soup Base", gf=(None,None,"bottle"), bw=(None,None,"bottle")),
]

# Desserts
stock += [
    item("Desserts", "Crème Brûlée Base", gf=(None,None,"pcs"), bw=(None,None,"pcs"), note="Defrost needed"),
    item("Desserts", "Mochi Ice", gf=(None,None,"box"), bd=(None,None,"box")),
    item("Desserts", "Sesame Kinako", gf=(None,None,"box")),
    item("Desserts", "Whip Cream", gf=(None,None,None)),
]

# Sauces & Condiments
stock += [
    item("Sauces & Condiments", "Vegan Ponzu", gf=(None,None,"bottle"), note="Check downstairs for details"),
    item("Sauces & Condiments", "Nikiri", gf=(None,None,"bottle")),
    item("Sauces & Condiments", "Dontare Sauce", gf=(None,None,"bottle")),
    item("Sauces & Condiments", "Tuna Tamari", gf=(None,None,"bottle")),
    item("Sauces & Condiments", "Duck Sauce", gf=(None,None,"bag")),
    item("Sauces & Condiments", "Onion Dressing", gf=(None,None,"bottle"), note="Check downstairs for details"),
    item("Sauces & Condiments", "Garlic Oil", gf=(None,None,"can")),
    item("Sauces & Condiments", "Cauliflower Sauce", gf=(None,None,"bag")),
    item("Sauces & Condiments", "Okinawa Shochu", gf=(None,None,"dispenser")),
    item("Sauces & Condiments", "Sweet Chili Sauce", gf=(None,None,"bottle"), closing="buy/fill/unsure"),
    item("Sauces & Condiments", "Kewpie Mayo", gf=(None,None,"bottle"), closing="buy/fill/unsure"),
    item("Sauces & Condiments", "Yuzu Kosho", gf=(None,None,"bottle"), closing="buy/fill/unsure"),
]

lines.append("insert into stock_items (section, name, gf_par_wd, gf_par_we, gf_unit, bw_par_wd, bw_par_we, bw_unit, bd_par_wd, bd_par_we, bd_unit, closing_options, closing_status, note, sort_order) values")
vals = []
for i, it in enumerate(stock):
    gf, bw, bd = it["gf"], it["bw"], it["bd"]
    row = "({section}, {name}, {gfwd}, {gfwe}, {gfu}, {bwwd}, {bwwe}, {bwu}, {bdwd}, {bdwe}, {bdu}, {closing}, '', {note}, {sort})".format(
        section=esc(it["section"]),
        name=esc(it["name"]),
        gfwd=esc_or_null(gf[0]), gfwe=esc_or_null(gf[1]), gfu=esc_or_null(gf[2]),
        bwwd=esc_or_null(bw[0]), bwwe=esc_or_null(bw[1]), bwu=esc_or_null(bw[2]),
        bdwd=esc_or_null(bd[0]), bdwe=esc_or_null(bd[1]), bdu=esc_or_null(bd[2]),
        closing=esc(it["closing"]),
        note=esc_or_null(it["note"]),
        sort=i+1,
    )
    vals.append(row)
lines.append(",\n".join(vals) + ";")
lines.append("")

# ---------- Menu (from the provided menu JSON) ----------
menu_json = r'''
{
  "categories": [
    {
      "id": "starters",
      "name": "STARTERS & SMALL DISHES",
      "dishes": [
        {
          "id": "oysters",
          "name": "Oysters",
          "nameJp": "生牡蠣",
          "tags": [],
          "serving": "Serve with yuzu ponzu, grated radish with chili pepper and spring onion.",
          "prep": "Prep yuzu ponzu. Grate radish. Slice spring onion. Plate 3–6 oysters per order.",
          "image": "images/dishes/oysters.jpg"
        },
        {
          "id": "edamame-aglio-olio",
          "name": "Edamame 'Aglio Olio'",
          "nameJp": "黒えだまめ",
          "tags": ["vegan"],
          "serving": "Steamed green soybeans with red pepper and garlic.",
          "prep": "Steam edamame. Toss with garlic, chili, oil.",
          "image": "images/dishes/edamame.jpg"
        },
        {
          "id": "salad-white-miso",
          "name": "Salad with White Miso Dressing",
          "nameJp": "白味噌ドレッシングのサラダ",
          "tags": ["vegan"],
          "serving": "Green salad with cucumber, radish and white miso dressing.",
          "prep": "Prep miso dressing. Cut cucumber and radish.",
          "image": "images/dishes/salad-miso.jpg"
        },
        {
          "id": "udon-crisps",
          "name": "Udon Crisps, Mayo & Sweet Chili Sauce",
          "nameJp": "うどんクリスプ",
          "tags": ["vegetarian"],
          "serving": "Crispy udon with kewpie mayo and sweet chili sauce.",
          "prep": "Fry udon crisps. Portion mayo and sweet chili.",
          "image": "images/dishes/udon-crisps.jpg"
        },
        {
          "id": "cauliflower-karaage",
          "name": "Cauliflower Karaage",
          "nameJp": "カリフラワーの唐揚げ",
          "tags": ["vegan"],
          "serving": "Fried cauliflower with celeriac flavored white miso sauce.",
          "prep": "Batter and fry cauliflower. Prep celeriac miso sauce.",
          "image": "images/dishes/cauliflower-karaage.jpg"
        },
        {
          "id": "chicken-tempura",
          "name": "Chicken Tempura (4 pcs)",
          "nameJp": "とりの天ぷら",
          "tags": [],
          "serving": "Lightly fried chicken tempura with tsuyu dipping sauce.",
          "prep": "Prep chicken tempura batch. Tsuyu in small dish.",
          "image": "images/dishes/chicken-tempura.jpg"
        },
        {
          "id": "shrimp-tempura",
          "name": "Shrimp Tempura (4 pcs)",
          "nameJp": "海老の天ぷら",
          "tags": [],
          "serving": "Lightly fried shrimp tempura with tsuyu dipping sauce.",
          "prep": "Prep shrimp tempura. Tsuyu in small dish.",
          "image": "images/dishes/shrimp-tempura.jpg"
        },
        {
          "id": "fish-tartare",
          "name": "Fish Tartare",
          "nameJp": "魚介のタルタル",
          "tags": [],
          "serving": "Scallop and salmon tartare with orange zest, wasabi, spring onion.",
          "prep": "Dice fish. Mix with zest, wasabi, spring onion. Chill.",
          "image": "images/dishes/fish-tartare.jpg"
        }
      ]
    },
    {
      "id": "sushi",
      "name": "SUSHI",
      "note": "Min 2 rolls per sort. Price per roll. All rolls served with nori, wasabi and nikiri.",
      "dishes": [
        { "id": "inarizushi", "name": "Inarizushi", "nameJp": "いなり寿司", "tags": ["vegan"], "serving": "Seasoned fried tofu, shiso, sesame seeds.", "prep": "Fill inari pockets. Top with shiso and sesame.", "image": "images/dishes/inarizushi.jpg" },
        { "id": "guacamole-temaki", "name": "Guacamole Temaki", "nameJp": "ワカモレ手巻き寿司", "tags": ["vegan"], "serving": "Handroll with guacamole, cucumber and beetroot.", "prep": "Roll by hand with nori.", "image": "images/dishes/guacamole-temaki.jpg" },
        { "id": "salmon-temaki", "name": "Salmon 'Open' Temaki", "nameJp": "サーモン手巻き寿司", "tags": [], "serving": "Handroll with salmon, cucumber, shiso, trout roe.", "prep": "Open temaki style — fish visible on top.", "image": "images/dishes/salmon-temaki.jpg" },
        { "id": "unagi-temaki", "name": "Unagi 'Open' Temaki", "nameJp": "鰻の手巻き寿司", "tags": [], "serving": "Handroll with grilled eel, cucumber and sansho.", "prep": "Warm eel. Roll open style.", "image": "images/dishes/unagi-temaki.jpg" },
        { "id": "hotate-temaki", "name": "Hotate 'Open' Temaki", "nameJp": "ホタテの手巻き寿司", "tags": [], "serving": "Handroll with scallop, cucumber, shiso and trout roe.", "prep": "Slice scallop. Open temaki.", "image": "images/dishes/hotate-temaki.jpg" },
        { "id": "kihada-temaki", "name": "Kihada Maguro 'Open' Temaki", "nameJp": "マグロ赤身の手巻き寿司", "tags": [], "serving": "Handroll with yellowfin tuna, cucumber and shiso.", "prep": "Slice tuna. Open temaki.", "image": "images/dishes/kihada-temaki.jpg" },
        { "id": "sushi-mix", "name": "Sushi Mix (5 pcs)", "nameJp": "手巻き寿司といなり寿司の盛り合わせ", "tags": [], "serving": "Mix of all temaki and inarizushi.", "prep": "Plate assortment per spec.", "image": "images/dishes/sushi-mix.jpg" }
      ]
    },
    {
      "id": "sashimi",
      "name": "SASHIMI",
      "note": "All sashimi served with kizami wasabi and nikiri.",
      "dishes": [
        { "id": "salmon-sashimi", "name": "Salmon Sashimi", "nameJp": "サーモンの刺身", "tags": [], "serving": "Sashimi of salmon.", "prep": "Slice salmon. Plate with wasabi and nikiri.", "image": "images/dishes/salmon-sashimi.jpg" },
        { "id": "kihada-sashimi", "name": "Kihada Maguro Sashimi", "nameJp": "キハダマグロの刺身", "tags": [], "serving": "Sashimi of yellowfin tuna.", "prep": "Slice tuna. Standard sashimi plate.", "image": "images/dishes/kihada-sashimi.jpg" },
        { "id": "hotate-sashimi", "name": "Hotate Sashimi", "nameJp": "ホタテの刺身", "tags": [], "serving": "Sashimi of scallop.", "prep": "Slice scallop. Standard sashimi plate.", "image": "images/dishes/hotate-sashimi.jpg" },
        { "id": "sashimi-mix", "name": "Sashimi Mix", "nameJp": "刺身の盛り合わせ", "tags": [], "serving": "Yellowfin tuna, salmon and scallop.", "prep": "Portion all three fish. Mixed plate.", "image": "images/dishes/sashimi-mix.jpg" }
      ]
    },
    {
      "id": "okazu",
      "name": "OKAZU",
      "note": "Sharing dishes — can be main with rice for 2.",
      "dishes": [
        { "id": "txuleton", "name": "Txuleton (1kg, 3–4 persons)", "nameJp": "チュレトンビーフステーキ", "tags": [], "serving": "Pan-fried dry-aged Basque beef with red wine teriyaki. Reserve 1 day ahead.", "prep": "Rest meat. Sauce separately.", "image": "images/dishes/txuleton.jpg" },
        { "id": "entrecote-tataki", "name": "Entrecote Tataki", "nameJp": "サーロインステーキ", "tags": [], "serving": "Entrecote with red wine teriyaki.", "prep": "Sear rare. Slice tataki style.", "image": "images/dishes/entrecote-tataki.jpg" },
        { "id": "kamo-roast", "name": "Kamo Roast", "nameJp": "鴨ロースト", "tags": [], "serving": "Smoked and baked duck with kamo sauce.", "prep": "Roast duck breast. Kamo sauce warm.", "image": "images/dishes/kamo-roast.jpg" },
        { "id": "tuna-katsu", "name": "Tuna Katsu", "nameJp": "マグロ赤身のレアカツ", "tags": [], "serving": "Panko breaded tuna served rare with tamari.", "prep": "Quick fry — rare center.", "image": "images/dishes/tuna-katsu.jpg" },
        { "id": "vegetable-kakiage", "name": "Vegetable Kakiage", "nameJp": "野菜のかき揚げ", "tags": ["vegan"], "serving": "Kakiage of carrots and onion with watercress.", "prep": "Mix batter. Fry in clusters.", "image": "images/dishes/vegetable-kakiage.jpg" }
      ]
    },
    {
      "id": "udon-soup",
      "name": "UDON SOUP",
      "note": "Noodle soup with dashi broth and various toppings.",
      "dishes": [
        { "id": "niku-udon", "name": "Niku Udon", "nameJp": "肉うどん", "tags": [], "serving": "Simmered lightly sweet beef, ginger, soft boiled egg.", "prep": "Heat niku. Cook noodles. Assemble bowl.", "image": "images/dishes/niku-udon.jpg" },
        { "id": "okinawa-udon", "name": "Okinawa Udon", "nameJp": "沖縄うどん", "tags": ["limited"], "serving": "Char siu, soft egg, pink ginger, chili shochu.", "prep": "Limited availability — check stock.", "image": "images/dishes/okinawa-udon.jpg" },
        { "id": "kamo-udon", "name": "Kamo Udon", "nameJp": "鴨うどん", "tags": [], "serving": "Smoked and fried duck breast with leek.", "prep": "Slice duck. Leek garnish.", "image": "images/dishes/kamo-udon.jpg" },
        { "id": "shrimp-tempura-udon", "name": "Shrimp Tempura Udon", "nameJp": "海老天うどん", "tags": [], "serving": "Shrimp and vegetable tempura on udon.", "prep": "Fry tempura to order. Hot broth.", "image": "images/dishes/shrimp-tempura-udon.jpg" },
        { "id": "chicken-tempura-udon", "name": "Chicken Tempura Udon", "nameJp": "とり天うどん", "tags": [], "serving": "Chicken and vegetable tempura on udon.", "prep": "Fry tempura. Assemble bowl.", "image": "images/dishes/chicken-tempura-udon.jpg" },
        { "id": "vegetable-kakiage-udon", "name": "Vegetable Kakiage Udon", "nameJp": "野菜のかき揚げうどん", "tags": ["vegan optional"], "serving": "Kakiage of vegetables on udon.", "prep": "Fry kakiage. Vegan broth if requested.", "image": "images/dishes/vegetable-kakiage-udon.jpg" },
        { "id": "kitsune-udon", "name": "Kitsune Udon", "nameJp": "キツネうどん", "tags": ["vegan optional"], "serving": "Fried and seasoned tofu on udon.", "prep": "Heat inari/tofu. Vegan broth if requested.", "image": "images/dishes/kitsune-udon.jpg" }
      ]
    },
    {
      "id": "bk-udon",
      "name": "BK UDON",
      "note": "Cold udon with chilled broth served on the side.",
      "dishes": [
        { "id": "bk-niku-udon", "name": "BK Niku Udon", "nameJp": "肉ぶっかけうどん", "tags": [], "serving": "Cold niku udon. Broth chilled, served separately.", "prep": "Chill noodles and broth.", "image": "images/dishes/bk-niku-udon.jpg" },
        { "id": "bk-shrimp-udon", "name": "BK Shrimp Tempura Udon", "nameJp": "海老天ぶっかけうどん", "tags": [], "serving": "Cold udon with shrimp tempura.", "prep": "Tempura fresh. Broth cold on side.", "image": "images/dishes/bk-shrimp-udon.jpg" },
        { "id": "bk-chicken-udon", "name": "BK Chicken Tempura Udon", "nameJp": "とり天ぶっかけうどん", "tags": [], "serving": "Cold udon with chicken tempura.", "prep": "Same as BK shrimp — cold assembly.", "image": "images/dishes/bk-chicken-udon.jpg" },
        { "id": "bk-sashimi-udon", "name": "BK Sashimi Udon", "nameJp": "刺身ぶっかけうどん", "tags": [], "serving": "Cold udon with sashimi topping.", "prep": "Slice fish fresh. Cold broth side.", "image": "images/dishes/bk-sashimi-udon.jpg" },
        { "id": "bk-vegetable-kakiage-udon", "name": "BK Vegetable Kakiage Udon", "nameJp": "野菜のかき揚げぶっかけうどん", "tags": ["vegan optional"], "serving": "Cold udon with vegetable kakiage.", "prep": "Kakiage crispy. Vegan option available.", "image": "images/dishes/bk-vegetable-kakiage-udon.jpg" }
      ]
    },
    {
      "id": "donburi",
      "name": "DONBURI / RICE BOWL",
      "dishes": [
        { "id": "donburi-niku", "name": "Donburi Niku with Soft Boiled Egg", "nameJp": "温玉乗せ牛丼", "tags": [], "serving": "Simmered beef, ginger, soft boiled egg on rice.", "prep": "Heat niku. Rice base. Egg on top.", "image": "images/dishes/donburi-niku.jpg" },
        { "id": "donburi-shrimp", "name": "Donburi Shrimp Tempura", "nameJp": "海老天丼", "tags": [], "serving": "Rice bowl with shrimp and vegetable tempura.", "prep": "Fry tempura. Sauce over rice.", "image": "images/dishes/donburi-shrimp.jpg" },
        { "id": "donburi-chicken", "name": "Donburi Chicken Tempura", "nameJp": "とり天丼", "tags": [], "serving": "Rice bowl with chicken and vegetable tempura.", "prep": "Fry tempura. Assemble donburi.", "image": "images/dishes/donburi-chicken.jpg" },
        { "id": "donburi-kakiage", "name": "Donburi Vegetable Kakiage", "nameJp": "野菜のかき揚げ丼", "tags": ["vegan"], "serving": "Rice bowl with vegetable kakiage.", "prep": "Fry kakiage. Plate on rice.", "image": "images/dishes/donburi-kakiage.jpg" },
        { "id": "donburi-sashimi", "name": "Donburi Sashimi", "nameJp": "海鮮丼", "tags": [], "serving": "Tuna, salmon, scallop sashimi with wasabi and nikiri.", "prep": "Slice fish. Over seasoned rice.", "image": "images/dishes/donburi-sashimi.jpg" }
      ]
    },
    {
      "id": "extra",
      "name": "EXTRA",
      "dishes": [
        { "id": "add-noodles", "name": "Add Noodles", "nameJp": "麺大盛り", "tags": [], "serving": "Extra portion of udon noodles.", "prep": "Boil extra serving.", "image": null },
        { "id": "add-egg", "name": "Add Soft Boiled Egg", "nameJp": "温泉卵", "tags": [], "serving": "One soft boiled egg.", "prep": "From egg batch.", "image": null },
        { "id": "bowl-rice", "name": "Bowl of White Rice", "nameJp": "ご飯", "tags": [], "serving": "Steamed white rice.", "prep": "From rice cooker.", "image": null },
        { "id": "kizami-wasabi", "name": "Kizami Wasabi", "nameJp": "刻みわさび漬け", "tags": [], "serving": "Side of kizami wasabi.", "prep": "Portion from prep container.", "image": null },
        { "id": "yuzu-kosho", "name": "Yuzu Kosho", "nameJp": "柚子胡椒", "tags": [], "serving": "Side of yuzu kosho.", "prep": "Portion.", "image": null },
        { "id": "kewpie-mayo", "name": "Kewpie Mayo", "nameJp": "キューピーマヨネーズ", "tags": [], "serving": "Side of kewpie mayo.", "prep": "Squeeze bottle.", "image": null },
        { "id": "fish-miso-soup", "name": "Fish Miso Soup", "nameJp": "魚の赤だ", "tags": [], "serving": "Fish miso soup.", "prep": "Heat soup. Garnish.", "image": "images/dishes/fish-miso-soup.jpg" }
      ]
    },
    {
      "id": "lunch-deal",
      "name": "LUNCH DEAL (TILL 17:00)",
      "dishes": [
        { "id": "lunch-temaki-add", "name": "Add 1 Temaki (Salmon/Eel/Tuna/Scallop)", "tags": [], "serving": "One temaki roll — salmon, eel, tuna, or scallop.", "prep": "Roll to order.", "image": null },
        { "id": "lunch-inari-add", "name": "Add 1 Inarizushi", "tags": [], "serving": "One piece of inarizushi.", "prep": "From prep.", "image": null }
      ]
    },
    {
      "id": "desserts",
      "name": "DESSERTS",
      "dishes": [
        { "id": "black-sesame-mochi", "name": "Black Sesame Mochi Ice", "nameJp": "黒ゴマもちアイス", "tags": [], "serving": "Serve frozen mochi ice.", "prep": "Pull from freezer. Plate.", "image": "images/dishes/black-sesame-mochi.jpg" },
        { "id": "miso-chococake", "name": "Miso Chococake", "nameJp": "味噌チョコケーキ", "tags": [], "serving": "Slice and plate.", "prep": "From dessert prep.", "image": "images/dishes/miso-chococake.jpg" },
        { "id": "basque-cheesecake", "name": "Basque Cheesecake", "nameJp": "バスクチーズケーキ", "tags": [], "serving": "Slice and plate.", "prep": "Room temp or lightly chilled.", "image": "images/dishes/basque-cheesecake.jpg" },
        { "id": "matcha-creme-brulee", "name": "Matcha Creme Brulée", "nameJp": "抹茶のクリームブリュレ", "tags": [], "serving": "Torch sugar top if needed.", "prep": "From fridge. Brulée to order.", "image": "images/dishes/matcha-creme-brulee.jpg" }
      ]
    }
  ]
}
'''
menu = json.loads(menu_json)

lines.append("-- Menu categories")
lines.append("insert into menu_categories (id, name, note, sort_order) values")
cat_vals = []
cat_ids = {}
for i, cat in enumerate(menu["categories"]):
    cat_ids[cat["id"]] = cat["id"]  # reuse slug as uuid text won't work; use gen_random_uuid via separate id col instead
lines_cat = []
# We generate deterministic uuids by inserting with default and then looking up by name is fragile;
# instead insert using a fixed mapping: use uuid5-like approach isn't native SQL, so we just let Postgres
# generate ids and re-derive dish->category linkage via name matching in a second pass using a CTE.
lines.pop()  # remove the incomplete insert header line, we'll do it properly below
lines.pop()

lines.append("with new_categories as (")
lines.append("  insert into menu_categories (name, note, sort_order) values")
cat_rows = []
for i, cat in enumerate(menu["categories"]):
    cat_rows.append(f"    ({esc(cat['name'])}, {esc_or_null(cat.get('note'))}, {i+1})")
lines.append(",\n".join(cat_rows))
lines.append("  returning id, name, sort_order")
lines.append(")")
lines.append("select 1;")
lines.append("")

# Now insert dishes by joining on category name + sort_order (name is unique enough here)
lines.append("-- Menu dishes (joined to the category we just inserted, matched by name)")
dish_sort = 0
for cat in menu["categories"]:
    cat_name = cat["name"]
    for dish in cat["dishes"]:
        dish_sort += 1
        tags = dish.get("tags") or []
        tags_sql = "ARRAY[" + ",".join(esc(t) for t in tags) + "]::text[]" if tags else "'{}'::text[]"
        lines.append(
            "insert into menu_dishes (category_id, name, name_jp, tags, serving, prep, image_path, sort_order) "
            "select id, {name}, {name_jp}, {tags}, {serving}, {prep}, {image}, {sort} from menu_categories where name = {cat_name} limit 1;".format(
                name=esc(dish["name"]),
                name_jp=esc_or_null(dish.get("nameJp")),
                tags=tags_sql,
                serving=esc_or_null(dish.get("serving")),
                prep=esc_or_null(dish.get("prep")),
                image=esc_or_null(dish.get("image")),
                sort=dish_sort,
                cat_name=esc(cat_name),
            )
        )
lines.append("")

with open("seed.sql", "w") as f:
    f.write("\n".join(lines))

print("wrote seed.sql with", len(stock), "stock items and", dish_sort, "dishes")
