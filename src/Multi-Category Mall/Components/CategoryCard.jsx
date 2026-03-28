import React from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/CategoryCard.module.css";
import categoriesImages from "../Data/CategoriesImages";

const CategoryCard = ({ categorySlug, categoryName }) => {
  const categoryImg = categoriesImages.find((img) => {
    return img.category === categorySlug;
  });

  return (
    <Link className={styles.card} to={`/shop/${categorySlug}?page=1`}>
      {categoryImg && (
        <img
          className={styles.categoryImg}
          src={categoryImg.imgURL}
          alt={`a picture of the ${categorySlug} category.`}
        />
      )}
      <h3 className={styles.categoryName}>{categoryName}</h3>
    </Link>
  );
};

export default CategoryCard;
