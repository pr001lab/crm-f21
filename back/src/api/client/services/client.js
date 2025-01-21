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
  async findMany(ctx) {
    let filteredEntries = await strapi
      .documents('api::client.client')
      .findMany();
    // console.log('====ctx.query====');
    // console.log(ctx.query); //{ filters: { name: { '$containsi': 'ф' } } }
    // console.log('=================');
    if ('filters' in ctx.query) {
      Object.entries(ctx.query.filters).forEach(([key, value]) => {
        const valueContainsi = value['$containsi'];
        if (valueContainsi !== '') {
          filteredEntries = filteredEntries.filter((item) =>
            item[key].toLowerCase().includes(valueContainsi.toLowerCase()),
          );
        }
      });
    }

    return filteredEntries;
  },
}));
