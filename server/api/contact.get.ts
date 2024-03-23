import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
  const {id} = getQuery(event)
  const contacts = await prisma.contact.findFirst({
    where:{
      id: parseInt(id as string)
    },
    include: {
        tag: true
      }
    });
    return contacts || {};
});