'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: typeof window !== 'undefined' ? window.location.origin + '/onboarding' : undefined } });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-2">Sign in to Twillflow</h2>
      <p className="text-sm text-slate-600 mb-4">We&apos;ll email you a magic link.</p>
      <form onSubmit={handleSend} className="space-y-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border rounded-lg px-3 py-2"
        />
        <button className="w-full bg-black text-white rounded-lg py-2">Send magic link</button>
      </form>
      {sent && <p className="mt-3 text-green-600 text-sm">Check your email for the sign-in link.</p>}
      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
    </div>
  );
}
