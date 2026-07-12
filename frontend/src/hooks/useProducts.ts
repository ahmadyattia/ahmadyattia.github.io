// fetch products from db

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../server/firebase";
import placeholderImage from "@/assets/images/icons/image-placeholder-20.svg";

export interface Product {
  productId: string;
  images: string[];
  discountPercentage: number;
  category: Category;
  creationAt: string;
  description: string;
  id: number;
  price: number;
  slug: string;
  title: string;
  updatedAt: string;
}

interface Category {
  name: string;
  slug: string;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const productsRef = ref(db, "products");

    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            const loadedProducts: Product[] = Object.keys(data).map((key) => {
              const productData = data[key];

              // set image if the product doesn't have one

              const images = Array.isArray(productData.images)
                ? [...productData.images]
                : [];

              if (images[0] === "" || !images[0]) {
                images[0] = placeholderImage;
              }

              return {
                productId: key,
                ...productData,
                images,
                discountPercentage: 10,
              };
            });

            setProducts(loadedProducts);
          } else {
            setProducts([]);
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching products from db", error);
          setError(error);
          setIsLoading(false);
        }
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return [products, isLoading, error] as const; // as const makes ts treat it as a tuple with strict typing
};
