import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { logger } from '../config/logger.js';

export async function auth(req, res, next) {
  try {
    const hdr = req.headers.authorization;
    if (!hdr) return res.status(401).json({ message: 'Token missing' });

    const token = hdr.split(' ')[1]; // "Bearer <token>"
    if (!token) return res.status(401).json({ message: 'Malformed token' });

    const payload = jwt.verify(token, ENV.JWT_SECRET);

    req.userId   = payload.uid;
    req.tenantId = payload.tenantId;
    req.role     = payload.role;

    logger.debug('Auth user=%s tenant=%s role=%s', req.userId, req.tenantId, req.role);
    next();
  } catch (err) {
    logger.warn('JWT inválido: %s', err.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}