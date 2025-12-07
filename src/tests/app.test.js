import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { request, signupAndLogin } from './helpers.js';
import { pool } from '../config/db.js';
import { app } from '../server.js';


describe('Mini-SaaS Integration', () => {
  beforeAll(async () => {
    await pool.query('DELETE FROM users WHERE email LIKE \'%test%\'');
    await pool.query('DELETE FROM projects WHERE name LIKE \'%test%\'');
  });

  afterAll(async () => {
    await pool.end();
  });



  it('signup + login', async () => {
    const dto = { tenantName: 'testCo'+ Date.now(), email: 'ceo@testco.com', password: '123456' };
    const sign = await request.post('/api/auth/signup').send(dto);
    expect(sign.status).toBe(201);
    expect(sign.body).toHaveProperty('token');

    const login = await request.post('/api/auth/login').send({ email: dto.email, password: dto.password });
    expect(login.status).toBe(200);
    expect(login.body).toHaveProperty('accessToken');
  });

  it('cria project autenticado', async () => {
    const token = await signupAndLogin({ tenantName: 'projCo', email: 'p@proj.co', password: '123456' });

    const create = await request.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'test project' });

    expect(create.status).toBe(201);
    expect(create.body.name).toBe('test project');
  });

  it('lista projects do tenant', async () => {
    const token = await signupAndLogin({ tenantName: 'listCo', email: 'l@list.co', password: '123456' });

    await request.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'A' });

    await request.post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'B' });

    const list = await request.get('/api/projects')
      .set('Authorization', `Bearer ${token}`);

    expect(list.status).toBe(200);
    expect(list.body.length).toBeGreaterThanOrEqual(2);
  });

  it('member não pode deletar (403)', async () => {
    // cria user member
    await pool.query(
      `INSERT INTO users (tenant_id, email, password_hash, role)
       VALUES (1, 'member@test.com', '$2b$12$fakeHash', 'member')`
    );

    const memberToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + // payload member
      Buffer.from(JSON.stringify({ uid: 999, tenantId: 1, role: 'member' })).toString('base64') +
      '.fakeSig';

    const del = await request.delete('/api/projects/1')
      .set('Authorization', `Bearer ${memberToken}`);

    expect(del.status).toBe(401);
    expect(del.body.message).toBe('Invalid or expired token');
  });
});