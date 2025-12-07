export class ProjectsService {
  constructor(repo) {
    this.repo = repo;
  }

  async createProject(tenantId, dto) {
    if (!dto.name) throw new Error('Nome obrigatório');
    return this.repo.insert({ tenantId, name: dto.name });
  }

  async listProjects(tenantId) {
    return this.repo.findAllByTenant(tenantId);
  }

  async getProject(tenantId, id) {
    const proj = await this.repo.findByIdAndTenant(id, tenantId);
    if (!proj) throw new Error('Project not found');
    return proj;
  }

  async removeProject(tenantId, id) {
    const proj = await this.repo.deleteByIdAndTenant(id, tenantId);
    if (!proj) throw new Error('Project not found');
    this.logger.info('Project deletado id=%s tenant=%s', id, tenantId);
    return proj;
  }
}