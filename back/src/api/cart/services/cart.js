'use strict';

/**
 * cart service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::cart.cart', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;
    const { data } = ctx.request.body;

    return strapi.entityService.create('api::cart.cart', {
      data: {
        ...data,
        user: user.id,
      },
    });
  },
}));
