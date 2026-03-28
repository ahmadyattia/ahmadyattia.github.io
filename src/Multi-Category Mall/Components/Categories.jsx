import React from "react";
import styles from "../Styles/Categories.module.css";
import CategoryCard from "./CategoryCard";
import categories from "../Data/Categories";

const Categories = () => {
  return (
    <div id={styles["shop-categories"]}>
      {categories.map((category, index) => {
        return (
          <CategoryCard
            key={index}
            categorySlug={category.slug}
            categoryName={category.name}
          ></CategoryCard>
        );
      })}
    </div>
  );
};

export default Categories;
