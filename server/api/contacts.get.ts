import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { searchQuery, tag, startDate, endDate, cursor } = getQuery(event);
  const id =  parseInt(cursor as string || "0")
  const pageSize = 10; 
  const query: any = {
    take: pageSize,
    where: {
      AND: [],
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

  const [data,count] = await Promise.all([ //waits for all the results to return in an array
    prisma.contact.findMany({
      ...query,
      ...(id && {
        skip: 1,
        cursor: {
          id,
        }
      }),
    }),
    prisma.contact.count(query)
  ])
  return {data, count};
});