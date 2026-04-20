// this function is for saving to the firebase database
// the products from the mock JSON at
// https://dummyjson.com/products

import { useContext } from "react";
import { ProductsContext } from "../Context/ProductsContext";
import { push, ref, set } from "firebase/database";
import { db } from "../server/firebase";

export const saveProductsData = () => {
  const { data } = useContext(ProductsContext);

  try {
    const productsRef = ref(db, "products");

    data.products.forEach((product) => {
      const newProductRef = push(productsRef); // generate a unique id for each product

      set(newProductRef, product).catch(
        console.error((err) => {
          console.error("error storing product in db", err);
        }),
      );
    });
  } catch (err) {
    console.error("error completing operation", err);
  }

  console.log(data);
};
