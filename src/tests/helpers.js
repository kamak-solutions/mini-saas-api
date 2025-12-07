import supertest from 'supertest';
import { app } from '../server.js';

const server = app.listen(0); // <-- força listen ANTES de exportar
export const request = supertest(server);

export async function signupAndLogin(dto) {
  const sign = await request.post('/api/auth/signup').send(dto);
  const login = await request.post('/api/auth/login').send({ email: dto.email, password: dto.password });
  return login.body.accessToken;
}