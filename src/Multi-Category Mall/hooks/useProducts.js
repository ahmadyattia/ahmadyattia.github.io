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
            id: key,
            ...data[key],
          }));

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
