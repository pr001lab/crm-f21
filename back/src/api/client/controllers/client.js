'use strict';

/**
 * client controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::client.client', ({ strapi }) => ({
  async create(ctx) {
    const newClient = await strapi.service('api::client.client').create(ctx);

    ctx.body = await this.sanitizeOutput(newClient, ctx);
  },
  async find(ctx) {
    // const { data, meta } = await super.find(ctx);
    const data = await strapi.service('api::client.client').findMany(ctx);

    // Remove user from each item
    const sanitizedData = data.map((item) => {
      const { user, ...rest } = item;
      return { ...rest };
    });

    // return { data: sanitizedData, meta };
    return { data: sanitizedData };
  },
}));
