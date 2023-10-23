import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  // Get the contact ID from the request parameters.
  const { id } = event.context.params!

  // Get the updated contact data from the request body.
  const updatedContact = await readBody(event)

  // Update the contact in the database.
  const contact = await prisma.contact.update({
    where: { id: parseInt(id) },
    data: updatedContact,
  })

  // Return the updated contact data as a JSON response.
  return {
    data: contact,
  }
})