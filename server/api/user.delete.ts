export default defineEventHandler(async (event) => {
  
  const { username } = getQuery(event);
  const deletedUser = await event.context.client.user.delete({
    where: {
      username: username as any
    },
  });

  return deletedUser;
});