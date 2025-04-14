export default defineEventHandler(async (event) => {
  const {
    id,
    prefix,
    firstName,
    middleName,
    lastName,
    suffix,
    professionalTitle,
    address1,
    city1,
    state1,
    zipCode1,
    address1Type,
    address2,
    city2,
    state2,
    zipCode2,
    address2Type,
    mainPhone,
    directPhone,
    mobilePhone,
    emailAddress,
    narrative,
    company,
    tag = [],
  } = await readBody(event);
  // Process tags similar to your contact.post file
 const processedTags = Array.isArray(tag) && tag.length ? {
  connectOrCreate: tag.map(name => ({
    where: { name },
    create: { name},
  })),
} : undefined;

  try {
    const updatedContact = await event.context.client.contact.update({
      where: { id },
      data: {
        prefix,
        firstName,
        middleName,
        lastName,
        suffix,
        professionalTitle,
        address1,
        city1,
        state1,
        zipCode1,
        address1Type,
        address2,
        city2,
        state2,
        zipCode2,
        address2Type,
        mainPhone,
        directPhone,
        mobilePhone,
        emailAddress,
        narrative,
        company,
        ...(processedTags && { tag: processedTags }), 
      },
    });
    return {
      data: updatedContact,
    };
  } catch (error) {
    console.error(error);
    // Respond with a more informative error message or code
    return {
      error: "An error occurred while updating the contact.",
    };
  };
});

// Error is happening in this file from console.log statements, most likely from the getQuery function 