/*
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
*/

// Have a tag.put request to modify the tags
// Maybe a tag.delete request to delete the tags
// Have a tag.get to retrieve to get the tags
// Outline for table: Tag name | Modify tag (tag.put request) | Delete tag (tag.delete request)


import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { contactId } = getQuery(event)
  console.log("contactid ",contactId);
  const parsedContactId = parseInt(contactId as string || '0');
  console.log("parsedcontactid ", parsedContactId);

  if (isNaN(parsedContactId) || parsedContactId <= 0) {
    return {
      error: "Invalid contact ID provided.",
    };
  }

  const {
    prefix,
    firstName,
    middleName,
    lastName,
    suffix,
    professionalTitle,
    address1,
    city1,
    state1,
    zipCode1,
    address1Type,
    address2,
    city2,
    state2,
    zipCode2,
    address2Type,
    mainPhone,
    directPhone,
    mobilePhone,
    emailAddress,
    narrative,
    company,
    tag = [],
  } = await readBody(event);

  // Process tags similar to your contact.post file
 const processedTags = Array.isArray(tag) && tag.length ? {
  connectOrCreate: tag.map(tagObject => ({
    where: { name: tagObject.name },
    create: { name: tagObject.name },
  })),
} : undefined;


  try {
    const updatedContact = await prisma.contact.update({
      where: { id: parsedContactId },
      data: {
        prefix,
        firstName,
        middleName,
        lastName,
        suffix,
        professionalTitle,
        address1,
        city1,
        state1,
        zipCode1,
        address1Type,
        address2,
        city2,
        state2,
        zipCode2,
        address2Type,
        mainPhone,
        directPhone,
        mobilePhone,
        emailAddress,
        narrative,
        company,
        ...(processedTags && { tag: processedTags }), 
      },
    });
    return {
      data: updatedContact,
    };
  } catch (error) {
    console.error(error);
    // Respond with a more informative error message or code
    return {
      error: "An error occurred while updating the contact.",
    };
  };
});

// Error is happening in this file from console.log statements, most likely from the getQuery function 