import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.js';

export function generateAccessToken(user) {
  return jwt.sign(
    { uid: user.id, tenantId: user.tenant_id, role: user.role },
    ENV.JWT_SECRET,
    { expiresIn: ENV.ACCESS_TOKEN_TTL || '15m' }
  );
}

export function generateRefreshToken(user) {
  return jwt.sign(
    { uid: user.id, version: user.token_version || 0 },
    ENV.JWT_SECRET,
    { expiresIn: ENV.REFRESH_TOKEN_TTL || '7d' }
  );
}