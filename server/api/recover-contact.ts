import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const contactId = getQuery(event);

  console.log('Received contact ID in TypeScript:', contactId); 
  const parsedContactId = parseInt(contactId as string);
  if (isNaN(parsedContactId) || parsedContactId <= 0) {
    return {
      error: "Invalid contact ID provided." + contactId,
    };
  }

  try {
    // Update the contact by setting its removed field to false
    const recoveredContact = await prisma.contact.update({
      where: { id: parsedContactId },
      data: { removed: false },
    });

    return {
      data: recoveredContact,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "An error occurred while recovering the contact.",
    };
  }
});
