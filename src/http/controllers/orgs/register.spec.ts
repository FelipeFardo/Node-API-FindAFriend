import request from "supertest";
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from "vitest";


describe('Register (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })


  it('should be able to register org', async () => {
    const response = await request(app.server)
      .post('/orgs')
      .send({
        name: 'Bixo Vadio',
        email: 'johndoe@example.com',
        password: '123456',
        address: "Times square",
        phone: "12345-6789"
      })

    expect(response.statusCode).toEqual(201)
  })
})