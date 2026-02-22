'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseBrowserClient } from '@/lib/supabaseBrowser';

type AutomationRow = {
  id: string;
  user_id: string | null;
  instagram_id: string;
  keyword: string;
  dm_content: string;
  access_token: string;
  enabled?: boolean;
  created_at: string | null;
};

export default function DashboardPage() {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [automations, setAutomations] = useState<AutomationRow[]>([]);
  const [automationsLoading, setAutomationsLoading] = useState(false);
  const [automationsError, setAutomationsError] = useState<string | null>(null);

  const [isNewOpen, setIsNewOpen] = useState(false);
  const [newInstagramId, setNewInstagramId] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newDmContent, setNewDmContent] = useState('');
  const [newAccessToken, setNewAccessToken] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionEmail = data.session?.user?.email ?? null;
      const sessionUserId = data.session?.user?.id ?? null;
      setEmail(sessionEmail);
      setUserId(sessionUserId);
      setLoading(false);

      if (!sessionEmail) {
        router.replace('/login');
      }
    };

    void load();
  }, [router, supabase]);

  const loadAutomations = async (uid: string) => {
    setAutomationsLoading(true);
    setAutomationsError(null);
    try {
      const { data, error } = await supabase
        .from('automations' as never)
        .select('*' as never)
        .eq('user_id' as never, uid as never)
        .order('created_at' as never, { ascending: false } as never);

      if (error) {
        setAutomationsError(error.message);
        setAutomations([]);
        return;
      }

      setAutomations((data as unknown as AutomationRow[]) || []);
    } finally {
      setAutomationsLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    void loadAutomations(userId);
  }, [userId]);

  const createAutomation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setAutomationsError(null);
    try {
      const keyword = newKeyword.trim();
      const instagramId = newInstagramId.trim();
      const dm = newDmContent.trim();
      const token = newAccessToken.trim();

      if (!keyword || !instagramId || !dm || !token) {
        setAutomationsError('Please fill all fields.');
        return;
      }

      const { error } = await supabase
        .from('automations' as never)
        .insert(
          [
            {
              user_id: userId,
              instagram_id: instagramId,
              keyword,
              dm_content: dm,
              access_token: token,
              enabled: true,
            },
          ] as never
        );

      if (error) {
        setAutomationsError(error.message);
        return;
      }

      setIsNewOpen(false);
      setNewInstagramId('');
      setNewKeyword('');
      setNewDmContent('');
      setNewAccessToken('');

      await loadAutomations(userId);
    } finally {
      setSaving(false);
    }
  };

  const deleteAutomation = async (id: string) => {
    if (!userId) return;
    setAutomationsError(null);
    const { error } = await supabase
      .from('automations' as never)
      .delete()
      .eq('id' as never, id as never)
      .eq('user_id' as never, userId as never);

    if (error) {
      setAutomationsError(error.message);
      return;
    }

    await loadAutomations(userId);
  };

  const toggleEnabled = async (a: AutomationRow) => {
    if (!userId) return;
    setAutomationsError(null);
    const nextEnabled = !(a.enabled ?? true);

    const { error } = await supabase
      .from('automations' as never)
      .update({ enabled: nextEnabled } as never)
      .eq('id' as never, a.id as never)
      .eq('user_id' as never, userId as never);

    if (error) {
      setAutomationsError(error.message);
      return;
    }

    await loadAutomations(userId);
  };

  if (loading) {
    return (
      <div className="text-gray-300">Loading…</div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Automations</h1>
          <p className="text-gray-300 mt-2">Signed in as <span className="font-semibold">{email}</span></p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewOpen(true)}
            className="bg-primary hover:bg-primary/90 text-black px-5 py-2 rounded-lg font-semibold transition shadow-[0_0_24px_rgba(129,140,248,0.25)] hover:shadow-[0_0_30px_rgba(129,140,248,0.45)]"
          >
            Create Automation
          </button>
        </div>
      </div>

      {automationsError ? (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-200 rounded-lg p-4">
          {automationsError}
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {automations.length === 0 && !automationsLoading ? (
          <div className="md:col-span-2 xl:col-span-3 bg-card border border-border rounded-xl p-8 text-gray-300">
            No automations yet. Click <span className="font-semibold">Create Automation</span> to add your first keyword.
          </div>
        ) : null}

        {automations.map((a) => (
          <div key={a.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs text-gray-400">Keyword</div>
                <div className="text-xl font-extrabold tracking-tight mt-1">{a.keyword}</div>
              </div>
              <button
                onClick={() => void toggleEnabled(a)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full border border-border transition ${
                  (a.enabled ?? true) ? 'bg-primary/70' : 'bg-white/10'
                }`}
                aria-label="Toggle automation"
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white transition transform ${
                    (a.enabled ?? true) ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="mt-4">
              <div className="text-xs text-gray-400">Response message</div>
              <div className="text-gray-200 mt-1 whitespace-pre-wrap">{a.dm_content}</div>
            </div>

            <div className="mt-4 text-xs text-gray-500">IG ID: {a.instagram_id}</div>

            <div className="mt-5 flex items-center justify-between">
              <div className={`text-xs font-semibold ${
                (a.enabled ?? true) ? 'text-green-300' : 'text-gray-400'
              }`}
              >
                {(a.enabled ?? true) ? 'Active' : 'Paused'}
              </div>
              <button
                onClick={() => void deleteAutomation(a.id)}
                className="bg-red-600/15 hover:bg-red-600/25 border border-red-600/30 text-red-100 px-3 py-1.5 rounded-lg font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isNewOpen ? (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="w-full max-w-lg bg-card border border-border rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-extrabold tracking-tight">Create automation</h2>
                  <p className="text-gray-300 mt-1">When someone comments your keyword, we’ll send your reply.</p>
                </div>
                <button
                  onClick={() => setIsNewOpen(false)}
                  className="text-gray-300 hover:text-white transition"
                >
                  Close
                </button>
              </div>

              <form onSubmit={createAutomation} className="space-y-3">
                <input
                  value={newInstagramId}
                  onChange={(e) => setNewInstagramId(e.target.value)}
                  placeholder="Instagram Business ID (instagram_id)"
                  className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />
                <input
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  placeholder="Keyword (e.g. LINK)"
                  className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />
                <textarea
                  value={newDmContent}
                  onChange={(e) => setNewDmContent(e.target.value)}
                  placeholder="DM message to send"
                  rows={4}
                  className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />
                <input
                  value={newAccessToken}
                  onChange={(e) => setNewAccessToken(e.target.value)}
                  placeholder="Meta access token (will be stored)"
                  className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition"
                />

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewOpen(false)}
                    className="bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-lg font-semibold border border-border transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-primary hover:bg-primary/90 disabled:bg-gray-600 text-black px-5 py-2 rounded-lg font-semibold transition shadow-[0_0_24px_rgba(129,140,248,0.25)]"
                  >
                    {saving ? 'Saving…' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
    </div>
  );
}
