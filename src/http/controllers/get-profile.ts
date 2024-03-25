import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeGetProfileUseCase } from '@/use-cases/factories/make-get-profile-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  const getProfileBodySchema = z.object({
    userId: z.string(),
  })

  const { userId } = getProfileBodySchema.parse(request.body)

  let user

  try {
    const getProfileUseCase = makeGetProfileUseCase()

    user = await getProfileUseCase.execute({
      userId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send(user)
}
