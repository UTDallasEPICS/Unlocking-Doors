import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tag name is required and must be a non-empty string.',
      });
    }

    const existingTag = await prisma.tag.findUnique({
      where: { name: body.name.trim() },
    });

    if (existingTag) {
      throw createError({
        statusCode: 409, // Conflict
        statusMessage: `Tag with name "${body.name.trim()}" already exists.`,
      });
    }

    const newTag = await prisma.tag.create({
      data: {
        name: body.name.trim(),
      },
    });

    return newTag;
  } catch (error: any) {
    console.error('Error creating tag:', error);
    // If it's already an H3Error, rethrow it, otherwise create a generic server error
    if (error.statusCode) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create tag.',
    });
  } finally {
    await prisma.$disconnect();
  }
});
