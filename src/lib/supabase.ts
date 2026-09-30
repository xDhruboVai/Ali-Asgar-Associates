import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  throw new Error(
    'Missing Supabase configuration. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local (see .env.example).',
  )
}

// Read-only public client. The database grants SELECT to the anon role only;
// all data is fetched on the server and rendered into static pages.
export const supabase = createClient(url.replace(/\/+$/, ''), key, {
  auth: { persistSession: false, autoRefreshToken: false },
})
