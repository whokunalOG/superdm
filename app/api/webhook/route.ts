import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getSupabaseAdminClient } from '@/lib/supabaseAdmin';

export const runtime = 'nodejs';

function timingSafeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

function verifyMetaSignature(rawBody: string, signatureHeader: string | null) {
  const appSecret = process.env.META_APP_SECRET;
  if (!appSecret) return true;
  if (!signatureHeader) return false;

  const [algo, signature] = signatureHeader.split('=');
  if (algo !== 'sha256' || !signature) return false;

  const expected = crypto.createHmac('sha256', appSecret).update(rawBody, 'utf8').digest('hex');
  return timingSafeEqual(signature, expected);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  const verifyToken = process.env.VERIFY_TOKEN;

  if (!verifyToken) {
    return NextResponse.json({ error: 'Missing VERIFY_TOKEN' }, { status: 500 });
  }

  if (mode === 'subscribe' && token === verifyToken && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'content-type': 'text/plain' },
    });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signatureHeader = request.headers.get('x-hub-signature-256');

  if (!verifyMetaSignature(rawBody, signatureHeader)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  type WebhookChangeValue = {
    text?: string;
    media_id?: string;
    post_id?: string;
    from?: { id?: string };
    sender_id?: string;
    user_id?: string;
  };

  type WebhookPayload = {
    object?: string;
    entry?: Array<{
      id?: string;
      changes?: Array<{ field?: string; value?: WebhookChangeValue }>;
    }>;
  };

  const body = payload as WebhookPayload;
  const entry = body.entry || [];

  let instagramBusinessId: string | null = null;
  let commentText: string | null = null;
  let postId: string | null = null;
  let commenterId: string | null = null;

  for (const e of entry) {
    instagramBusinessId = instagramBusinessId || e.id || null;
    for (const c of e.changes || []) {
      const v = c.value;
      if (!v) continue;
      commentText = commentText || v.text || null;
      postId = postId || v.media_id || v.post_id || null;
      commenterId = commenterId || v.from?.id || v.sender_id || v.user_id || null;
    }
  }

  if (!commentText) {
    console.log('Meta webhook payload (unhandled):', payload);
    return NextResponse.json({ ok: true });
  }

  const keyword = commentText.trim();
  if (!keyword) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabaseAdminClient();

  let query = supabase
    .from('automations' as never)
    .select('*' as never)
    .ilike('keyword' as never, keyword as never)
    .limit(1);

  if (instagramBusinessId) {
    query = query.eq('instagram_id' as never, instagramBusinessId as never);
  }

  const { data: rows, error: dbError } = await query;
  if (dbError) {
    console.error('Webhook DB error:', dbError);
    return NextResponse.json({ ok: true });
  }

  const automation = (rows as any[])?.[0];
  if (!automation) {
    return NextResponse.json({ ok: true });
  }

  if (!commenterId) {
    console.error('Missing commenter id in webhook payload', { postId, instagramBusinessId });
    return NextResponse.json({ ok: true });
  }

  const igUserId = automation.instagram_id as string;
  const accessToken = automation.access_token as string;
  const dmContent = automation.dm_content as string;

  const apiVersion = process.env.META_GRAPH_API_VERSION || 'v20.0';
  const url = `https://graph.facebook.com/${apiVersion}/${encodeURIComponent(igUserId)}/messages?access_token=${encodeURIComponent(accessToken)}`;

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: commenterId },
      message: { text: dmContent },
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error('Meta DM send failed:', resp.status, text);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}
