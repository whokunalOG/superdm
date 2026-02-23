'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, MousePointer, Mail, Sparkles, CheckCircle } from 'lucide-react';
import { WaitlistModal } from '@/components/WaitlistModal';
import { Toaster } from 'sonner';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';
import Logo from '@/components/Logo';
import LoginButton from '@/components/auth/LoginButton';

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
    <div className="bg-[#0F1117] min-h-screen text-white">
      <Toaster theme="dark" />
      
      {/* Navigation */}
      <nav className="border-b border-white/10 sticky top-0 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/20 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Logo />
          <LoginButton>
            Start For Free
          </LoginButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
              Automate Instagram DMs.<br />
              <span className="text-gray-300">Grow Your Followers.</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Lock your best content behind a follower check. Automatically DM users when they follow, creating a viral loop that grows your audience 10x faster.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {isLoggedIn ? (
                <Link
                  href="/dashboard"
                  className="group inline-flex items-center justify-center rounded-xl px-8 py-4 font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transform hover:scale-105 transition-all duration-300"
                >
                  <span className="text-lg">Go to Dashboard</span>
                </Link>
              ) : (
                <LoginButton className="text-lg px-8 py-4">
                  Start For Free
                </LoginButton>
              )}
            </div>

            {/* Social Proof Badges */}
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Meta Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="text-blue-400" size={20} />
                <span className="text-gray-300">Instant Setup</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80"
              alt="Creator using phone"
              className="rounded-2xl shadow-2xl w-full"
            />
            
            {/* DM Chat Visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -right-6 bg-black/90 backdrop-blur border border-white/20 rounded-xl p-4 shadow-2xl max-w-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0"></div>
                  <div className="bg-gray-800 rounded-lg px-3 py-2 text-sm">
                    User: "How do I get link?"
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex-shrink-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">S</span>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg px-3 py-2 text-sm">
                    SuperDM: "Sent! Check your DMs ⚡"
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works - LinkPlease Style */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-400">3 simple steps to viral growth</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 rounded-2xl p-8 mb-6">
              <MousePointer className="text-indigo-400 mx-auto mb-4" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Choose Trigger</h3>
            <p className="text-gray-400">Select keywords or posts that will activate your automated DMs.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 rounded-2xl p-8 mb-6">
              <Mail className="text-indigo-400 mx-auto mb-4" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Automate Response</h3>
            <p className="text-gray-400">Set custom DM replies that match your brand voice.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30 rounded-2xl p-8 mb-6">
              <Sparkles className="text-indigo-400 mx-auto mb-4" size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">Go Viral 🚀</h3>
            <p className="text-gray-400">Watch your engagement explode with automated responses.</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Pricing</h2>
          <p className="text-xl text-gray-400">Choose your plan to start automating</p>
        </motion.div>
        
        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-black/40 backdrop-blur border border-white/10 rounded-2xl p-8 flex flex-col"
          >
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <div className="text-4xl font-bold mb-4">$0 <span className="text-lg text-gray-400">/ month</span></div>
            <p className="text-gray-400 mb-8">Perfect for getting started</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">100 DMs/month</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Basic automations</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Email support</span>
              </li>
            </ul>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
            ) : (
              <LoginButton className="w-full text-lg py-3">
                Start For Free
              </LoginButton>
            )}
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-600/20 to-blue-600/20 backdrop-blur border border-indigo-500/30 rounded-2xl p-8 flex flex-col relative"
          >
            <div className="absolute -top-4 right-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
              Most Popular
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <div className="text-4xl font-bold mb-4">$6 <span className="text-lg text-gray-400">/ month</span></div>
            <p className="text-gray-400 mb-8">Unlock unlimited automation power</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Unlimited DMs</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Advanced AI Responses</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Priority Support</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Custom Analytics</span>
              </li>
            </ul>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
            ) : (
              <LoginButton className="w-full text-lg py-3">
                Get Started
              </LoginButton>
            )}
          </motion.div>

          {/* Foundry Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 backdrop-blur border border-amber-500/30 rounded-2xl p-8 flex flex-col relative"
          >
            <div className="absolute -top-4 right-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
              Premium
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Foundry</h3>
            <div className="text-4xl font-bold mb-4">$49 <span className="text-lg text-gray-400">/ month</span></div>
            <p className="text-gray-400 mb-8">For agencies and power users</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Everything in Pro</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">White-label branding</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">API access</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Dedicated support</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Custom integrations</span>
              </li>
            </ul>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
            ) : (
              <LoginButton className="w-full text-lg py-3">
                Get Started
              </LoginButton>
            )}
          </motion.div>

          {/* Agency Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur border border-purple-500/30 rounded-2xl p-8 flex flex-col relative"
          >
            <div className="absolute -top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">
              Enterprise
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Agency Pro</h3>
            <div className="text-4xl font-bold mb-4">$499 <span className="text-lg text-gray-400">/ month</span></div>
            <p className="text-gray-400 mb-8">For large agencies and enterprises</p>
            
            <ul className="space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Everything in Foundry</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Unlimited accounts</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">Custom AI models</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">White-glove onboarding</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">24/7 phone support</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <span className="text-gray-300">SLA guarantee</span>
              </li>
            </ul>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center"
              >
                Go to Dashboard
              </Link>
            ) : (
              <LoginButton className="w-full text-lg py-3">
                Get Started
              </LoginButton>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-black/40 backdrop-blur border-t border-white/10 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to explode your Instagram growth?</h2>
          <p className="text-gray-400 mb-8">Join our waitlist for early access</p>
          <button
            onClick={() => handleButtonClick('pro')}
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Get Early Access
          </button>
        </motion.div>
      </section>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        intent={modalIntent}
      />
    </div>
  );
}
