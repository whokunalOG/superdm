import { createBrowserClient } from '@supabase/ssr';

let cachedClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  if (cachedClient) return cachedClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        'Supabase environment variables are not set. Auth features will be disabled until they are configured.'
      );
    }

    // Return a minimal stub so that prerendering and client components
    // don't crash when Supabase is not yet configured (e.g. on Vercel).
    const stubError = new Error('Supabase is not configured');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: stubError }),
        onAuthStateChange: () => ({
          data: { subscription: { unsubscribe: () => {} } },
          error: stubError,
        }),
        signInWithOAuth: async () => ({ data: null, error: stubError }),
        signInWithOtp: async () => ({ data: null, error: stubError }),
        signOut: async () => ({ error: stubError }),
        getUser: async () => ({ data: { user: null }, error: stubError }),
        exchangeCodeForSession: async () => ({
          data: { session: null, user: null },
          error: stubError,
        }),
      },
    } as any;
  }

  cachedClient = createBrowserClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      flowType: 'pkce',
    },
  });
  return cachedClient;
}
