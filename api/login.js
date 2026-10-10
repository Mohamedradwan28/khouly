import { isAdmin } from './_auth.js';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const ok = isAdmin(req);
  if (!ok) await new Promise((r) => setTimeout(r, 800));
  return res.status(ok ? 200 : 401).json({ ok });
}
