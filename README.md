# GitaFlow Local App

Local Node.js MVP based on your PRD, modeled as a release stream.

## What changed

- 5-step onboarding captures user preferences after first login
- app behaves like a show where episodes release on schedule
- latest released episode is highlighted on Home
- upcoming episodes are visible but locked until release date
- episodes can be loaded from Supabase (with local fallback)

## Run

```bash
cd /Users/pranshumansinghbhouriyal/Desktop/Mindfull
npm start
```

Open `http://127.0.0.1:4173`.

## Supabase Setup

1. Create a `.env` file in `/Users/pranshumansinghbhouriyal/Desktop/Mindfull` using `.env.example`.
2. Add:
   - `SUPABASE_URL`
   - `SUPABASE_KEY` (used by server for episode fetch)
   - `SUPABASE_ANON_KEY` (recommended for browser auth; optional if `SUPABASE_KEY` is already an anon key)
   - `SUPABASE_EPISODES_TABLE` (defaults to `episodes`)
3. Restart the app.

The frontend requests `/api/episodes`. If Supabase is configured and reachable, episodes are loaded from DB. If not, the app continues using local built-in episodes.

## Episodes Table Shape

Use a table like `episodes` with columns:

- `id` text (primary key or unique)
- `title` text
- `duration_min` int
- `category` text
- `tags` text[] (or comma-separated text)
- `source` text
- `reflection` text
- `release_at` timestamptz
- `variants` jsonb (recommended), example:

```json
{
  "English": { "summary": "Short summary", "transcript": "Transcript text" },
  "Hindi": { "summary": "Saar", "transcript": "Transcript" },
  "Hinglish": { "summary": "Hinglish summary", "transcript": "Hinglish transcript" }
}
```

Fallback option (if not using `variants`): add language columns like `summary_en`, `transcript_en`, `summary_hi`, `transcript_hi`, `summary_hinglish`, `transcript_hinglish`.

## SQL Script

Ready-to-run schema script (episodes + user profiles + user data tables) is available at:

- `supabase/schema.sql`

## Google Auth Setup

1. In Supabase dashboard, go to Auth > Providers > Google and enable it.
2. In Google Cloud console, add Supabase callback URL:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. In Supabase Auth URL settings, add local redirects:
   - `http://127.0.0.1:4173`
   - `http://localhost:4173`
4. Restart app and use the "Continue with Google" button on the login screen.
