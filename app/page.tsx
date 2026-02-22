'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Lock, Zap, TrendingUp, Instagram } from 'lucide-react';
import { WaitlistModal } from '@/components/WaitlistModal';
import { Toaster } from 'sonner';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

export default function Home() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIntent, setModalIntent] = useState<'free' | 'pro'>('free');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(Boolean(data.session));
    };

    void load();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session));
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleButtonClick = (intent: 'free' | 'pro') => {
    setModalIntent(intent);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Toaster theme="dark" />
      
      {/* Navigation */}
      <nav className="border-b border-white/10 sticky top-0 bg-white/5 backdrop-blur supports-[backdrop-filter]:bg-white/5 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Instagram className="text-indigo-400" size={28} />
            <span className="text-xl font-extrabold tracking-tight">SuperDM</span>
          </div>
          <Link
            href="/login"
            className="text-gray-200 hover:text-white transition font-semibold"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
          Automate Instagram DMs.<br />
          <span className="text-gray-100">Grow Your Followers.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Lock your best content behind a follower check. Automatically DM users when they follow, creating a viral loop that grows your audience 10x faster.
        </p>

        <div className="flex justify-center mb-14">
          <Link
            href={isLoggedIn ? '/dashboard' : '/login'}
            className="group inline-flex flex-col items-center justify-center rounded-xl px-8 py-4 font-semibold text-white bg-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transform hover:scale-105 transition"
          >
            <span className="text-lg">
              {isLoggedIn ? 'Go to Dashboard' : 'Start for Free'}
            </span>
            <span className="text-sm text-white/80 font-medium">
              No Credit Card Required
            </span>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
            <Zap className="text-blue-500 mb-4 mx-auto" size={32} />
            <h3 className="text-xl font-bold mb-2">Auto DM Sequences</h3>
            <p className="text-gray-400">Send personalized messages instantly when users follow you.</p>
          </div>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
            <Lock className="text-blue-500 mb-4 mx-auto" size={32} />
            <h3 className="text-xl font-bold mb-2">Follower-Lock Content</h3>
            <p className="text-gray-400">Gate premium content behind a follow requirement.</p>
          </div>
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8">
            <TrendingUp className="text-blue-500 mb-4 mx-auto" size={32} />
            <h3 className="text-xl font-bold mb-2">Track Growth</h3>
            <p className="text-gray-400">Real-time analytics on conversions and engagement.</p>
          </div>
        </div>

        {/* Follower-Lock Visual */}
        <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-12 mb-16">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600/20 border border-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h4 className="font-bold mb-2">User Follows</h4>
              <p className="text-gray-400">User sees your locked content and taps "Follow"</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600/20 border border-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Lock className="text-blue-400" size={24} />
              </div>
              <h4 className="font-bold mb-2">Verify Follow</h4>
              <p className="text-gray-400">SuperDM confirms they followed via Instagram API</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600/20 border border-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h4 className="font-bold mb-2">Auto DM Sent</h4>
              <p className="text-gray-400">Personalized message automatically delivered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Simple Pricing</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 flex flex-col">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-400 mb-6">Forever free, limited features</p>
            <div className="text-3xl font-bold mb-8">$0</div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>1 Follower-Lock Sequence</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>Basic Analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>100 Auto DMs/Month</span>
              </li>
            </ul>

            <button
              onClick={() => handleButtonClick('free')}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition"
            >
              Join Waitlist
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-[#1a1a1a] border border-blue-600 rounded-lg p-8 flex flex-col relative">
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
              Most Popular
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-gray-400 mb-6">Unlimited power, lifetime deal</p>
            <div className="text-3xl font-bold mb-2">$49</div>
            <p className="text-gray-400 mb-8 text-sm">One-time payment, lifetime access</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>Unlimited Sequences</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>Advanced Analytics & AI Insights</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>Unlimited Auto DMs</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>Priority Support</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-sm">✓</div>
                <span>Custom Branding</span>
              </li>
            </ul>

            <button
              onClick={() => handleButtonClick('pro')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
            >
              Claim Lifetime Deal
            </button>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#1a1a1a] border-t border-gray-800 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to explode your Instagram growth?</h2>
        <p className="text-gray-400 mb-8">Join our waitlist for early access</p>
        <button
          onClick={() => handleButtonClick('pro')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Get Early Access
        </button>
      </section>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        intent={modalIntent}
      />
    </div>
  );
}
