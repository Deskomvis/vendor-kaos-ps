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
