import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {

  const { searchQuery, tag, showRemoved} = getQuery(event)
  const query:any = {
    where: {
      removed: showRemoved === 'true',
    },
    include:{
     tag: true
      
    }
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

  if (tag !== "None" && tag) {
    const tags = Array.isArray(tag) ? tag : [tag]; // Ensure tag is an array
    
    query.where.AND = tags.map(tag => ({
      tag: {
        some: {
          name: tag
        }
      }
    }));
  }
  
  


  const pageSize = 10;
  
  const contacts = await prisma.contact.findMany(query);
  return contacts;
});

// Add new tab/page for editing contacts
// Create a table of existing tags to be able to modify/delete
// - each row is a tag 
// Columns include name, edit, and delete
// - Have confirmation for deleting tag
// Shouldn't actually delete tag, but 
