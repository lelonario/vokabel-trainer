import { createClient } from '@supabase/supabase-js';

// This client is for use in client components ('use client')
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
