'use client';
import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editor';

export function PreviewModal() {
  const [open, setOpen] = useState(false);
  const [html, setHtml] = useState<string>('');
  const dsl = useEditorStore(s=>s.dsl);

  const render = async () => {
    const res = await fetch('/api/render', { method:'POST', body: JSON.stringify({ dsl }), headers: { 'Content-Type':'application/json' } });
    const data = await res.json();
    if (res.ok) { setHtml(data.html); setOpen(true); } else { alert(data.error || 'Render failed'); }
  };

  return (
    <div>
      <button onClick={render} className="bg-blue-600 text-white rounded-lg px-4 py-2">Preview</button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={()=>setOpen(false)}>
          <div className="bg-white rounded-xl w-full max-w-3xl h-[80vh] overflow-hidden" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center justify-between p-3 border-b">
              <div className="font-medium">Preview</div>
              <button onClick={()=>setOpen(false)} className="text-slate-600">Close</button>
            </div>
            <iframe className="w-full h-full" srcDoc={html} />
          </div>
        </div>
      )}
    </div>
  );
}
