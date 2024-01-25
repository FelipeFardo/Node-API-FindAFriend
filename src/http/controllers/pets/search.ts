import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const createPetParamsSchema = z.object({
    name: z.string().optional(),
    race: z.string().optional(),
    size: z.string().optional(),
    city: z.string(),

  })

  const { city, name, race, size } =
    createPetParamsSchema.parse(request.query)

  const searchPetsUseCase = makeSearchPetsUseCase()


  const { pets } = await searchPetsUseCase.execute({
    city,
    name,
    race,
    size
  })

  return reply.status(200).send({
    pets
  })
}