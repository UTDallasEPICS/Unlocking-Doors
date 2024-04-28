/*
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {

  const { searchQuery, tag, cursor } = getQuery(event)
  const query:any = {
    where: {},
    include:{
      tag:true
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
  if(tag != "None" && tag) {
    query.where.tag = {
      some: {name:tag},
    }
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
*/

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { searchQuery, tag, startDate, endDate } = getQuery(event);

  const query: any = {
    where: {
      AND: [],
    },
    include: {
      tag: true,
    },
  };

  // Date filtering
  if (startDate && endDate) {
    query.where.AND.push({
      added_date: {
        gte: startDate,
        lte: endDate,
      }
    });
  }

  // Tag filtering
  if (tag !== "None" && tag) {
    query.where.AND.push({
      tag: {
        some: {
          name: tag,
        }
      }
    });
  }

  // Search query filtering
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

  const pageSize = 10; // Define how pagination should be handled if needed
  const contacts = await prisma.contact.findMany(query);
  return contacts;
});
