'use client';
import { useEditorStore } from '@/lib/store/editor';
import { AnyBlock } from '@/lib/dsl/schema';

const BLOCKS: { name: string; factory: () => AnyBlock }[] = [
  { name: 'Heading', factory: () => ({ type: 'Heading', attrs: { level: 1, text: 'New heading', align: 'left' } } as any) },
  { name: 'Text', factory: () => ({ type: 'Text', attrs: { html: 'New paragraph', align: 'left' } } as any) },
  { name: 'Button', factory: () => ({ type: 'Button', attrs: { text: 'CTA', url: '#', align: 'left' } } as any) },
  { name: 'Image', factory: () => ({ type: 'Image', attrs: { src: '', width: 120, alt: '' } } as any) },
];

export function Palette() {
  const insert = useEditorStore(s => s.insertBlock);

  // For simplicity, always insert into first Container at path [0,0]
  const addToFirstContainer = (block: AnyBlock) => {
    insert([0,0], block);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-medium mb-2">Components</h3>
      {BLOCKS.map(b => (
        <button key={b.name}
          onClick={()=>addToFirstContainer(b.factory())}
          className="w-full text-left border rounded-lg px-3 py-2 bg-white hover:bg-slate-50">
          + {b.name}
        </button>
      ))}
    </div>
  );
}
