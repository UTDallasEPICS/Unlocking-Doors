export default defineEventHandler(async (event) => {
    const users = await event.context.client.user.findMany();
    return users;
  });