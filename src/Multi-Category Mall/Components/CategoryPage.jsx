import { useParams, useSearchParams } from "react-router-dom";
import styles from "../Styles/CategoryPage.module.css";
import CategoryProducts from "./CategoryProducts";
import { useEffect, useState } from "react";
import ProductsPagination from "./ProductsPagination";
import SearchEngine from "./search-bar/SearchEngine";

const CategoryPage = () => {
  const { category } = useParams();
  const [productsCount, setProductsCount] = useState(null);

  // capitalize the first letter of the category name
  const capitalizedName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div id={styles.categoryPage}>
      <div id={styles.searchAndCategoryName}>
        <h2>{capitalizedName}</h2>
        <SearchEngine />
        <div id={styles.spacer}></div> {/* just for layout */}
      </div>
      <CategoryProducts category={category} countSetter={setProductsCount} />
      <div className={styles.paginationContainer}>
        <ProductsPagination productsCount={productsCount} />
      </div>
    </div>
  );
};

export default CategoryPage;
