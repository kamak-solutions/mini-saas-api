import pg from 'pg';
import { ENV } from './env.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: false,
});

(async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('✅ Postgres conectado');
  } catch (err) {
    console.error('❌ Postgres erro:', err);
    process.exit(1);
  }
})();