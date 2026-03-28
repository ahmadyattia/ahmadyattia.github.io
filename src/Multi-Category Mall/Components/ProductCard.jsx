import styles from "../Styles/ProductCard.module.css";
import { Link, useSearchParams } from "react-router-dom";
import AddToCartBtn from "./Cart/AddToCartBtn";

const ProductCard = ({ product }) => {
  return (
    <div className={`${styles.card} ${styles.font}`}>
      <Link to={`${product.id}/${product.slug}`}>
        <img src={product.images[0]} alt={product.description} />
      </Link>
      <div className={styles.details}>
        <p className={styles.title}>{product.title}</p>
        <div className={styles.description}>
          <p className={styles.descriptionPara}>{product.description}</p>
          <Link
            to={`${product.id}/${product.slug}`}
            className={styles.linkToProductPage}
          >
            <p className={styles.readMore}>Read More</p>
          </Link>
        </div>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.checkout}>
          <div>
            <p className={styles.priceLabel}>Price</p>
            <p className={styles.amount}>$ {product.price}</p>
          </div>
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
