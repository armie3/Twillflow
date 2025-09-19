import mjml2html from 'mjml';
import { renderBlock } from './renderBlock';
import type { EmailDSL } from '@/lib/dsl/schema';
import { sanitizeHtmlEmail } from '@/lib/utils/sanitize';
import juice from 'juice';

export async function renderEmail(dsl: EmailDSL, opts: { inlineCss?: boolean } = { inlineCss: true }) {
  const mjml = renderBlock(dsl);
  const { html, errors } = mjml2html(mjml, { minify: true });
  if (errors && errors.length) {
    const msg = errors.map(e => e.formattedMessage).join('\n');
    throw new Error(msg);
  }
  const inlined = opts.inlineCss ? juice(html) : html;
  return sanitizeHtmlEmail(inlined);
}
