'use client';
import { Palette } from '@/components/Palette';
import { Canvas } from '@/components/Canvas';
import { Inspector } from '@/components/Inspector';
import { PreviewModal } from '@/components/PreviewModal';
import { ExportButton } from '@/components/ExportButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useEditorStore } from '@/lib/store/editor';

export default function EditorPage() {
  const params = useSearchParams();
  const org = params.get('org');
  const router = useRouter();
  const { dsl, setDSL } = useEditorStore();

  useEffect(() => {
    // require auth
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.replace('/login');
    });
  }, [router]);

  useEffect(() => {
    // load latest template for org
    const load = async () => {
      if (!org) return;
      const { data, error } = await supabase.from('templates').select('id, dsl').eq('org_id', org).order('created_at', { ascending: false }).limit(1).maybeSingle();
      if (error) { console.error(error); return; }
      if (data?.dsl) setDSL(data.dsl as any);
    };
    load();
  }, [org, setDSL]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-3"><Palette /></div>
      <div className="col-span-6">
        <div className="flex items-center justify-between mb-3">
          <div className="font-medium">Canvas</div>
          <div className="flex gap-2">
            <PreviewModal />
            <ExportButton />
          </div>
        </div>
        <Canvas />
      </div>
      <div className="col-span-3"><Inspector /></div>
    </div>
  );
}
