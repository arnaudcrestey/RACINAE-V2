create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  avatar_url text,
  birth_date date,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text,
  content text not null default '',
  emotion text check (
    emotion in (
      'very_good',
      'good',
      'normal',
      'hard',
      'complicated'
    )
  ),
  entry_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journal_media (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.journal_entries(id) on delete cascade,
  type text not null check (type in ('image', 'audio', 'video')),
  url text not null,
  created_at timestamptz not null default now()
);

create table public.capsules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  message text not null default '',
  recipient_name text,
  open_date date not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'opened', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.capsule_media (
  id uuid primary key default gen_random_uuid(),
  capsule_id uuid not null references public.capsules(id) on delete cascade,
  type text not null check (type in ('image', 'audio', 'video')),
  url text not null,
  created_at timestamptz not null default now()
);

create table public.ai_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  period text not null,
  content text not null default '',
  created_at timestamptz not null default now()
);

create index profiles_email_idx on public.profiles(email);
create index journal_entries_user_date_idx on public.journal_entries(user_id, entry_date desc);
create index journal_media_entry_idx on public.journal_media(entry_id);
create index capsules_user_open_date_idx on public.capsules(user_id, open_date asc);
create index capsule_media_capsule_idx on public.capsule_media(capsule_id);
create index ai_summaries_user_period_idx on public.ai_summaries(user_id, period);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.email)
  );
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger journal_entries_set_updated_at
before update on public.journal_entries
for each row execute function public.set_updated_at();

create trigger capsules_set_updated_at
before update on public.capsules
for each row execute function public.set_updated_at();

create trigger users_create_profile
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.journal_entries enable row level security;
alter table public.journal_media enable row level security;
alter table public.capsules enable row level security;
alter table public.capsule_media enable row level security;
alter table public.ai_summaries enable row level security;

create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "journal_entries_all_own" on public.journal_entries
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "journal_media_all_own" on public.journal_media
for all using (
  exists (
    select 1
    from public.journal_entries entry
    where entry.id = journal_media.entry_id
      and entry.user_id = auth.uid()
  )
) with check (
  exists (
    select 1
    from public.journal_entries entry
    where entry.id = journal_media.entry_id
      and entry.user_id = auth.uid()
  )
);

create policy "capsules_all_own" on public.capsules
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "capsule_media_all_own" on public.capsule_media
for all using (
  exists (
    select 1
    from public.capsules capsule
    where capsule.id = capsule_media.capsule_id
      and capsule.user_id = auth.uid()
  )
) with check (
  exists (
    select 1
    from public.capsules capsule
    where capsule.id = capsule_media.capsule_id
      and capsule.user_id = auth.uid()
  )
);

create policy "ai_summaries_all_own" on public.ai_summaries
for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'journal-media',
  'journal-media',
  false,
  52428800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'audio/mpeg',
    'audio/mp4',
    'video/mp4',
    'video/quicktime'
  ]
)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'capsule-media',
  'capsule-media',
  false,
  52428800,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'audio/mpeg',
    'audio/mp4',
    'video/mp4',
    'video/quicktime'
  ]
)
on conflict (id) do nothing;

create policy "journal_media_storage_own" on storage.objects
for all using (
  bucket_id = 'journal-media'
  and auth.uid()::text = (storage.foldername(name))[1]
) with check (
  bucket_id = 'journal-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "capsule_media_storage_own" on storage.objects
for all using (
  bucket_id = 'capsule-media'
  and auth.uid()::text = (storage.foldername(name))[1]
) with check (
  bucket_id = 'capsule-media'
  and auth.uid()::text = (storage.foldername(name))[1]
);
