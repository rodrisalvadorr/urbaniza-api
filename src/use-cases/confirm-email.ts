import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceAlreadyValidated } from './errors/resource-already-validated-error'

interface ConfirmEmailUseCaseRequest {
  userId: string
  code: string
}

interface ConfirmEmailUseCaseResponse {
  wasItUpdated: boolean
}

export class ConfirmEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    code,
  }: ConfirmEmailUseCaseRequest): Promise<ConfirmEmailUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    if (user.email_validated_at) {
      throw new ResourceAlreadyValidated()
    }

    if (code !== user.validation_code) {
      throw new InvalidCredentialsError()
    }

    user.email_validated_at = new Date()
    user.validation_code = null

    const wasItUpdated = await this.usersRepository.update(user)

    return {
      wasItUpdated,
    }
  }
}
