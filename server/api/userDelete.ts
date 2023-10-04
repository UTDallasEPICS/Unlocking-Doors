import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { username } = event.context.params!;
  
    const deletedUsers = await prisma.user.deleteMany({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });
  
    return deletedUsers;
  });