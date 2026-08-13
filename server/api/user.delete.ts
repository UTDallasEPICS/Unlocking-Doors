export default defineEventHandler(async (event) => {
  const { email } = getQuery(event);
  const deletedUser = await event.context.client.user.delete({
    where: {
      email: email as string,
    },
  });

  return deletedUser;
});
