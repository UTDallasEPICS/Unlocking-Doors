import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const contactId = event.context.id

  await prisma.contact.delete({
    where: { id: contactId },
  })
})
