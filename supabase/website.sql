-- =====================================================================
-- KirayaSaathi WEBSITE tables (reviews and free-trial requests)
-- Run once in the same Supabase project as the app: SQL Editor > New query > paste > Run.
-- Safe to run again.
-- =====================================================================

-- ---------- reviews ----------
create table if not exists public.reviews (
  id          bigint generated always as identity primary key,
  name        text not null check (char_length(name) between 2 and 80),
  property    text check (property is null or char_length(property) <= 80),
  rating      integer not null check (rating between 1 and 5),
  text        text not null check (char_length(text) between 10 and 800),
  status      text not null default 'pending' check (status in ('pending','published','hidden')),
  created_at  timestamptz not null default now()
);
alter table public.reviews enable row level security;

drop policy if exists "anyone reads published reviews" on public.reviews;
drop policy if exists "anyone sends a pending review" on public.reviews;
create policy "anyone reads published reviews" on public.reviews for select to anon, authenticated using (status = 'published');
create policy "anyone sends a pending review"  on public.reviews for insert to anon, authenticated with check (status = 'pending');

revoke all on public.reviews from anon, authenticated;
grant select (id, name, property, rating, text, created_at, status) on public.reviews to anon, authenticated;
grant insert (name, property, rating, text, status) on public.reviews to anon, authenticated;

-- ---------- free-trial requests (the website can only add rows, never read them) ----------
create table if not exists public.trial_requests (
  id             bigint generated always as identity primary key,
  name           text not null check (char_length(name) between 2 and 80),
  phone          text not null check (phone ~ '^[6-9][0-9]{9}$'),
  city           text not null check (char_length(city) between 2 and 60),
  property_type  text check (property_type is null or char_length(property_type) <= 40),
  units          text check (units is null or char_length(units) <= 20),
  message        text check (message is null or char_length(message) <= 500),
  status         text not null default 'new' check (status in ('new','contacted','created','closed')),
  created_at     timestamptz not null default now()
);
alter table public.trial_requests enable row level security;

drop policy if exists "anyone sends a trial request" on public.trial_requests;
create policy "anyone sends a trial request" on public.trial_requests for insert to anon, authenticated with check (status = 'new');

revoke all on public.trial_requests from anon, authenticated;
grant insert (name, phone, city, property_type, units, message) on public.trial_requests to anon, authenticated;

-- ---------- how YOU manage them (SQL Editor, or later the admin panel) ----------
--   select * from trial_requests order by created_at desc;                         -- new requests
--   update trial_requests set status = 'contacted' where id = 1;
--   select * from reviews where status = 'pending' order by created_at desc;       -- reviews waiting
--   update reviews set status = 'published' where id = 1;                           -- approve
--   update reviews set status = 'hidden' where id = 1;                              -- hide
--   delete from reviews where id = 1;                                               -- remove
notify pgrst, 'reload schema';
