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
    added_date
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
  const currentDate = new Date();
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
    added_date : new Date() 

  };

  console.log("contact created1");
  console.log("tagend1: ", JSON.stringify(newContactData.tag)); // Corrected logging
  console.log("firstend1: ", firstName);
  // console.log("date1: ", new);

  const newContact = await prisma.contact.create({
    data: newContactData,
  });

  console.log("contact created2");
  console.log("tagend2: ", JSON.stringify(newContactData.tag)); // Corrected logging
  console.log("firstend2: ", firstName);

  console.log("date2date: ", newContactData.added_date);
  



  return {
    data: newContact,
  };
});
