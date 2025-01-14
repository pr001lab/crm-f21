'use strict';

/**
 * cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) => ({
  async create(ctx) {
    const newCart = await strapi.service('api::cart.cart').create(ctx);

    ctx.body = await this.sanitizeOutput(newCart, ctx);
  },
  async find(ctx) {
    //Filtered by own user
    const user = ctx.state.user;
    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      user: user.id,
    };

    const { data, meta } = await super.find(ctx);
    // Remove user from each item
    const sanitizedData = data.map((item) => {
      const { user, ...rest } = item;
      return { ...rest };
    });

    return { data: sanitizedData, meta };
  },
  async findOne(ctx) {
    //Filtered by own user
    const user = ctx.state.user;
    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      user: user.id,
    };

    const { data, meta } = await super.findOne(ctx);
    // Remove user from each item
    let restValues;
    if (data) {
      const { user, ...rest } = data;
      restValues = rest;
    }

    return { data: restValues, meta };
  },
  async update(ctx) {
    const user = ctx.state.user;

    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      user: user.id,
    };

    return super.update(ctx);
  },
  async delete(ctx) {
    const user = ctx.state.user;

    ctx.query.filters = {
      ...(ctx.query.filters || {}),
      user: user.id,
    };

    return super.delete(ctx);
  },
}));
