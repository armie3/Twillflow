'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { OrgInput, Industry } from '@/lib/onboarding/types';

const INDUSTRIES: Industry[] = ['Software & Media','E-Commerce','Physical Business','Professional Services','Other Businesses'];

export default function Step1() {
  const router = useRouter();
  const [org, setOrg] = useState<OrgInput>({ name: '', industry: 'Software & Media' });

  useEffect(() => {
    // Require auth
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
    });
  }, [router]);

  const onNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.replace('/login');
    const { data, error } = await supabase
      .from('organizations')
      .insert({ name: org.name, industry: org.industry, user_id: user.id })
      .select('id')
      .single();
    if (error) { alert(error.message); return; }
    router.push(`/onboarding/step-2?org=${data.id}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Step 1: Business details</h2>
      <form onSubmit={onNext} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Business / App name</label>
          <input className="w-full border rounded-lg px-3 py-2" required
            value={org.name} onChange={(e)=>setOrg({ ...org, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm mb-1">Industry</label>
          <select className="w-full border rounded-lg px-3 py-2"
            value={org.industry} onChange={(e)=>setOrg({ ...org, industry: e.target.value as Industry })}>
            {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
          </select>
        </div>
        <div className="flex justify-end">
          <button className="bg-black text-white rounded-lg px-4 py-2">Next</button>
        </div>
      </form>
    </div>
  );
}
