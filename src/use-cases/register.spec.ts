import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'rodrigoagamer@gmail.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash the user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'rodrigoagamer@gmail.com',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with the same email twice', async () => {
    const email = 'rodrigoagamer@gmail.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345678',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should send a validation code to the user email', async () => {
    const { wasEmailSent } = await sut.execute({
      name: 'John Doe',
      email: 'rodrigoagamer@gmail.com',
      password: '12345678',
    })

    expect(wasEmailSent).toBe(true)
  })

  it('should not be able to register with an invalid email', async () => {
    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
