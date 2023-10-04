import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { firstName, lastName, company } = event.context.query;

  const users = await prisma.contact.findMany({
    where: {
      AND: [
        {
          firstName: {
            contains: firstName as string || '',
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: lastName as string || '',
            mode: 'insensitive',
          },
        },
        {
          company: {
            contains: company as string || '',
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  return users;
});