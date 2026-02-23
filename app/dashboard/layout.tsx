'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import { 
  Home, 
  Settings, 
  Gift, 
  Menu, 
  X,
  Zap
} from 'lucide-react';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';
import Logo from '@/components/Logo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/automations', label: 'Automations', icon: Zap },
    { href: '/dashboard/refer', label: 'Refer and Earn', icon: Gift },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  const Nav = (
    <div className="h-full flex flex-col">
      <div className="px-4 py-4 flex items-center gap-2 border-b border-white/10">
        <Logo />
      </div>

      <div className="p-3 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
              pathname === href 
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-auto p-3 space-y-3 border-t border-white/10">
        <div className="px-3 py-2 bg-black/40 backdrop-blur border border-white/10 rounded-lg">
          <div className="text-xs font-medium text-gray-400 mb-1">Plan Usage</div>
          <div className="text-sm font-semibold text-white">0/1000 DM per month</div>
          <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-indigo-500 rounded-full transition-all duration-300"></div>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full rounded-lg px-3 py-2 text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white transition"
        >
          Upgrade to Pro
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0F1117]">
      <div className="md:hidden sticky top-0 z-40 bg-black/20 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo className="scale-90" />
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg border border-white/10 bg-black/40"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="md:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-black border-r border-white/10">
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <Logo className="scale-90" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg border border-white/10 bg-black/40"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            {Nav}
          </div>
        </div>
      ) : null}

      <div className="max-w-7xl mx-auto md:grid md:grid-cols-[280px_1fr]">
        <aside className="hidden md:block h-screen sticky top-0 bg-black border-r border-white/10">
          {Nav}
        </aside>

        <div className="min-w-0">
          <div className="hidden md:block sticky top-0 z-30 bg-black/20 backdrop-blur border-b border-white/10">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="text-sm text-gray-400">Dashboard</div>
              <Link
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white transition"
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
