import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'
import nodemailer from 'nodemailer'
import { env } from '@/env'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
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

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      changed_password_at: new Date(),
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.AUTH_EMAIL,
        pass: env.AUTH_EMAIL_PASSWORD,
      },
    })

    const mailOptions = {
      from: env.AUTH_EMAIL,
      to: user.email,
      subject: 'Seu código de confirmação',
      text: `Coloque esse código para confirmar o email: ${user.validation_code}`,
    }

    const { rejected } = await transporter.sendMail(mailOptions)

    if (rejected.includes(user.email)) {
      throw new Error()
    }

    return {
      user,
    }
  }
}
