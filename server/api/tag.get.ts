export default defineEventHandler( async (event) => {
    const tags = await event.context.client.tag.findMany();
    return tags.map(({name})=>name);
});