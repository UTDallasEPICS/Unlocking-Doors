export default defineEventHandler(async (event) => {
    const { username, permission } = await readBody(event)
  
    const newUser = await event.context.client.user.create({
      data: {
        username,
        permission,
      },
    });
  
    return newUser;
  });