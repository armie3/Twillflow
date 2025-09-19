'use client';
import { create } from 'zustand';
import { EXAMPLE_WELCOME_EMAIL } from '@/lib/dsl/example';
import type { EmailDSL, AnyBlock } from '@/lib/dsl/schema';
import { v4 as uuid } from 'uuid';

export type EditorState = {
  dsl: EmailDSL;
  selectedId?: string;
  setDSL: (dsl: EmailDSL) => void;
  selectBlock: (id?: string) => void;
  updateBlockAttrs: (id: string, attrs: Record<string, any>) => void;
  insertBlock: (parentPath: number[], block: AnyBlock) => void;
  removeBlock: (path: number[]) => void;
};

function assignIds(node: any): any {
  if (node && typeof node === 'object') {
    node.id = node.id || uuid();
    if (Array.isArray(node.children)) node.children = node.children.map(assignIds);
  }
  return node;
}

function getNodeByPath(root:any, path:number[]) {
  let node = root;
  for (const idx of path) node = node.children[idx];
  return node;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  dsl: assignIds(JSON.parse(JSON.stringify(EXAMPLE_WELCOME_EMAIL))),
  selectedId: undefined,
  setDSL: (dsl) => set({ dsl: assignIds(JSON.parse(JSON.stringify(dsl))) }),
  selectBlock: (id) => set({ selectedId: id }),
  updateBlockAttrs: (id, attrs) => {
    const draft:any = JSON.parse(JSON.stringify(get().dsl));
    const stack = [draft];
    while (stack.length) {
      const node:any = stack.pop();
      if (!node) continue;
      if (node.id === id) {
        node.attrs = { ...(node.attrs || {}), ...attrs };
        break;
      }
      if (Array.isArray(node.children)) stack.push(...node.children);
    }
    set({ dsl: draft });
  },
  insertBlock: (parentPath, block) => {
    const draft:any = JSON.parse(JSON.stringify(get().dsl));
    const parent:any = getNodeByPath(draft, parentPath);
    parent.children = parent.children || [];
    parent.children.push(assignIds(block));
    set({ dsl: draft });
  },
  removeBlock: (path) => {
    const draft:any = JSON.parse(JSON.stringify(get().dsl));
    const last = path[path.length - 1];
    const parentPath = path.slice(0, -1);
    const parent:any = parentPath.length ? getNodeByPath(draft, parentPath) : null;
    if (parent) {
      parent.children.splice(last,1);
      set({ dsl: draft });
    }
  }
}));
