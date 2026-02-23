'use client';

import { useState, useEffect } from 'react';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';
import { 
  MessageSquare, 
  TrendingUp, 
  Target, 
  Reply, 
  Plus,
  Check,
  Circle,
  X
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    instagram_id: '',
    keyword: '',
    dm_content: '',
    access_token: '',
    enabled: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setSubmitMessage('You must be logged in to create an automation.');
        setIsSubmitting(false);
        return;
      }

      const { error } = await supabase
        .from('automations')
        .insert({
          user_id: user.id,
          instagram_id: formData.instagram_id,
          keyword: formData.keyword,
          dm_content: formData.dm_content,
          access_token: formData.access_token,
          enabled: formData.enabled
        });

      if (error) {
        setSubmitMessage(`Error: ${error.message}`);
      } else {
        setSubmitMessage('Automation created successfully!');
        setFormData({
          instagram_id: '',
          keyword: '',
          dm_content: '',
          access_token: '',
          enabled: true
        });
        setTimeout(() => {
          setShowModal(false);
          setSubmitMessage('');
        }, 1500);
      }
    } catch (error) {
      setSubmitMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  useEffect(() => {
    // Get user info for welcome message
    const getUser = async () => {
      const supabase = getSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          email: user.email || ''
        });
      }
    };
    getUser();
  }, []);

  return (
    <div className="space-y-6">
      {/* Purple Gradient Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Unlock Pro Power!</h2>
            <p className="text-purple-100">Get unlimited DMs, advanced automations, and priority support.</p>
          </div>
          <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Welcome Message */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome back, {user?.name || 'User'} 👋
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Get Started & Metrics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Get Started Card */}
          <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Get Started</h3>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">Setup Progress</span>
                <span className="text-sm font-semibold text-indigo-400">50% complete</span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-indigo-500 rounded-full transition-all duration-300"></div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Check className="text-green-400" size={20} />
                <span className="text-gray-300">Verify your WhatsApp Number</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-400" size={20} />
                <span className="text-gray-300">Connect Instagram</span>
              </div>
              <div className="flex items-center gap-3">
                <Circle className="text-gray-600" size={20} />
                <span className="text-gray-300">Create your first automation</span>
                <button 
                  onClick={() => setShowModal(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium text-sm ml-auto"
                >
                  Create &gt;
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Card */}
          <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/60 rounded-lg p-4 border border-white/5">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Messages Sent</div>
              </div>
              <div className="bg-black/60 rounded-lg p-4 border border-white/5">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-sm text-gray-400">Total Clicks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Auto DM from Comments */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-black/60 transition cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="text-orange-400" size={24} />
                </div>
                <span className="text-xs font-semibold text-orange-400 mb-1">POPULAR</span>
                <h4 className="font-medium text-white text-sm">Auto DM from Comments</h4>
              </div>
            </div>

            {/* Grow Followers */}
            <div className="bg-black/40 backdrop-blur border-2 border-amber-500/50 rounded-xl p-4 hover:bg-black/60 transition cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="text-pink-400" size={24} />
                </div>
                <span className="text-xs font-semibold text-pink-400 mb-1">TRENDING</span>
                <h4 className="font-medium text-white text-sm">Grow Followers</h4>
              </div>
            </div>

            {/* Generate Leads */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-black/60 transition cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                  <Target className="text-blue-400" size={24} />
                </div>
                <h4 className="font-medium text-white text-sm">Generate Leads</h4>
                <span className="text-xs font-semibold text-amber-400 mt-2">Pro</span>
              </div>
            </div>

            {/* Auto-reply DMs */}
            <div className="bg-black/40 backdrop-blur border border-white/10 rounded-xl p-4 hover:bg-black/60 transition cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3">
                  <Reply className="text-green-400" size={24} />
                </div>
                <h4 className="font-medium text-white text-sm">Auto-reply DMs</h4>
                <span className="text-xs font-semibold text-amber-400 mt-2">Pro</span>
              </div>
            </div>
          </div>

          {/* Create New Button */}
          <button 
            onClick={() => setShowModal(true)}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl p-4 font-semibold transition flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Create New
          </button>
        </div>
      </div>

      {/* Automation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-black/80 backdrop-blur border border-white/10 rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Create New Automation</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Instagram ID */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Instagram ID *
                </label>
                <input
                  type="text"
                  name="instagram_id"
                  value={formData.instagram_id}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., your_instagram_handle"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-white placeholder-gray-500"
                />
              </div>

              {/* Keyword */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Trigger Keyword *
                </label>
                <input
                  type="text"
                  name="keyword"
                  value={formData.keyword}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 'info', 'details', 'learn more'"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-white placeholder-gray-500"
                />
              </div>

              {/* DM Content */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  DM Message *
                </label>
                <textarea
                  name="dm_content"
                  value={formData.dm_content}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Enter the message you want to send automatically..."
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none text-white placeholder-gray-500"
                />
              </div>

              {/* Access Token */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Meta Access Token *
                </label>
                <input
                  type="password"
                  name="access_token"
                  value={formData.access_token}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your Meta Graph API access token"
                  className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-white placeholder-gray-500"
                />
              </div>

              {/* Enabled Toggle */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm font-medium text-gray-300">
                  Enable Automation
                </label>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, enabled: !prev.enabled }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    formData.enabled ? 'bg-indigo-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Submit Message */}
              {submitMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  submitMessage.includes('Error') 
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                    : 'bg-green-500/20 text-green-400 border border-green-500/30'
                }`}>
                  {submitMessage}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-white/20 text-gray-300 rounded-lg hover:bg-white/10 transition font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Automation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
