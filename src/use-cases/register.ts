import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
import { env } from '@/env'
import validate from 'deep-email-validator'
import { sendEmail } from './services/send-email'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
  wasEmailSent: boolean
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const validEmail = await validate(email)

    if (validEmail.valid === false) {
      throw new InvalidCredentialsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      changed_password_at: new Date(),
    })

    const mailOptions = {
      from: env.AUTH_EMAIL,
      to: user.email,
      subject: 'Seu código de confirmação',
      text: `Coloque esse código para confirmar o email: ${user.validation_code}`,
    }

    const wasEmailSent =
      env.NODE_ENV === 'production' ? await sendEmail(mailOptions) : true

    return {
      user,
      wasEmailSent,
    }
  }
}
