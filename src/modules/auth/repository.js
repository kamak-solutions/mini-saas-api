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
}