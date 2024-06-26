// retreive a single tag

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler( async (event) => {
    const tags = await prisma.tag.findMany();
    return tags.map(({name})=>name);
});