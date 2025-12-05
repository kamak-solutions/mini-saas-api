export function requireAdmin(req, res, next) {
  if (req.role !== 'admin') {
    return res.status(403).json({ message: 'Requer role admin' });
  }
  next();
}