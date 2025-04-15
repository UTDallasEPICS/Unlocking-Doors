export default defineEventHandler(async () => {
    const users = await event.context.client.user.findMany();
    return users;
  });