export default defineEventHandler(async (event) => {
  try {
    // Retrieve all tags from the database
    const tags = await event.context.client.tag.findMany({
        where: {
          //this is the only way the filter can work proeprly
          removed:false
        }
    });
    // Return an array of tag names
    return tags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    // Return an error response
    return { error: 'Failed to fetch tags' };
  }
});
