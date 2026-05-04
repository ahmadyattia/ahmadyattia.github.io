import { useContext, useEffect, useState } from "react";
import styles from "../Styles/Categories.module.css";
import CategoryCard from "./CategoryCard";
import { ProductsContext } from "../Context/ProductsContext";
import slugify from "../../utils/slugify";

const Categories = () => {
  const { data } = useContext(ProductsContext);

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    if (data) {
      // retrieve category names from products
      // Set used to remove duplicate categories
      // then map each product to an object with name and slug props
      setCategories(
        [...new Set(data.map((product) => product.category))].map(
          (category) => {
            return { name: category, slug: slugify(category) };
          },
        ),
      );
    }
  }, [data]);

  return (
    <div>
      {categories && (
        <div id={styles["shop-categories"]}>
          {categories.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                slug={category.slug}
                name={category.name}
              ></CategoryCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Categories;
