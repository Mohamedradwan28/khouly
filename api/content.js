import { put, list } from '@vercel/blob';
const KEY = 'site/content.json';
export default async function handler(req, res) {
  const ok = process.env.ADMIN_PASSWORD && req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD;
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    if (req.query.check) return ok ? res.status(200).json({ ok: true }) : res.status(401).json({ error: 'unauthorized' });
    const { blobs } = await list({ prefix: KEY });
    if (!blobs.length) return res.status(404).json({});
    const r = await fetch(blobs[0].url + '?t=' + Date.now());
    return res.status(200).json(await r.json());
  }
  if (req.method === 'PUT') {
    if (!ok) return res.status(401).json({ error: 'unauthorized' });
    await put(KEY, JSON.stringify(req.body), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' });
    return res.status(200).json({ ok: true });
  }
  return res.status(405).end();
}
