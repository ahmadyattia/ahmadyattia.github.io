/* 
This function is for saving to the firebase database
the products from the mock JSON at
https://dummyjson.com/products
This function should run only once unless the products are not in the db
IMPORTANT: Running this function by error would corrupt the products data!
*/

import { useEffect } from "react";
import { push, ref, set } from "firebase/database";
import { db } from "../server/firebase";

export const saveProductsData = () => {
  useEffect(() => {
    // fetch product from mock data
    const loadData = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products",
        );
        let data: any[] = await response.json();

        data = data.filter((product) => {
          return product.id <= 51;
        });

        // set products in db
        const productsRef = ref(db, "products");

        data.forEach((product) => {
          const newProductRef = push(productsRef); // generate a unique id for each product

          set(newProductRef, product).catch(
            (err) => {
              console.error("error storing product in db", err);
            },
          );
        });

      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);
};
