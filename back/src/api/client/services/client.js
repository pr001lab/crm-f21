'use strict';

/**
 * client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client.client', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { data } = ctx.request.body;

    return strapi.entityService.create('api::client.client', {
      data: {
        ...data,
        user: user.id,
      },
    });
  },
}));
