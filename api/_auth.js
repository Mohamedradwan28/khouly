const USER = process.env.ADMIN_USER || 'khouly_admin';
const PASS = process.env.ADMIN_PASSWORD || '8SZbWHE0DjDzZd#55';

export const isAdmin = (req) =>
  req.headers['x-admin-user'] === USER &&
  req.headers['x-admin-password'] === PASS;
