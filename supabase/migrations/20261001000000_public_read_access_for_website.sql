-- APPLIED to project qbnfgaspiaqdvtezbuyz on 2026-10-01.
-- Enables Row Level Security and gives the public (anon) role read-only access
-- so the website can load data with the publishable key. No write access is granted.

alter table public.company_profile enable row level security;
alter table public.licenses_and_registrations enable row level security;
alter table public.team_members enable row level security;
alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;

create policy "Public read" on public.company_profile for select to anon, authenticated using (true);
create policy "Public read" on public.licenses_and_registrations for select to anon, authenticated using (true);
create policy "Public read" on public.team_members for select to anon, authenticated using (true);
create policy "Public read" on public.clients for select to anon, authenticated using (true);
create policy "Public read" on public.projects for select to anon, authenticated using (true);
create policy "Public read" on public.project_images for select to anon, authenticated using (true);

-- company_profile: every column except bank_account.
grant select (id, name, established_year, type, address, telephone, email, services_offered, created_at, updated_at)
  on public.company_profile to anon, authenticated;
grant select on public.licenses_and_registrations, public.team_members, public.clients, public.projects, public.project_images
  to anon, authenticated;
