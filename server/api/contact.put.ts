import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { contactId } = getQuery(event)
  const parsedInt = parseInt(contactId as string || '0');
  
  // Get the contact data from the request body.
  const {
    prefix,
    firstName,
    lastName,
    suffix,
    salutation,
    professionalTitle,
    address,
    city,
    state,
    zipCode,
    country,
    mainPhone,
    directPhone,
    mobilePhone,
    emailAddress,
    narrative,
    company,
    tags,
  } = await readBody(event);

  // Retrieve the contact ID from the request parameters or body.

  // Update the existing contact in the database.
  const updatedContact = await prisma.contact.update({
    where: { id: parsedInt as any },
    data: {
      prefix,
      firstName,
      lastName,
      suffix,
      salutation,
      professionalTitle,
      address,
      city,
      state,
      zipCode,
      country,
      mainPhone, 
      directPhone,
      mobilePhone,
      emailAddress,
      narrative,
      company,

    },
  });

  // Return the updated contact data as a JSON response.
  return {
    data: updatedContact,
  };
});
