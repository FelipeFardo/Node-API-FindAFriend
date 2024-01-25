import request from "supertest";
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe('Authenticate (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })


  it('should be able to authenticate', async () => {
    await request(app.server)
      .post('/orgs')
      .send({
        name: 'Bixo Vadio',
        email: 'johndoe@example.com',
        password: '123456',
        address: "Times square",
        phone: "12345-6789"
      })


    const response = await request(app.server)
      .post('/orgs/session')
      .send({
        email: 'johndoe@example.com',
        password: '123456'
      })


    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
  })
})