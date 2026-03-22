-- GitaFlow Supabase schema
-- Run this in Supabase SQL Editor

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.episodes (
  id text primary key,
  title text not null,
  duration_min integer not null check (duration_min > 0 and duration_min <= 120),
  category text not null,
  tags text[] not null default '{}',
  source text not null default 'Inspired by Bhagavad Gita',
  reflection text not null default 'What stood out for you from this episode?',
  release_at timestamptz not null,
  variants jsonb not null,
  audio_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint episodes_variants_shape check (jsonb_typeof(variants) = 'object')
);

create index if not exists episodes_release_at_idx on public.episodes (release_at desc);
create index if not exists episodes_category_idx on public.episodes (category);
create index if not exists episodes_tags_gin_idx on public.episodes using gin (tags);
create index if not exists episodes_variants_gin_idx on public.episodes using gin (variants);

create table if not exists public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  username text unique,
  avatar_url text,
  preferred_language text not null default 'Hinglish'
    check (preferred_language in ('English', 'Hindi', 'Hinglish')),
  preferred_episode_length_min integer
    check (preferred_episode_length_min in (3, 5, 10)),
  goals text[] not null default '{}',
  timezone text not null default 'Asia/Kolkata',
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_episode_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  episode_id text not null references public.episodes (id) on delete cascade,
  progress_percent numeric(5,2) not null default 0
    check (progress_percent >= 0 and progress_percent <= 100),
  last_position_sec integer not null default 0 check (last_position_sec >= 0),
  play_count integer not null default 0 check (play_count >= 0),
  completed_at timestamptz,
  last_listened_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, episode_id)
);

create index if not exists user_episode_progress_user_last_idx
  on public.user_episode_progress (user_id, last_listened_at desc);

create table if not exists public.user_saved_episodes (
  user_id uuid not null references auth.users (id) on delete cascade,
  episode_id text not null references public.episodes (id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (user_id, episode_id)
);

create table if not exists public.user_reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  episode_id text not null references public.episodes (id) on delete cascade,
  prompt text not null,
  response text not null,
  created_at timestamptz not null default now()
);

drop trigger if exists set_updated_at_episodes on public.episodes;
create trigger set_updated_at_episodes
before update on public.episodes
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_user_profiles on public.user_profiles;
create trigger set_updated_at_user_profiles
before update on public.user_profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_updated_at_user_episode_progress on public.user_episode_progress;
create trigger set_updated_at_user_episode_progress
before update on public.user_episode_progress
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.user_profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.episodes enable row level security;
alter table public.user_profiles enable row level security;
alter table public.user_episode_progress enable row level security;
alter table public.user_saved_episodes enable row level security;
alter table public.user_reflections enable row level security;

drop policy if exists "Public can read published episodes" on public.episodes;
create policy "Public can read published episodes"
on public.episodes
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Users can read own profile" on public.user_profiles;
create policy "Users can read own profile"
on public.user_profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.user_profiles;
create policy "Users can insert own profile"
on public.user_profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.user_profiles;
create policy "Users can update own profile"
on public.user_profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users can view own progress" on public.user_episode_progress;
create policy "Users can view own progress"
on public.user_episode_progress
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can upsert own progress" on public.user_episode_progress;
create policy "Users can upsert own progress"
on public.user_episode_progress
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can view own saved episodes" on public.user_saved_episodes;
create policy "Users can view own saved episodes"
on public.user_saved_episodes
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can manage own saved episodes" on public.user_saved_episodes;
create policy "Users can manage own saved episodes"
on public.user_saved_episodes
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can view own reflections" on public.user_reflections;
create policy "Users can view own reflections"
on public.user_reflections
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can manage own reflections" on public.user_reflections;
create policy "Users can manage own reflections"
on public.user_reflections
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
