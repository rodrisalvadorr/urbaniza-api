import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      email_validated_at: null,
      profile_picture: null,
      changed_profile_picture_at: null,
      password_hash: data.password_hash,
      changed_password_at: new Date(),
      is_notifications_on: false,
      is_terms_of_use_accepted: false,
      validation_code: 'validation string',
    }

    this.items.push(user)

    return user
  }

  async update(data: User) {
    const userIndex = this.items.findIndex((item) => item.id === data.id)

    const deletedContent = this.items.splice(userIndex, 1, data)

    if (deletedContent.length === 0) {
      return false
    }

    return true
  }
}
