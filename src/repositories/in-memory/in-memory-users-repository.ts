import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = []

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
      validation_code: null,
    }

    this.items.push(user)

    return user
  }
}
