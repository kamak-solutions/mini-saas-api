import { Router } from 'express';
import { ProjectsController } from './controller.js';
import { ProjectsService } from './service.js';
import { ProjectsRepository } from './repository.js';
import { logger } from '../../config/logger.js';
import { auth } from '../../middlewares/auth.js';

const repo    = new ProjectsRepository(logger);
const service = new ProjectsService(repo);
const ctrl    = new ProjectsController(service);

export default new Router()
  .post('/', auth, ctrl.create)
  .get('/', auth, ctrl.list)
  .get('/:id', auth, ctrl.get)
  .delete('/:id', auth, ctrl.remove);