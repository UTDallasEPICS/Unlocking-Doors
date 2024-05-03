// delete a tag

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    //console.log("im here")
  try {
    const { id } = getQuery(event); // Extract tag ID from request parameters

    if (!id) {
      return { error: 'Tag ID is missing' };
    }

    // Convert the ID to a number (assuming it's a string)
    const tagId = parseInt(id as string);
    //console.log(tagId,"TagId");

    // Perform database query to delete the specified tag
    await prisma.tag.delete({
      where: {
        id: tagId,
      },
    });

    // Return success response
    return { success: true };
  } catch (error) {
    console.error('Error deleting tag:', error);
    // Return an error response
    return { error: 'Failed to delete tag' };
  }
});
