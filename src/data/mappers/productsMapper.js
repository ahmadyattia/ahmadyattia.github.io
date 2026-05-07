export default function productsMapper(products) {
  if (!products) return null;

  return products.map((product) => {
    return {
      category: product.category.name,
      description: product.description,
      discountPercentage: 10,
      productId: product.productId,
      id: product.productId,
      creationAt: product.creationAt,
      price: product.price,
      slug: product.slug,
      title: product.title,
      images: product.images,
    };
  });
}
