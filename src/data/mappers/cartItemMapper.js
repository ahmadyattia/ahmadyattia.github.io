export default function mapToCartItem(product) {
  return {
    id: product.id,
    img: product.images[0],
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    discountPercentage: product.discountPercentage,
    quantity: 0,
  };
}
