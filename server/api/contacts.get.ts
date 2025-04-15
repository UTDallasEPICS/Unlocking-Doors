export default defineEventHandler(async (event) => {
  const { pageSize, searchQuery, tag, startDate, endDate, cursor, showRemoved } = getQuery(event);
  const id =  parseInt(cursor as string || "0")
  
  const query: any = {
    where: {
      removed: showRemoved == "true",
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
    event.context.client.contact.findMany({
      take: parseInt(pageSize as string),
      ...query,
      ...(id && {
        skip: 1,
        cursor: {
          id,
        }
      }),
    }),
    event.context.client.contact.count(query)
  ])
  return {data, count};
});
