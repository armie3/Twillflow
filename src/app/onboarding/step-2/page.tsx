'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function Step2() {
  const router = useRouter();
  const params = useSearchParams();
  const org = params.get('org');
  const [website, setWebsite] = useState('');
  const [logo, setLogo] = useState('');
  const [primary, setPrimary] = useState('#3B82F6');
  const [font, setFont] = useState('Inter, Arial, Helvetica, sans-serif');

  useEffect(() => {
    if (!org) router.replace('/onboarding');
  }, [org, router]);

  const onNext = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('brands').insert({
      org_id: org,
      logo_url: logo || null,
      primary_color: primary,
      font_family: font
    });
    if (error) { alert(error.message); return; }
    router.push(`/onboarding/step-3?org=${org}`);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Step 2: Brand assets</h2>
      <form onSubmit={onNext} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Website (optional)</label>
          <input className="w-full border rounded-lg px-3 py-2" value={website} onChange={e=>setWebsite(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Logo URL (optional)</label>
          <input className="w-full border rounded-lg px-3 py-2" value={logo} onChange={e=>setLogo(e.target.value)} />
        </div>
        <div className="flex items-center gap-3">
          <div>
            <label className="block text-sm mb-1">Primary color</label>
            <input type="color" className="w-16 h-10 border rounded" value={primary} onChange={e=>setPrimary(e.target.value)} />
          </div>
          <div className="flex-1">
            <label className="block text-sm mb-1">Font family</label>
            <input className="w-full border rounded-lg px-3 py-2" value={font} onChange={e=>setFont(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-black text-white rounded-lg px-4 py-2">Next</button>
        </div>
      </form>
    </div>
  );
}
