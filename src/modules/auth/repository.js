import { pool } from '../../config/db.js';

export class AuthRepository {
  async createUser({ tenantId, email, hash }) {
    const { rows } = await pool.query(
      `INSERT INTO users (tenant_id, email, password_hash, role)
       VALUES ($1, $2, $3, 'admin') RETURNING *`,
      [tenantId, email, hash]
    );
    return rows[0];
  }

  async findUserByEmail(email) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0];
  }
  async createUser({ tenantId, email, hash, role = 'member' }) {
  const { rows } = await pool.query(
    'INSERT INTO users (tenant_id, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING *',
    [tenantId, email, hash, role]
  );
  return rows[0];
}
async findUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}
}