export default defineEventHandler( async (event) => {
  const {id} = getQuery(event)
  if(id =="0") return {tag:[]}
  const contact = await event.context.client.contact.findFirst({
    where:{
      id: parseInt(id as string)
    },
    include: {
        tag: true
      }
    });
    return contact || {tag:[]};
});