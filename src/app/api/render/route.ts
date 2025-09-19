import { NextRequest, NextResponse } from 'next/server';
import { EmailDSL as EmailSchema } from '@/lib/dsl/schema';
import { renderEmail } from '@/lib/renderers/mjml';

export async function POST(req: NextRequest) {
  try {
    const { dsl } = await req.json();
    const parsed = EmailSchema.parse(dsl);
    const html = await renderEmail(parsed, { inlineCss: true });
    return NextResponse.json({ html });
  } catch (err:any) {
    return NextResponse.json({ error: String(err.message || err) }, { status: 400 });
  }
}
