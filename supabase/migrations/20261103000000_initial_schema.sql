create table public.admins (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(trim(email))),
  created_at timestamptz not null default now()
);

create table public.health_check_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text not null,
  email text not null,
  phone text not null,
  employee_band text not null check (employee_band in ('1-10', '11-50', '51-150', '150+')),
  need text not null check (need in ('payroll', 'hr_consulting', 'both', 'not_sure')),
  message text,
  consent_contact boolean not null check (consent_contact),
  status text not null default 'new' check (status in ('new', 'contacted', 'booked', 'won', 'lost')),
  source_page text not null default '/contact',
  notes text,
  created_at timestamptz not null default now()
);

create table public.briefings (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  summary text not null,
  format text not null check (format in ('online', 'in_person')),
  topic text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  venue text,
  speaker_name text not null,
  speaker_role text not null,
  speaker_photo_url text,
  agenda text[] not null default '{}',
  capacity integer check (capacity is null or capacity > 0),
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at > starts_at),
  check (format <> 'in_person' or venue is not null)
);

create table public.briefing_registrations (
  id uuid primary key default gen_random_uuid(),
  briefing_id uuid not null references public.briefings(id) on delete cascade,
  full_name text not null,
  company text not null,
  role text not null,
  email text not null check (email = lower(trim(email))),
  phone text not null,
  consent_contact boolean not null check (consent_contact),
  attended boolean not null default false,
  created_at timestamptz not null default now(),
  unique (briefing_id, email)
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique check (email = lower(trim(email))),
  consent boolean not null check (consent),
  consent_text text not null,
  consented_at timestamptz not null default now(),
  unsubscribed_at timestamptz,
  unsubscribe_token text not null unique,
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null,
  body_md text not null,
  category text not null check (category in ('Payroll', 'Employment law', 'Data protection', 'HR practice')),
  author_name text not null,
  cover_url text,
  published_at timestamptz,
  published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not published or published_at is not null)
);

create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  phone text not null,
  photo_url text,
  bio text,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  client_name text not null,
  client_role text not null,
  company text not null,
  photo_url text,
  consent_confirmed boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not published or consent_confirmed)
);

create table public.client_logos (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  logo_url text not null,
  website_url text,
  consent_confirmed boolean not null default false,
  sort_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (not published or consent_confirmed)
);

create table public.submission_rate_limits (
  ip_hash text primary key check (ip_hash ~ '^[a-f0-9]{64}$'),
  window_started_at timestamptz not null default now(),
  submission_count integer not null default 1 check (submission_count > 0)
);

create index briefings_published_starts_at_idx
  on public.briefings (starts_at)
  where published;
create index posts_published_date_idx
  on public.posts (published_at desc)
  where published;
create index team_members_published_order_idx
  on public.team_members (sort_order)
  where published;
create index testimonials_published_order_idx
  on public.testimonials (sort_order)
  where published and consent_confirmed;
create index client_logos_published_order_idx
  on public.client_logos (sort_order)
  where published and consent_confirmed;
create index briefing_registrations_briefing_id_idx
  on public.briefing_registrations (briefing_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger briefings_set_updated_at
before update on public.briefings
for each row execute function public.set_updated_at();

create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create trigger team_members_set_updated_at
before update on public.team_members
for each row execute function public.set_updated_at();

create trigger testimonials_set_updated_at
before update on public.testimonials
for each row execute function public.set_updated_at();

create trigger client_logos_set_updated_at
before update on public.client_logos
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_temp
as $$
  select exists (
    select 1
    from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated, service_role;

create or replace function public.consume_submission_rate_limit(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_count integer;
begin
  if p_ip_hash !~ '^[a-f0-9]{64}$' then
    raise exception using errcode = '22023', message = 'invalid_ip_hash';
  end if;

  insert into public.submission_rate_limits (ip_hash, window_started_at, submission_count)
  values (p_ip_hash, now(), 1)
  on conflict (ip_hash) do update
  set
    window_started_at = case
      when public.submission_rate_limits.window_started_at <= now() - interval '10 minutes'
        then now()
      else public.submission_rate_limits.window_started_at
    end,
    submission_count = case
      when public.submission_rate_limits.window_started_at <= now() - interval '10 minutes'
        then 1
      else public.submission_rate_limits.submission_count + 1
    end
  returning submission_count into current_count;

  return current_count <= 5;
end;
$$;

revoke all on function public.consume_submission_rate_limit(text) from public, anon, authenticated;
grant execute on function public.consume_submission_rate_limit(text) to service_role;

create or replace function public.register_briefing(
  p_briefing_id uuid,
  p_full_name text,
  p_company text,
  p_role text,
  p_email text,
  p_phone text,
  p_consent_contact boolean
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  selected_briefing public.briefings%rowtype;
  registration_id uuid;
begin
  if not p_consent_contact then
    raise exception using errcode = '22023', message = 'consent_required';
  end if;

  select *
    into selected_briefing
    from public.briefings
   where id = p_briefing_id
     and published
   for update;

  if not found or selected_briefing.starts_at <= now() then
    raise exception using errcode = 'P0001', message = 'briefing_closed';
  end if;

  if selected_briefing.capacity is not null and (
    select count(*)
      from public.briefing_registrations
     where briefing_id = p_briefing_id
  ) >= selected_briefing.capacity then
    raise exception using errcode = 'P0001', message = 'briefing_full';
  end if;

  insert into public.briefing_registrations (
    briefing_id,
    full_name,
    company,
    role,
    email,
    phone,
    consent_contact
  )
  values (
    p_briefing_id,
    trim(p_full_name),
    trim(p_company),
    trim(p_role),
    lower(trim(p_email)),
    trim(p_phone),
    true
  )
  returning id into registration_id;

  return registration_id;
exception
  when unique_violation then
    raise exception using errcode = 'P0001', message = 'already_registered';
end;
$$;

revoke all on function public.register_briefing(uuid, text, text, text, text, text, boolean)
  from public, anon, authenticated;
grant execute on function public.register_briefing(uuid, text, text, text, text, text, boolean)
  to service_role;

alter table public.admins enable row level security;
alter table public.health_check_requests enable row level security;
alter table public.briefings enable row level security;
alter table public.briefing_registrations enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.posts enable row level security;
alter table public.team_members enable row level security;
alter table public.testimonials enable row level security;
alter table public.client_logos enable row level security;
alter table public.submission_rate_limits enable row level security;

create policy "admins manage admin records"
  on public.admins for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins manage health check requests"
  on public.health_check_requests for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "published briefings are readable"
  on public.briefings for select to anon, authenticated
  using (published);
create policy "admins manage briefings"
  on public.briefings for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins manage briefing registrations"
  on public.briefing_registrations for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "admins manage newsletter subscribers"
  on public.newsletter_subscribers for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "published posts are readable"
  on public.posts for select to anon, authenticated
  using (published);
create policy "admins manage posts"
  on public.posts for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "published team members are readable"
  on public.team_members for select to anon, authenticated
  using (published);
create policy "admins manage team members"
  on public.team_members for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "consented published testimonials are readable"
  on public.testimonials for select to anon, authenticated
  using (published and consent_confirmed);
create policy "admins manage testimonials"
  on public.testimonials for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "consented published client logos are readable"
  on public.client_logos for select to anon, authenticated
  using (published and consent_confirmed);
create policy "admins manage client logos"
  on public.client_logos for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('public-media', 'public-media', true)
on conflict (id) do update set public = excluded.public;

create policy "public can view public media"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'public-media');
create policy "admins can upload public media"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'public-media' and public.is_admin());
create policy "admins can update public media"
  on storage.objects for update to authenticated
  using (bucket_id = 'public-media' and public.is_admin())
  with check (bucket_id = 'public-media' and public.is_admin());
create policy "admins can delete public media"
  on storage.objects for delete to authenticated
  using (bucket_id = 'public-media' and public.is_admin());

grant select on public.briefings, public.posts, public.team_members,
  public.testimonials, public.client_logos
  to anon, authenticated;
revoke all on public.health_check_requests, public.briefing_registrations,
  public.newsletter_subscribers
  from PUBLIC, anon;
revoke all on public.submission_rate_limits
  from PUBLIC, anon, authenticated;
grant select, insert, update, delete on public.admins,
  public.health_check_requests, public.briefings,
  public.briefing_registrations, public.newsletter_subscribers,
  public.posts, public.team_members, public.testimonials, public.client_logos
  to authenticated;
grant all on all tables in schema public to service_role;
grant select on storage.objects to anon, authenticated;
grant insert, update, delete on storage.objects to authenticated;
