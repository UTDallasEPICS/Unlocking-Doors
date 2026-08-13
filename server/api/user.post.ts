export default defineEventHandler(async (event) => {
  const { email, permission } = await readBody(event);

  const newUser = await event.context.client.user.create({
    data: {
      email,
      permission,
    },
  });

  return newUser;
});
