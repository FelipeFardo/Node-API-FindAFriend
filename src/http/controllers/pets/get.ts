import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function get(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    petId: z.string().uuid()

  })

  const { petId } =
    getPetParamsSchema.parse(request.params)

  const getPetDetailsUseCase = makeGetPetDetailsUseCase()


  try {
    const { pet } = await getPetDetailsUseCase.execute({
      pet_id: petId
    })

    return reply.status(200).send({
      pet
    })

  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
    throw err;
  }
}
