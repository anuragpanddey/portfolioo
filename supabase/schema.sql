-- Run this in the Supabase SQL Editor (SQL Editor -> New query -> paste -> Run)

-- ============================================================================
-- assets: key/value registry for single-slot assets (hero video, hero
-- fallback image, about photo, blog post images)
-- ============================================================================
create table if not exists public.assets (
  key text primary key,
  storage_path text not null,
  alt_text text,
  updated_at timestamptz not null default now()
);

alter table public.assets enable row level security;

create policy "Public read access on assets"
  on public.assets
  for select
  to anon, authenticated
  using (true);

-- ============================================================================
-- gallery_items: the portfolio/masonry grid collection
-- ============================================================================
create table if not exists public.gallery_items (
  id bigint generated always as identity primary key,
  title text not null,
  category text not null,
  storage_path text not null,
  media_type text not null check (media_type in ('image', 'video')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "Public read access on gallery_items"
  on public.gallery_items
  for select
  to anon, authenticated
  using (true);
