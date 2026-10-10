import { list, del } from '@vercel/blob';
import { isAdmin } from './_auth.js';
export default async function handler(req, res) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' });
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const { blobs } = await list({ prefix: 'messages/' });
    blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
    const items = await Promise.all(blobs.slice(0, 100).map(async (b) => ({ url: b.url, ...(await (await fetch(b.url)).json()) })));
    return res.status(200).json(items);
  }
  if (req.method === 'DELETE') {
    const u = String(req.query.url || '');
    if (!u.includes('/messages/')) return res.status(400).json({ error: 'bad url' });
    await del(u);
    return res.status(200).json({ ok: true });
  }
  return res.status(405).end();
}
