// this function is for saving to the firebase database
// the products from the mock JSON at
// https://dummyjson.com/products
// this function should run only once unless the products are not in the db

import { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { push, ref, set } from "firebase/database";
import { db } from "../server/firebase";

export const saveProductsData = () => {
  // const { data } = useContext(ProductsContext);
  // const [data, setData] = useState(null);
  // let data = null;

  useEffect(() => {
    // fetch product from mock data
    const loadData = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products",
        );
        let data = await response.json();

        // setData(data);

        console.log(data);

        data = data.filter((product) => {
          return product.id <= 51;
        });

        // set products in db
        const productsRef = ref(db, "products");

        data.forEach((product) => {
          const newProductRef = push(productsRef); // generate a unique id for each product

          set(newProductRef, product).catch(
            console.error((err) => {
              console.error("error storing product in db", err);
            }),
          );
        });

        console.log("It is finished");
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  // console.log(data);
};
