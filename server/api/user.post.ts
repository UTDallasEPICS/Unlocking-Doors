import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const { username, permission } = await readBody(event)
  
    const newUser = await prisma.user.create({
      data: {
        username,
        permission,
      },
    });
  
    return newUser;
  });