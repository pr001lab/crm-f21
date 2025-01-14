async function createClient({ name, company, email, user  }) {
  try {
    return await strapi.entityService.create('api::client.client', {
      data: {
        name,
        company,
        email,
        user
      },
    });
  } catch (err) {
    console.log({ ...err.data });
    return 'Client cannot be created. Try again';
  }
}

module.exports = {
  createClient,
};
