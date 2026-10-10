import { put } from '@vercel/blob';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const b = req.body || {};
  if (b.hp) return res.status(200).json({ ok: true });
  const c = (x, n) => String(x || '').slice(0, n);
  const m = { name: c(b.name, 100), phone: c(b.phone, 40), service: c(b.service, 100), msg: c(b.msg, 2000), at: new Date().toISOString() };
  if (!m.name || !m.phone || !m.msg) return res.status(400).json({ error: 'missing' });
  await put(`messages/${Date.now()}.json`, JSON.stringify(m), { access: 'public', addRandomSuffix: true, contentType: 'application/json' });
  return res.status(200).json({ ok: true });
}
