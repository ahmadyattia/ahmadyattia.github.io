import styles from "../Styles/CategoryProducts.module.css";
import { useProductsData } from "../Context/ProductsContext";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const CategoryProducts = ({ category, countSetter }) => {
  const { data } = useProductsData();
  let productsByCategory = [];
  let productsOfPage = [];

  let isEmpty; // if empty category products list

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has("page")) {
      searchParams.set("page", "1");
      setSearchParams(searchParams);
    }
  }, []);

  const pageNumber = searchParams.get("page");

  if (data) {
    productsByCategory = data.products.filter((product) => {
      return product.category === category;
    });

    if (category === "all") {
      productsByCategory = data.products;
    }

    if (productsByCategory.length === 0) {
      isEmpty = true;
    }
  }

  useEffect(() => {
    countSetter(productsByCategory.length);
  }, [productsByCategory]);

  // take the products of the category..
  // convert them into an array with six products per array entry
  // this is then used to display six products per page
  function productsPerPage() {
    const products = [...productsByCategory];
    const sixProductsPerArr = [];

    while (products.length > 0) {
      let currentArray = [];
      let i = 0;

      while (i < 6) {
        if (products[i]) {
          currentArray.push(products[i]);
        }
        i++;
      }
      products.splice(0, 6);

      sixProductsPerArr.push(currentArray);
    }

    return sixProductsPerArr;
  }

  if (pageNumber) {
    productsOfPage = productsPerPage()[pageNumber - 1];
  }

  return (
    <>
      {data ? (
        <div className={styles.grid}>
          {isEmpty ? (
            <h1 className={styles.emptyListNotice}>Empty products list :/</h1>
          ) : (
            <>
              {productsOfPage.map((product) => {
                return (
                  <ProductCard key={product.id} product={product}></ProductCard>
                );
              })}
            </>
          )}
        </div>
      ) : (
        <h1>No products</h1>
      )}
    </>
  );
};

export default CategoryProducts;
