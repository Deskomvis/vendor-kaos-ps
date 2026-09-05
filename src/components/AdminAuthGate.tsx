import { FormEvent, useEffect, useState } from 'react';
import { LogIn } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import FullContentEditor from './FullContentEditor';
import { supabase } from '../lib/supabase';

const ADMIN_EMAIL = 'admin@konveksikaos.id';

export default function AdminAuthGate() {
  const [session, setSession] = useState<{ user?: { email?: string } } | null>(null); const [loading, setLoading] = useState(Boolean(supabase)); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
  const acceptSession = (next: { user?: { email?: string } } | null) => { if (next?.user?.email?.toLowerCase() === ADMIN_EMAIL) setSession(next); else { setSession(null); if (next) { supabase?.auth.signOut(); setError('Akun ini tidak memiliki akses admin.'); } } };
  useEffect(() => { if (!supabase) { setLoading(false); return; } supabase.auth.getSession().then(({ data }) => { acceptSession(data.session); setLoading(false); }); const { data } = supabase.auth.onAuthStateChange((_event, next) => acceptSession(next)); return () => data.subscription.unsubscribe(); }, []);
  const login = async (event: FormEvent) => { event.preventDefault(); if (!supabase) return; setError(''); const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password }); if (authError) setError(authError.message); else acceptSession(data.session); };
  if (!supabase || session) return <FullContentEditor />;
  if (loading) return <main className="grid min-h-screen place-items-center bg-neutral-100 text-sm">Memuat dashboard…</main>;
  return <main className="grid min-h-screen place-items-center bg-neutral-100 px-4 text-neutral-950"><form onSubmit={login} className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"><p className="text-xs font-bold uppercase tracking-[.25em] text-neutral-500">Gudang Planet</p><h1 className="mt-2 text-2xl font-black">Login Admin</h1><label className="mt-6 block text-sm font-bold">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-3 text-sm" /></label><label className="mt-4 block text-sm font-bold">Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full rounded-xl border border-neutral-300 px-3 py-3 text-sm" /></label>{error && <p className="mt-4 text-sm text-red-700">{error}</p>}<button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-bold text-white"><LogIn className="h-4 w-4" /> Masuk</button></form></main>;
}
