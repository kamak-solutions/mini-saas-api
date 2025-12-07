import { App } from './app.js';
import { ENV } from './config/env.js';
import './config/db.js';

export const app = new App();

// inicia servidor ANTES de exportar
if (process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT);
}