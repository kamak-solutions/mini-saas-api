import { pool } from '../../config/db.js';

export class ProjectsRepository {
  constructor(logger) {
    this.logger = logger;
  }

  async insert({ tenantId, name }) {
    this.logger.debug('ProjectsRepository.insert %s %s', tenantId, name);
    const { rows } = await pool.query(
      'INSERT INTO projects (tenant_id, name) VALUES ($1, $2) RETURNING *',
      [tenantId, name]
    );
    return rows[0];
  }

  async findAllByTenant(tenantId) {
    this.logger.debug('ProjectsRepository.findAllByTenant %s', tenantId);
    const { rows } = await pool.query(
      'SELECT * FROM projects WHERE tenant_id = $1 ORDER BY created_at DESC',
      [tenantId]
    );
    return rows;
  }

  async findByIdAndTenant(id, tenantId) {
    const { rows } = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND tenant_id = $2',
      [id, tenantId]
    );
    return rows[0];
  }

  async deleteByIdAndTenant(id, tenantId) {
    const { rows } = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND tenant_id = $2 RETURNING *',
      [id, tenantId]
    );
    return rows[0];
  }
   async updateByIdAndTenant(id, tenantId, fields) {
  const { rows } = await pool.query(
    'UPDATE projects SET name = $1 WHERE id = $2 AND tenant_id = $3 RETURNING *',
    [fields.name, id, tenantId]
  );
  return rows[0];
}
}