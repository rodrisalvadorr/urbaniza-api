import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { ConfirmEmailUseCase } from './confirm-email'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceAlreadyValidatedError } from './errors/resource-already-validated-error'

let usersRepository: InMemoryUserRepository
let sut: ConfirmEmailUseCase

describe('Confirm Email Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new ConfirmEmailUseCase(usersRepository)
  })

  it('should be able to confirm email', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
      changed_password_at: new Date(),
    })

    const response = await sut.execute({
      userId: user.id,
      code: user.validation_code,
    })

    expect(response.wasItUpdated).toBe(true)
  })

  it('should not be able to confirm email in wrong user', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
      changed_password_at: new Date(),
    })

    expect(async () => {
      await sut.execute({
        userId: 'different-id',
        code: user.validation_code,
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to confirm email twice', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
      changed_password_at: new Date(),
    })

    await sut.execute({
      userId: user.id,
      code: user.validation_code,
    })

    expect(async () => {
      await sut.execute({
        userId: user.id,
        code: user.validation_code,
      })
    }).rejects.toBeInstanceOf(ResourceAlreadyValidatedError)
  })

  it('should not be able to confirm email with wrong code', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
      changed_password_at: new Date(),
    })

    expect(async () => {
      await sut.execute({
        userId: user.id,
        code: 'different-code',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
