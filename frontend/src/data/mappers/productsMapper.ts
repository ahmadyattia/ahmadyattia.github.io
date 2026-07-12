import { Product } from "@/hooks/useProducts";

export interface MappedProduct {
    category: string;
    description: string;
    discountPercentage: number;
    productId: string;
    id: string;
    creationAt: string;
    price: number;
    slug: string;
    title: string;
    images: string[];
}

export default function productsMapper(products : Product[]) : MappedProduct[] {
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
