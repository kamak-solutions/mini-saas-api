import { Router } from 'express';
import { AuthController } from './controller.js';
import { AuthService } from './service.js';
import { AuthRepository } from './repository.js';
import { logger } from '../../config/logger.js';
import { loginLimit } from '../../middlewares/rateLimit.js';

const repo    = new AuthRepository();
const service = new AuthService(repo, logger);
const ctrl    = new AuthController(service);


export default new Router()
  .post('/signup', ctrl.signUp)
  .post('/login', loginLimit, ctrl.login);
