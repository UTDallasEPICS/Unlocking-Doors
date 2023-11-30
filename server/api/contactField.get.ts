import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {

  const { searchQuery, tag } = getQuery(event)
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
    query.where.tag = {
      some: {name:tag},
    }
  }
  
  const contacts = await prisma.contact.findMany(query);

  return contacts;
});