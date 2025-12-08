import pg from 'pg';
import { ENV } from './env.js';
import { logger } from './logger.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: ENV.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

(async () => {
  try {
    await pool.query('SELECT NOW()');
    logger.info('✅ Postgres conectado');
  } catch (err) {
    logger.error('❌ Postgres erro:', err);
    process.exit(1);
  }
})();