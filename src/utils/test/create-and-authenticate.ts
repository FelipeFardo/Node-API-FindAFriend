import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'


export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const org = await prisma.org.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      address: "Times Square",
      phone: "12345-4555",
    }
  })

  const authResponse = await request(app.server)
    .post('/orgs/session')
    .send({
      email: 'johndoe@example.com',
      password: '123456'
    })

  const { token } = authResponse.body

  return {
    org,
    token
  }
}