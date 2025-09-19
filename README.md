# Twillflow (Starter: A1–A3 + Auth + Onboarding)

This is a preconfigured starter for your email template builder.

## Quick start (StackBlitz)
1. Open this folder in StackBlitz.
2. Create `.env.local` with:
```
NEXT_PUBLIC_SUPABASE_URL=... 
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```
3. Install will auto-run; then run dev: `npm run dev`.
4. Visit `/login` → use magic link.
5. After login, go to `/onboarding` to create your org + template.
6. Go to `/editor?org=<id>` to edit.

## Deploy to Vercel
- Set env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Database
- In Supabase SQL editor, paste `schema.sql` and run.
