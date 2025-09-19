'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { EXAMPLE_WELCOME_EMAIL } from '@/lib/dsl/example';

export default function Step3() {
  const router = useRouter();
  const params = useSearchParams();
  const org = params.get('org');

  useEffect(() => {
    if (!org) router.replace('/onboarding');
  }, [org, router]);

  const createTemplate = async () => {
    const { error } = await supabase.from('templates').insert({
      org_id: org,
      name: 'Welcome Email',
      dsl: EXAMPLE_WELCOME_EMAIL
    });
    if (error) { alert(error.message); return; }
    router.push(`/editor?org=${org}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Step 3: Select a Template</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={createTemplate} className="border rounded-xl p-4 bg-white text-left hover:shadow">
          <div className="h-24 bg-slate-100 rounded mb-3" />
          <div className="font-medium mb-1">Welcome Email</div>
          <div className="text-sm text-slate-600">Minimal starter using your brand tokens.</div>
        </button>
      </div>
    </div>
  );
}
