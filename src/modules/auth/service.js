import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {ENV} from '../../config/env.js'

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
}
  
