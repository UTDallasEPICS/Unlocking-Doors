export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const contactId = Number(query.contactId);
  console.log("Contact ID to delete is: " ,contactId)

  await event.context.client.contact.delete({
    where: { id: contactId },
  })
})
