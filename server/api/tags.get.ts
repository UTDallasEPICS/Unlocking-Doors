// retrieve all tags

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    // Retrieve all tags from the database
    const tags = await prisma.tag.findMany({
        where: {
          //this is the only way the filter can work proeprly
          removed:false
        }
    });
    // Return an array of tag names
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    // Return an error response
    return { error: 'Failed to fetch tags' };
  }
});
