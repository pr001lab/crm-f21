'use strict';

/**
 * client controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::client.client', ({ strapi }) => ({
  async create(ctx) {
    const newClient = await strapi.service('api::client.client').create(ctx);

    ctx.body = await this.sanitizeOutput(newClient, ctx);
  }
}));
