# KirayaSaathi website

Public marketing website for the KirayaSaathi property management app.
Built with **Next.js 15 (App Router)** and **Tailwind CSS 3**. Includes light and dark mode, scroll animations, blog (markdown files), reviews and free-trial forms (Supabase), SEO (metadata, sitemap, robots, structured data, share image) and a hidden app download page.

## Pages
| Address | What |
|---|---|
| `/` | Home: hero, features, how it works, pricing, blog slider, reviews slider, FAQ |
| `/pricing` | Plans and pricing questions |
| `/blog`, `/blog/<slug>` | Blog list with filters, and each article |
| `/reviews` | Approved reviews and a form to write one |
| `/contact` | Free-trial request form |
| `/privacy`, `/terms` | Draft policy pages (have a lawyer review them) |
| `/download` | Hidden (not in the menu, not in Google). Send it only to approved owners |

## 1. Run it on your computer
```
npm install
cp .env.example .env.local      (Windows: copy .env.example .env.local)
npm run dev
```
Open http://localhost:3000. Fill `.env.local` first (see the comments inside `.env.example`).

## 2. Set up the database (reviews and trial requests)
Supabase > SQL Editor > New query > paste `supabase/website.sql` > Run. Use the same Supabase project as the app.
The website can only **add** reviews (as "pending") and trial requests. It can read only reviews you published. Nothing else is exposed.

## 3. Your daily work (SQL Editor, until you build the admin panel)
```sql
select * from trial_requests order by created_at desc;                       -- who asked for a trial
update trial_requests set status = 'contacted' where id = 1;
select * from reviews where status = 'pending' order by created_at desc;     -- reviews waiting for you
update reviews set status = 'published' where id = 1;                        -- approve a review (shows on the site within about 5 minutes)
update reviews set status = 'hidden' where id = 1;                           -- hide it
```
After you create an owner's login, tell them the app link, their email and password (see the app's `SUPABASE_SETUP.md`).

## 4. Add a blog article
Create a file in `content/blog/`, for example `my-new-article.md`:
```
---
title: "Your title (about 60 characters)"
description: "One or two sentences that appear on Google (under 160 characters)."
category: "Rent"
date: "2026-12-01"
emoji: "📝"
keywords: ["keyword one", "keyword two"]
---

Your article in plain text. Use ## for headings and - for lists.
```
The page address is `/blog/my-new-article`. It appears in the blog, the sitemap and the slider on its own. Keep writing: 2 to 4 helpful articles a month is better for Google than many short ones.

## 5. Change text, prices and questions
Everything is in `src/lib/site.ts`: company name, tagline, WhatsApp number, plans and prices, features, steps and FAQ. Keep the plans in step with the app (`src/utils/plans.ts` in the app).

## 6. Put it online (free)
1. Put this folder on GitHub (a private repository is fine).
2. Go to vercel.com, sign in with GitHub, click **Add New > Project**, pick the repository and add the environment variables from `.env.example`.
3. Click **Deploy**.
4. Buy your domain (for example kirayasaathi.in). In Vercel: Project > Settings > Domains > add it, then copy the DNS records Vercel shows into your domain provider. Set `NEXT_PUBLIC_SITE_URL` to your real domain and redeploy.

## 7. Get found on Google
1. Open Google Search Console, add your domain, and copy the verification code into `NEXT_PUBLIC_GOOGLE_VERIFICATION`, then redeploy.
2. Submit `https://yourdomain/sitemap.xml` in Search Console.
3. Create a free Google Business Profile if you have an office.
4. Share your articles on WhatsApp and social media, and ask happy owners to write a review on the site.
5. SEO is slow: expect weeks or months. Publishing helpful articles regularly is the best thing you can do.

## 8. The app download link
Upload the APK (Supabase Storage public bucket, Google Drive or GitHub Releases), set `NEXT_PUBLIC_APK_URL`, and send `https://yourdomain/download` only to owners you approved. They still need a login from you.

## Notes
- The WhatsApp number comes from `NEXT_PUBLIC_WHATSAPP` (digits with country code, for example 919876543210).
- The forms have a hidden spam trap and a small rate limit. For heavy traffic add a captcha later.
- The admin panel will be a separate project that uses the Supabase service key on its own server. Never put that key in this website.
- Run `npm run build` once on your computer before deploying to catch any mistakes.
