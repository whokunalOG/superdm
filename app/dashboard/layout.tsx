'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const Nav = (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 flex items-center gap-2 border-b border-border">
        <Instagram className="text-primary" size={22} />
        <span className="font-extrabold tracking-tight">SuperDM</span>
      </div>

      <div className="p-3 space-y-1">
        <Link
          href="/dashboard"
          className={`block rounded-lg px-3 py-2 text-sm font-semibold transition ${
            pathname === '/dashboard' ? 'bg-primary/15 text-accent' : 'text-gray-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          Automations
        </Link>
      </div>

      <div className="mt-auto p-3 border-t border-border">
        <button
          onClick={logout}
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-border transition"
        >
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg text-accent">
      <div className="md:hidden sticky top-0 z-40 bg-white/5 backdrop-blur border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Instagram className="text-primary" size={20} />
            <span className="font-extrabold">SuperDM</span>
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg border border-border bg-white/5"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-card border-r border-border">
            <div className="flex items-center justify-between px-4 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Instagram className="text-primary" size={20} />
                <span className="font-extrabold">SuperDM</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg border border-border bg-white/5"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            {Nav}
          </div>
        </div>
      ) : null}

      <div className="max-w-7xl mx-auto md:grid md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block h-screen sticky top-0 bg-card border-r border-border">
          {Nav}
        </aside>

        <div className="min-w-0">
          <div className="hidden md:block sticky top-0 z-30 bg-white/5 backdrop-blur border-b border-border">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">Dashboard</div>
              <Link
                href="/"
                className="text-sm font-semibold text-gray-200 hover:text-white transition"
              >
                View site
              </Link>
            </div>
          </div>

          <main className="px-4 md:px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
