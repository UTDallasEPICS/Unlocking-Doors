import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const contactId = query.contactId;
  const action = query.action;
 
  console.log('Received contact ID and action in TypeScript:', contactId, action);

  const parsedContactId = parseInt(contactId as string);

  if (isNaN(parsedContactId) || parsedContactId <= 0) {
    return {
      error: "Invalid contact ID provided." + contactId,
    };
  }

  try {
    let updatedContact;

    if (action === 'recover') {
      // Update the contact by setting its removed field to false
      updatedContact = await prisma.contact.update({
        where: { id: parsedContactId },
        data: { removed: false },
      });
    } else if (action === 'delete') {
      // Update the contact by setting its removed field to true
      updatedContact = await prisma.contact.update({
        where: { id: parsedContactId },
        data: { removed: true },
      });
    } else {
      return {
        error: "Invalid action provided.",
      };
    }

    return {
      data: updatedContact,
    };
  } catch (error) {
    console.error(error);
    return {
      error: `An error occurred while ${action}ing the contact.`,
    };
  }
});
