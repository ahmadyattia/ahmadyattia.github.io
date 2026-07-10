import { useContext, useMemo } from "react";
import styles from "../Styles/Categories.module.css";
import CategoryCard from "./CategoryCard";
import { ProductsContext } from "../context/ProductsContext";
import slugify from "../utils/slugify";

const Categories = () => {
  const { data } = useContext(ProductsContext);

  const categories = useMemo(() => {
    if (!data) return [];

    // retrieve category names from products
    // a Set used to remove duplicate categories
    // then map each product to an object with name and slug properties
    // added "All" category

    const uniqueCategories = [
      "All",
      ...new Set(data.map((product) => product.category)),
    ];

    return uniqueCategories.map((category) => {
      return { name: category, slug: slugify(category) };
    });
  }, [data]);

  if (!categories.length) return null;

  return (
    <div>
      <div id={styles["shop-categories"]}>
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category.slug}
              slug={category.slug}
              name={category.name}
            ></CategoryCard>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
