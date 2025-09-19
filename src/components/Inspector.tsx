'use client';
import { useEditorStore } from '@/lib/store/editor';

export function Inspector() {
  const { dsl, selectedId, updateBlockAttrs } = useEditorStore();
  if (!selectedId) return <div className="text-slate-500">Select a block to edit its properties.</div>;

  // Find node by id
  let node:any = null;
  const stack:any[] = [dsl];
  while (stack.length) {
    const n = stack.pop();
    if (!n) continue;
    if (n.id === selectedId) { node = n; break; }
    if (Array.isArray(n.children)) stack.push(...n.children);
    if (Array.isArray(n.body)) stack.push(...n.body);
  }
  if (!node) return <div className="text-slate-500">Block not found.</div>;

  const attrs = node.attrs || {};

  return (
    <div className="space-y-3">
      <div className="font-medium">Inspector</div>
      <div className="text-xs uppercase text-slate-500">{node.type}</div>

      {node.type === 'Heading' && (
        <>
          <label className="block text-sm">Text</label>
          <input className="w-full border rounded px-2 py-1" value={attrs.text || ''} onChange={(e)=>updateBlockAttrs(selectedId, { text: e.target.value })} />
          <label className="block text-sm mt-2">Level (1-3)</label>
          <input type="number" min={1} max={3} className="w-24 border rounded px-2 py-1" value={attrs.level || 1} onChange={(e)=>updateBlockAttrs(selectedId, { level: Number(e.target.value) })} />
        </>
      )}

      {node.type === 'Text' && (
        <>
          <label className="block text-sm">HTML</label>
          <textarea className="w-full border rounded px-2 py-1 h-24" value={attrs.html || ''} onChange={(e)=>updateBlockAttrs(selectedId, { html: e.target.value })} />
        </>
      )}

      {node.type === 'Button' && (
        <>
          <label className="block text-sm">Text</label>
          <input className="w-full border rounded px-2 py-1" value={attrs.text || ''} onChange={(e)=>updateBlockAttrs(selectedId, { text: e.target.value })} />
          <label className="block text-sm mt-2">URL</label>
          <input className="w-full border rounded px-2 py-1" value={attrs.url || ''} onChange={(e)=>updateBlockAttrs(selectedId, { url: e.target.value })} />
        </>
      )}

      {node.type === 'Image' && (
        <>
          <label className="block text-sm">Src</label>
          <input className="w-full border rounded px-2 py-1" value={attrs.src || ''} onChange={(e)=>updateBlockAttrs(selectedId, { src: e.target.value })} />
          <label className="block text-sm mt-2">Alt</label>
          <input className="w-full border rounded px-2 py-1" value={attrs.alt || ''} onChange={(e)=>updateBlockAttrs(selectedId, { alt: e.target.value })} />
          <label className="block text-sm mt-2">Width (px)</label>
          <input type="number" className="w-24 border rounded px-2 py-1" value={attrs.width || 120} onChange={(e)=>updateBlockAttrs(selectedId, { width: Number(e.target.value) })} />
        </>
      )}
    </div>
  );
}
