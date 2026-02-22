'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Instagram } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export default function LoginPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace('/dashboard');
      }
    };

    void load();
  }, [router, supabase]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage('Check your email for a login link.');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    setMessage(null);
    setLoading(true);
    try {
      const origin = window.location.origin;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg text-accent flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2">
            <Instagram className="text-primary" size={26} />
            <span className="text-2xl font-extrabold tracking-tight">SuperDM</span>
          </div>
          <p className="text-gray-300 mt-2">Sign in to create and manage your automations.</p>
        </div>

        <div className="rounded-2xl border border-border bg-white/5 backdrop-blur p-6 shadow-[0_0_40px_rgba(0,0,0,0.35)]">
          <button
            onClick={signInWithGitHub}
            disabled={loading}
            className="w-full bg-white/10 hover:bg-white/15 border border-border text-white font-semibold py-3 rounded-xl transition"
          >
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-border flex-1" />
            <div className="text-xs text-gray-400 font-semibold">OR</div>
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            <input
              type="email"
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-600 text-black font-semibold py-3 rounded-xl transition shadow-[0_0_24px_rgba(129,140,248,0.25)]"
            >
              {loading ? 'Sending link…' : 'Send magic link'}
            </button>
          </form>

          {message ? (
            <div className="mt-4 text-sm text-gray-200">{message}</div>
          ) : null}

          <div className="mt-6 text-xs text-gray-400">
            By continuing, you agree to our{' '}
            <Link href="/terms-of-service" className="underline hover:text-gray-200">Terms</Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="underline hover:text-gray-200">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </main>
  );
}
