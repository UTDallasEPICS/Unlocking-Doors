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
    const body = await readBody(event);

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tag name is required and must be a non-empty string.',
      });
    }

    // Check if another tag with the new name already exists (excluding the current tag)
    const existingTagWithName = await prisma.tag.findFirst({
      where: {
        name: body.name.trim(),
        NOT: {
          id: tagId,
        },
      },
    });

    if (existingTagWithName) {
      throw createError({
        statusCode: 409, // Conflict
        statusMessage: `Another tag with name "${body.name.trim()}" already exists.`,
      });
    }

    const updatedTag = await prisma.tag.update({
      where: { id: tagId },
      data: {
        name: body.name.trim(),
      },
    });

    return updatedTag;
  } catch (error: any) {
    console.error(`Error updating tag with ID ${tagId}:`, error);
    if (error.statusCode) {
      throw error;
    }
    // Check for Prisma's record not found error
    if (error.code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: `Tag with ID ${tagId} not found.`,
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update tag.',
    });
  } finally {
    await prisma.$disconnect();
  }
});
