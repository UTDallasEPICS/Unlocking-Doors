import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { searchQuery, tag, startDate, endDate, cursor } = getQuery(event);
  const pageSize = 10; 
  
  const query: any = {
    where: {
      AND: [],
    },
    include: {
      tag: true,
    },
  };

  if (startDate && endDate) {
    query.where.AND.push({
      added_date: {
        gte: startDate,
        lte: endDate,
      }
    });
  }

  if (tag !== "None" && tag) {
    query.where.AND.push(
      ...(tag as string).split(",").map(
        s => ({
          tag: {
            some: {
              name: s,
            }
          }
        })
      )
    );
  }

  if (searchQuery) {
    query.where.AND.push({
      OR: [
        {
          firstName: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
        {
          company: {
            contains: searchQuery,
            mode: 'insensitive',
          },
        },
      ]
    });
  }

  
  const contacts = await prisma.contact.findMany(query);
  return contacts;
});
