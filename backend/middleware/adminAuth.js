module.exports = (req, res, next) => {
  // Lejo nëse ADMIN_PASSWORD s'është vendosur (dev)
  const ADMIN = process.env.ADMIN_PASSWORD || 'luli123';
  const token = req.headers['x-admin-pass'] || req.query.adminPass;

  if (!token) {
    return res.status(401).json({ error: 'Admin token mungon' });
  }
  if (token !== ADMIN) {
    return res.status(403).json({ error: 'Password admin i gabuar' });
  }
  next();
};
