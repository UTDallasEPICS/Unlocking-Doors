import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  
  const { username } = getQuery(event);
  console.log(username);

  const deletedUser = await prisma.user.delete({
    where: {
      username: username as any
    },
  });

  return deletedUser;
});