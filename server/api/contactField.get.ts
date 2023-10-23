import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//if any of thse 3 fields, then get

export default defineEventHandler(async (event) => {
  /*
  const firstName = event.context.query?.firstName || '';
  const lastName = event.context.query?.lastName || '';
  const company = event.context.query?.company || '';
  */

  const { firstName, lastName, company } = getQuery(event)

  
  const contacts = await prisma.contact.findMany({
    where: {
      OR: [
        {
          firstName: {
            //HAVE CONTAINS SEARCH QUERY INSTEAD  
            contains: firstName as any,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: lastName as any,
            mode: 'insensitive',
          },
        },
        {
          company: {
            contains: company as any,
            mode: 'insensitive',
          },
        },
      ],
    },
  });

  return contacts;
});