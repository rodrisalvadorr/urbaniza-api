import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeConfirmEmailUseCase } from '@/use-cases/factories/make-confirm-email-use-case'
import { ResourceAlreadyValidatedError } from '@/use-cases/errors/resource-already-validated-error'

export async function confirmEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const confirmEmailBodySchema = z.object({
    userId: z.string(),
    code: z.string(),
  })

  const { userId, code } = confirmEmailBodySchema.parse(request.body)

  try {
    const confirmEmailUseCase = makeConfirmEmailUseCase()

    await confirmEmailUseCase.execute({
      userId,
      code,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    if (err instanceof ResourceAlreadyValidatedError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
