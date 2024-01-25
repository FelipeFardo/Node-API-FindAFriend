import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { get } from './get'
import { create } from './create'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get(`/pets/:petId`, get)
  app.get('/pets/search', search)

  app.post('/pets', { onRequest: [verifyJWT] }, create)
}
