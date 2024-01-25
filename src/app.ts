import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod'

import fastifyJwt from '@fastify/jwt'


import { orgsRoutes } from './http/controllers/orgs/routes'
import { petsRoutes } from './http/controllers/pets/routes'



export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  }
})
app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // todo
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
