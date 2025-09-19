'use client';
import { useEditorStore } from '@/lib/store/editor';
import clsx from 'clsx';

function NodeView({ node, path }:{ node:any; path:number[] }) {
  const selectedId = useEditorStore(s=>s.selectedId);
  const select = useEditorStore(s=>s.selectBlock);
  const remove = useEditorStore(s=>s.removeBlock);

  const isSelected = selectedId === node.id;

  return (
    <div className={clsx('border rounded-lg p-3 mb-2', isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white')} onClick={(e)=>{ e.stopPropagation(); select(node.id); }}>
      <div className="text-xs uppercase text-slate-500 mb-1">{node.type}</div>
      {node.attrs?.text && <div className="font-semibold">{node.attrs.text}</div>}
      {node.attrs?.html && <div className="text-sm" dangerouslySetInnerHTML={{__html: node.attrs.html}} />}
      {node.attrs?.url && <div className="text-xs text-slate-500 break-all">{node.attrs.url}</div>}
      {Array.isArray(node.children) && node.children.map((c:any, i:number) => (
        <NodeView key={c.id} node={c} path={[...path, i]} />
      ))}
      {path.length>0 && (
        <div className="mt-2 text-right">
          <button className="text-red-600 text-sm underline" onClick={(e)=>{ e.stopPropagation(); remove(path); }}>Delete</button>
        </div>
      )}
    </div>
  );
}

export function Canvas() {
  const dsl:any = useEditorStore(s=>s.dsl);
  return (
    <div className="">
      {((dsl.body ?? dsl.children) || []).map((node:any, i:number) => (
        <NodeView key={node.id} node={node} path={[i]} />
      ))}
    </div>
  );
}
