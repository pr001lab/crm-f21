async function createProduct({ name, description, price }) {
  try {
    return await strapi.entityService.create('api::product.product', {
      data: {
        productCategory: 1,
        name,
        description,
        price,
        amount: 1,
      },
    });
  } catch (err) {
    console.log({ ...err.data });
    return 'Product cannot be created. Try again';
  }
}

async function setProductStatus(id, productStatus) {
  const amount = productStatus === 'blocked' ? 0 : 1;

  try {
    const product = await strapi.entityService.update(
      'api::product.product',
      id,
      {
        data: {
          amount,
        },
      },
    );

    return product;
  } catch (err) {
    console.log({ ...err.data });
    return 'Product cannot be created. Try again';
  }
}

module.exports = {
  createProduct,
  setProductStatus,
};
