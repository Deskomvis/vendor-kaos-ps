create table if not exists public.site_settings (
  id text primary key default 'default',
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
  on public.site_settings for select using (true);

create policy "Authenticated admins can manage site settings"
  on public.site_settings for all to authenticated using (true) with check (true);

insert into public.site_settings (id, content)
values ('default', '{}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.site_sections (
  id text primary key,
  title text not null default '',
  content jsonb not null default '{}'::jsonb,
  image_url text,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.site_sections enable row level security;
create policy "Public can read visible sections" on public.site_sections for select using (is_visible = true or auth.role() = 'authenticated');
create policy "Authenticated admins can manage sections" on public.site_sections for all to authenticated using (true) with check (true);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  storage_path text not null,
  public_url text not null,
  alt_text text not null default '',
  created_at timestamptz not null default now()
);

alter table public.media_assets enable row level security;
create policy "Public can read media assets" on public.media_assets for select using (true);
create policy "Authenticated admins can manage media assets" on public.media_assets for all to authenticated using (true) with check (true);

insert into public.site_sections (id, title, sort_order)
values
  ('hero', 'Hero', 1),
  ('brand-intro', 'Pengenalan brand', 2),
  ('order-form', 'Form pemesanan', 3),
  ('services', 'Layanan', 4),
  ('pricing', 'Price list', 5),
  ('promotions', 'Kartu promosi', 6),
  ('order-steps', 'Alur pemesanan', 7),
  ('portfolio', 'Portfolio', 8),
  ('client-proof', 'Logo partner', 9),
  ('footer', 'Footer', 10)
on conflict (id) do nothing;
