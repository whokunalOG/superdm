'use client';

import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

interface LoginButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LoginButton({ className = "", children }: LoginButtonProps) {
  const supabase = getSupabaseBrowserClient();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className={`bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transform hover:scale-105 ${className}`}
    >
      {children || 'Start For Free'}
    </button>
  );
}
