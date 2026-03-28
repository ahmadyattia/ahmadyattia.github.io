import styles from "../Styles/ShopByCategory.module.css";
import Categories from "./Categories";

const ShopByCategory = () => {
  return (
    <div id={styles.page}>
      <h2>Shop by Category</h2>
      <Categories />
    </div>
  );
};

export default ShopByCategory;
