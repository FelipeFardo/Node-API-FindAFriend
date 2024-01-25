import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    race: z.string(),
    size: z.string(),
    city: z.string(),
  })

  const { city, name, race, size } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    city,
    name,
    org_id: request.user.sub,
    race,
    size
  })

  return reply.status(201).send()
}