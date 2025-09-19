'use client';
import { useEditorStore } from '@/lib/store/editor';

export function ExportButton() {
  const dsl = useEditorStore(s=>s.dsl);

  const onExport = async () => {
    const res = await fetch('/api/render', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ dsl }) });
    const data = await res.json();
    if (!res.ok) { alert(data.error || 'Export failed'); return; }
    const blob = new Blob([data.html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return <button onClick={onExport} className="border rounded-lg px-4 py-2">Export HTML</button>;
}
