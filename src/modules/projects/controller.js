export class ProjectsController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      const proj = await this.service.createProject(req.tenantId, req.body);
      res.status(201).json(proj);
    } catch (e) {
      next(e);
    }
  };

  list = async (req, res, next) => {
    try {
      const list = await this.service.listProjects(req.tenantId);
      res.json(list);
    } catch (e) {
      next(e);
    }
  };

  get = async (req, res, next) => {
    try {
      const proj = await this.service.getProject(req.tenantId, req.params.id);
      res.json({ message: 'Project deletado com sucesso', project: proj })
    } catch (e) {
      next(e);
    }
  };

  remove = async (req, res, next) => {
    try {
      await this.service.removeProject(req.tenantId, req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
  update = async (req, res, next) => {
    try {
      const proj = await this.service.updateProject(req.tenantId, req.params.id, req.body);
      res.json({ message: 'Project atualizado', project: proj });
    } catch (e) {
      next(e);
    }
  };
}