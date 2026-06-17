import styles from "../styles/CategoryProducts.module.css";
import { useProductsData } from "../context/ProductsContext";
import ProductCard from "./ProductCard";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import slugify from "../utils/slugify";

const CategoryProducts = ({ category, countSetter }) => {
  const { data, isLoading } = useProductsData();
  const [searchParams] = useSearchParams();

  const pageNumber = parseInt(searchParams.get("page") || "1");

  // filter products according to the category
  const filteredProducts = useMemo(() => {
    if (!data) return [];

    if (category === "all") return data;

    return data.filter(
      (product) => slugify(product.category) === slugify(category),
    );
  }, [data, category]);

  const totalCount = filteredProducts.length;

  useEffect(() => {
    countSetter(totalCount);
  }, [totalCount, countSetter]);

  // take the products of the category..
  // convert them into an array with six products per array entry
  // this is then used to display six products per page
  const productsOfCurrentPage = useMemo(() => {
    const itemsPerPage = 6;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, pageNumber]);

  if (isLoading)
    return <h1 className={styles.statusNotice}>Loading products...</h1>;

  if (!data)
    return <h1 className={styles.statusNotice}>Error fetching data...</h1>;

  if (productsOfCurrentPage.length === 0)
    return <h1 className={styles.statusNotice}>Empty products list...</h1>;

  return (
    <section className={styles.grid}>
      {productsOfCurrentPage.map((product) => {
        return <ProductCard key={product.id} product={product}></ProductCard>;
      })}
    </section>
  );
};

export default CategoryProducts;
