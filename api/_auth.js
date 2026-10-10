export const isAdmin = (req) =>
  !!process.env.ADMIN_USER && !!process.env.ADMIN_PASSWORD &&
  req.headers['x-admin-user'] === process.env.ADMIN_USER &&
  req.headers['x-admin-password'] === process.env.ADMIN_PASSWORD;
