export function sanitizeHtmlEmail(html: string): string {
  // Very conservative regex-based strip (placeholder). For production, use DOMPurify server-side.
  let out = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  out = out.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '');
  out = out.replace(/ on[a-z]+="[^"]*"/gi, '');
  return out;
}
