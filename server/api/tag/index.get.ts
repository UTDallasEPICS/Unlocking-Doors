import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const tagId = parseInt(query.id as string);

  if (isNaN(tagId)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid Tag ID provided.',
    });
  }

  try {
    const tag = await prisma.tag.findUnique({
      where: { id: tagId },
    });

    if (!tag) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Tag not found.',
      });
    }

    return tag;
  } catch (error: any) {
    console.error(`Error fetching tag with ID ${tagId}:`, error);
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch tag.',
    });
  } finally {
    await prisma.$disconnect();
  }
});
