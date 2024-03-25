import { prisma } from '@/lib/prisma'
import { UsersRepository } from '../users-repository'
import { Prisma, User } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async update(data: User) {
    const user = await prisma.user.update({
      data,
      where: {
        id: data.id,
      },
    })

    if (!user) {
      return false
    }

    return true
  }
}
