import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  // Get the contact data from the request body.
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
    // date,
  } = await readBody(event);

  console.log("tag: ", tag); // Improved logging
  console.log("fname: ", firstName);

  // Check if tag is actually an array and has elements before proceeding
  const processedTags = Array.isArray(tag) && tag.length
    ? {
        connectOrCreate: tag.map((tagName: any) => ({
          where: { name: tagName },
          create: { name: tagName },
      }))}
      
    : undefined; // Use undefined or an appropriate value if tags are not provided

      console.log("Processed tags: ", JSON.stringify(processedTags)); // Corrected logging

  // Create a new contact in the database.
  const newContactData = {
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
    ...(processedTags && { tag: processedTags }), // Conditionally include tags
    // Have date
  };

  const newContact = await prisma.contact.create({
    data: newContactData,
  });

  console.log("contact created");
  console.log("tagend: ", JSON.stringify(newContactData.tag)); // Corrected logging
  console.log("firstend: ", firstName);

  return {
    data: newContact,
  };
});
