import { Router } from 'express';
import { TenantController } from './controller.js';
import { TenantServices } from './service.js';
import { TenantRepository } from './repository.js';

import { logger } from '../../config/logger.js'

const repo    = new TenantRepository(logger)
const service = new TenantServices(repo, logger)
const ctrl    = new TenantController(service)

export default new Router()
  .post('/', ctrl.create)