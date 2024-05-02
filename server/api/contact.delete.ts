import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const contactId = Number(query.contactId);
  console.log("Contact ID to delete is: " ,contactId)

  await prisma.contact.delete({
    where: { id: contactId },
  })
})
