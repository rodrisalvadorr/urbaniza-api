import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetProfileUseCase } from './get-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUserRepository
let sut: GetProfileUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new GetProfileUseCase(usersRepository)
  })

  it('should be able to get profile', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
      changed_password_at: new Date(),
    })

    await sut.execute({
      userId: user.id,
    })

    expect(user.name).toBe('John Doe')
  })

  it('should not be able to get profile with invalid id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
