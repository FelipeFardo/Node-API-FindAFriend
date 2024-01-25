import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    address: z.string(),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { name, email, password, address, phone } = registerOrgBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterUseCase()
    await registerOrgUseCase.execute({
      name,
      email,
      password,
      address,
      phone
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
