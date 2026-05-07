// fetch products from db

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../server/firebase";

export const useProducts = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const productsRef = ref(db, "products");

    const unsubscribe = onValue(productsRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const loadedProducts = Object.keys(data).map((key) => ({
            productId: key,
            ...data[key],
            discountPercentage: 10,
          }));

          // set image if the product doesn't have one
          loadedProducts.forEach((product) => {
            if (product.images[0] === "") {
              product.images[0] =
                "/src/assets/images/icons/image-placeholder-20.svg";
            }
          });

          setProducts(loadedProducts);
        }
      } catch (error) {
        console.error("Error fetching products from db", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return products;
};
