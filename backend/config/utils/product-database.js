async function createProduct({ name, description }) {
  try {
    const product = await strapi.services.product.create({
      name,
      description,
    });

    return product;
  } catch (err) {
    return "Product cannot be created. Try again";
  }
}

async function createReview({ productId, name, comment }) {
  try {
    const review = await strapi.services.review.create({
      product: productId,
      reviewer_name: name,
      review: comment,
    });

    return review;
  } catch (err) {
    console.log({ ...err.data });
    return "Review cannot be created. Try again";
  }
}

module.exports = {
  createProduct,
  createReview,
};
