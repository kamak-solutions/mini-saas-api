import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {ENV} from '../../config/env.js'
import { generateAccessToken, generateRefreshToken } from './tokens.js';

export class AuthService {
  constructor(repo, logger) {
    this.repo = repo;
    this.logger = logger;
  }

  async signUp({ tenantName, email, password }) {
    if (!tenantName || !email || !password)
      throw new Error('Campos obrigatórios');

    const hash = await bcrypt.hash(password, 12);

    // Cria tenant (usamos o service já feito)
    const { TenantServices } = await import('../tenant/service.js');
    const { TenantRepository } = await import('../tenant/repository.js');
    const { logger } = await import('../../config/logger.js');

    const tenantRepo = new TenantRepository(logger);
    const tenantService = new TenantServices(tenantRepo, logger);
    const tenant = await tenantService.createTenant({ name: tenantName });

    // Cria user
    const user = await this.repo.createUser({
      tenantId: tenant.id,
      email,
      hash,
    });

        this.logger.info('User criado id=%s tenant=%s', user.id, tenant.id);

    // Criar JWT
    const token = jwt.sign(
      { uid: user.id, tenantId: tenant.id, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: '7d' }
    );

    this.logger.info('JWT gerado para user %s', user.id);
    return { user, tenant, token };
  }
  async login({ email, password }) {
  this.logger.info('Tentativa login %s', email);

  const user = await this.repo.findUserByEmail(email);
  if (!user) throw new Error('Credenciais inválidas');

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error('Credenciais inválidas');

  const token = jwt.sign(
    { uid: user.id, tenantId: user.tenant_id, role: user.role },
    ENV.JWT_SECRET,
    { expiresIn: '7d' }
  );

  this.logger.info('Login ok user=%s', user.id);
  return { user, token };
}
async inviteMember({ tenantId, email }) {
  // gera senha aleatória e envia e-mail (simplificado)
  const tempPassword = Math.random().toString(36).slice(-8);
  const hash = await bcrypt.hash(tempPassword, 12);
  const user = await this.repo.createUser({
    tenantId,
    email,
    hash,
    role: 'member',
  });
  return { user, tempPassword }; // enviar por e-mail depois
}
async inviteMember({ tenantId, email }) {
  this.logger.info('Convite %s tenant=%s', email, tenantId);

  const exists = await this.repo.findUserByEmail(email);
  if (exists) throw new Error('Email já cadastrado');

  const tempPassword = Math.random().toString(36).slice(-8);
  const hash = await bcrypt.hash(tempPassword, 12);

  const user = await this.repo.createUser({
    tenantId,
    email,
    hash,
    role: 'member',
  });

  this.logger.info('User convidado id=%s', user.id);
  return { user, tempPassword }; // enviar email depois
}
async login({ email, password }) {
  const user = await this.repo.findUserByEmail(email);
  if (!user) throw new Error('Credenciais inválidas');

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) throw new Error('Credenciais inválidas');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken, user };
}
async refresh(refreshToken) {
  if (!refreshToken) throw new Error('Refresh token missing');

  const payload = jwt.verify(refreshToken, ENV.JWT_SECRET);
  const user = await this.repo.findUserById(payload.uid);
  if (!user || (user.token_version || 0) !== payload.version) {
    throw new Error('Refresh token inválido');
  }

  const accessToken = generateAccessToken(user);
  return { accessToken };
}
}
  
