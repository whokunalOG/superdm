import { createClient } from '@supabase/supabase-js';

let cachedAdmin: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdminClient() {
  if (cachedAdmin) return cachedAdmin;

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY');
  }

  cachedAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  return cachedAdmin;
}
