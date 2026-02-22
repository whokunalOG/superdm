'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export default function AuthCallbackPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      const code = searchParams.get('code');

      if (!code) {
        router.replace('/dashboard');
        return;
      }

      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        setError(error.message);
        return;
      }

      router.replace('/dashboard');
    };

    void run();
  }, [router, searchParams, supabase]);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">
      <div className="max-w-md mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Signing you in…</h1>
        {error ? <p className="text-red-300">{error}</p> : <p className="text-gray-300">Please wait.</p>}
      </div>
    </main>
  );
}
