import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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
    tag,
  } = await readBody(event)

  // Create a new contact in the database.
  const newContact = await prisma.contact.create({
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
      tag,
    },
  })

  // Return the new contact data as a JSON response.
  return {
    data: newContact,
  }
})
