// tag.put.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    console.log("trying to run put")
  const { id } = getQuery(event); // Assuming you pass tag ID as a query parameter
  const { name } = await readBody(event); // Assuming you pass the updated tag name in the request body

  try {
    // Update the tag name in the database
    const updatedTag = await prisma.tag.update({
      where: { id: parseInt(id as string) }, // Assuming id is a string, parse it to an integer
      data: { name },
    });

    // Return the updated tag
    return updatedTag;
  } catch (error) {
    console.error('Error updating tag:', error);
    // Return an error response
    return { error: 'Failed to update tag' };
  }
});
