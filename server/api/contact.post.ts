import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
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
  } = await readBody(event)

  // Create a new contact in the database.
  console.log(tags)
  const newContact = await prisma.contact.create({
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
      Tags: {
        connectOrCreate: tags.map((tagName: string) => {
          return {
            where: { name: tagName },
            create: { name: tagName },
          };
        }),
      },
    }
  });

  // Return the new contact data as a JSON response.
  return {
    data: newContact,
  }
})
