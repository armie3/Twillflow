import type { AnyBlock, EmailDSL } from '@/lib/dsl/schema';

function esc(s: string) { return String(s).replace(/"/g, '&quot;'); }

function renderHeading(attrs:any) {
  const level = Math.min(Math.max(Number(attrs.level ?? 1),1),3);
  const size = level === 1 ? 24 : level === 2 ? 20 : 18;
  const align = attrs.align ?? 'left';
  return `<mj-text align="${align}" font-weight="700" font-size="${size}px">${attrs.text ?? ''}</mj-text>`;
}

function renderText(attrs:any) {
  const align = attrs.align ?? 'left';
  return `<mj-text align="${align}">${attrs.html ?? ''}</mj-text>`;
}

function renderButton(attrs:any) {
  const align = attrs.align ?? 'left';
  const url = attrs.url ?? '#';
  return `<mj-button align="${align}" href="${esc(url)}">${attrs.text ?? 'Click'}</mj-button>`;
}

function renderImage(attrs:any) {
  const align = attrs.align ?? 'left';
  const width = attrs.width ?? 120;
  const src = attrs.src ?? '';
  const alt = attrs.alt ?? '';
  return `<mj-image align="${align}" width="${width}px" src="${esc(src)}" alt="${esc(alt)}" />`;
}

export function renderBlock(node: AnyBlock): string {
  switch (node.type) {
    case 'Email': {
      const theme = (node as any).theme;
      const body = (node as any).body || node.children || [];
      const children = (body as any[]).map(renderBlock).join('');
      return `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-family="${theme.font.family}" color="${theme.colors.text}" font-size="${theme.font.baseSize}px" />
      <mj-button background-color="${theme.colors.primary}" color="#ffffff" font-family="${theme.font.family}" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="${theme.colors.bg}">
    ${children}
  </mj-body>
</mjml>
`.trim();
    }
    case 'Section': {
      const children = (node.children || []).map(renderBlock).join('');
      return `<mj-section padding="24px 0">${children}</mj-section>`;
    }
    case 'Container': {
      const children = (node.children || []).map(renderBlock).join('');
      return `<mj-column>${children}</mj-column>`;
    }
    case 'Heading': return renderHeading((node as any).attrs || {});
    case 'Text':    return renderText((node as any).attrs || {});
    case 'Button':  return renderButton((node as any).attrs || {});
    case 'Image':   return renderImage((node as any).attrs || {});
    default: return '';
  }
}
