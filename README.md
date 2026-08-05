# Niko Udon — Kitchen App

A 3-tab kitchen reference app: Opening/Closing checklists, Stock Check, and Menu (prep + presentation). Built so **you or staff can edit content directly in the app** (no code needed) — you'll only touch code/GitHub once, during setup.

Stack: Next.js (React) + Supabase (database) + Vercel (hosting). All free tiers.

This guide assumes zero coding background. Follow it in order — each step builds on the last.

## What you already have

- An empty GitHub repo
- This project folder (`niko-udon-app`)

## What you still need to create (both free)

1. A Supabase account — the database that stores your checklists, stock list, and menu, and lets the app update instantly when you edit.
2. A Vercel account — hosts the live app and redeploys automatically when code changes.

---

## Step 1 — Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → sign up (GitHub login is easiest) → **New project**.
2. Name it `niko-udon`, set a database password (save it somewhere), pick a region close to the Netherlands, and create it. Takes ~2 minutes to spin up.
3. Once it's ready, open the **SQL Editor** (left sidebar) → **New query**.
4. Open `supabase/schema.sql` from this project, copy all of it, paste into the SQL editor, click **Run**. This creates the 4 tables the app needs.
5. Open a second new query, copy all of `supabase/seed.sql`, paste it, click **Run**. This loads your real stock list (from your two CSVs) and full menu (54 dishes) into the database, plus a starter opening/closing checklist you can edit.
6. Go to **Project Settings → API**. You'll need two values for Step 3:
   - **Project URL**
   - **anon public** key

## Step 2 — Push this code to your GitHub repo

Open a terminal (Mac: Terminal app) and run, one line at a time, replacing the repo URL with yours:

```bash
cd path/to/niko-udon-app
git init
git add .
git commit -m "Initial prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

If you're not sure how to open a terminal in this folder: on Mac, right-click the `niko-udon-app` folder → "New Terminal at Folder" (or open Terminal and type `cd ` then drag the folder in, then press Enter).

## Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → sign up with GitHub → **Add New → Project**.
2. Select your `niko-udon` GitHub repo → **Import**.
3. Before clicking Deploy, expand **Environment Variables** and add three:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | the Project URL from Step 1.6 |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | the anon public key from Step 1.6 |
   | `ADMIN_PIN` | a PIN you choose, e.g. `4821` — this locks the staff-edit screens |

4. Click **Deploy**. In ~1 minute you'll get a live URL like `niko-udon.vercel.app`. Bookmark it on the kitchen tablet/phone.

From now on: any time you `git push` a code change, Vercel redeploys automatically. But for day-to-day content edits (menu, stock, checklists) you won't touch code at all — see Step 4.

## Step 4 — Editing content day-to-day

Open the app → tap **Staff edit** at the bottom → enter the PIN you set as `ADMIN_PIN`. From there you can add/edit/delete:

- Opening and closing checklist items
- Stock items (name, par amounts, unit, location, notes)
- Menu categories and dishes (name, Japanese name, tags, serving instructions, prep instructions, image path)

Changes save straight to the database and appear for all staff immediately — no redeploy needed.

## Adding real dish photos

Each dish has an "image path" like `images/dishes/oysters.jpg`. To add a real photo:

1. Name your photo file exactly that (e.g. `oysters.jpg`).
2. Drop it into the `public/images/dishes/` folder in this project.
3. `git add`, `git commit`, `git push` — Vercel redeploys and the photo appears automatically.

(This is the one content type that goes through GitHub instead of the in-app editor, because photo uploads need a bit more setup — Supabase Storage — that's a good next step once the core app is running. Ask me when you're ready and I'll wire it up.)

## What's in the Stock Check tab, and how to read it

Your two prep-checker spreadsheets used **WD** (Sunday–Wednesday) and **WE** (Thursday–Saturday) target quantities per location. The app carries this over exactly:

- Each item shows par targets for **Ground floor** (upstairs counter), **Basement walk-in**, and **Basement defrost**, each with its own unit (box, bottle, pack, etc).
- The app automatically bolds whichever column (WD or WE) matches today's date.
- The closing dropdown mirrors your original prep・fill・? (or buy・fill・?) options.
- The `[!]` move-frozen-stock notes from your sheets are preserved as notes on the relevant items.

This was transcribed directly from `PREP CHECKER - tempura.csv` and `PREP CHECKER - udon.csv` — double check it in Staff Edit before relying on it for a live shift, in case anything got mis-copied.

## Known limitations of this prototype (fine to leave for now, flag if they bug you)

- **Security is minimal.** The PIN only gates the `/admin` pages in the browser — the database itself accepts writes from anyone with the app's web address, since kitchen staff won't have logins. This is fine for an internal, unlisted-URL tool but isn't real security. If the URL ever leaks publicly, tighten this (ask me — it involves adding real Supabase logins).
- **Checklist/stock checkboxes don't reset automatically.** Use the "Reset all" button each morning, or ask me to add an automatic daily reset later.
- **No photos yet** — placeholders show until you add real images (see above).
- **No drag-to-reorder** in Staff Edit yet — new items go to the bottom; reordering means editing the `sort_order` number directly in Supabase for now.

## Local preview (optional, before deploying)

If you want to see it running on your own computer first:

```bash
cd niko-udon-app
npm install
cp .env.local.example .env.local   # then fill in your real Supabase URL/key and a PIN
npm run dev
```

Open `http://localhost:3000`.

---

Questions, anything confusing, or want changes (colors, extra fields, photo upload, daily reset, etc.) — just ask, and tell me which step you're stuck on if something doesn't work as described.
