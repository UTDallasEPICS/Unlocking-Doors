import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {

  const { searchQuery, tag, cursor } = getQuery(event)
  const query:any = {
    where: {}
  }
  if(searchQuery) {
    query.where.OR = [
        {
          firstName: {
            //HAVE CONTAINS SEARCH QUERY INSTEAD  
            contains: searchQuery as any,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: searchQuery as any,
            mode: 'insensitive',
          },
        },
        {
          company: {
            contains: searchQuery as any,
            mode: 'insensitive',
          },
        },
      ]
  }
  if(tag != "None" && tag) {
    query.where.Tags = {
      some: {name:tag},
    }
  }

  const pageSize = 10;
  
  const contacts = await prisma.contact.findMany(query);
  return contacts;
});