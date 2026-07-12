import { useParams } from "react-router-dom";
import styles from "@/styles/CategoryPage.module.css";
import CategoryProducts from "@/components/CategoryProducts";
import { useState } from "react";
import ProductsPagination from "@/components/ProductsPagination";
import SearchEngine from "@/components/search-bar/SearchEngine";

const CategoryPage = () => {
  const { category } = useParams();
  const [productsCount, setProductsCount] = useState(0);

  // capitalize the first letter of the category name
  const capitalizedName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  return (
    <div id={styles.categoryPage}>
      <SearchEngine />
      <h2>{capitalizedName}</h2>
      <CategoryProducts
        category={category || ""}
        countSetter={setProductsCount}
      />
      <div className={styles.paginationContainer}>
        <ProductsPagination productsCount={productsCount} />
      </div>
    </div>
  );
};

export default CategoryPage;
