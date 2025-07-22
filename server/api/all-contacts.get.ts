export default defineEventHandler(async (event) => {
  const data = await event.context.client.contact.findMany({
    where: {
      removed: false,
    },
    include: {
      tag: true
    }
  });
  return data;
});
