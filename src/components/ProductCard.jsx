import styles from "../Styles/ProductCard.module.css";
import { Link, useSearchParams } from "react-router-dom";
import AddToCartBtn from "./Cart/AddToCartBtn";

const ProductCard = ({ product }) => {
  let discountedPrice = null;

  if (product.discountPercentage > 0) {
    discountedPrice = (
      product.price -
      product.price * (product.discountPercentage / 100)
    ).toFixed(2);
  }

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
            {discountedPrice ? (
              <p className={styles.amount}>
                <span className={styles.oldPrice}>$ {product.price}</span>{" "}
                <span className={styles.newPrice}>$ {discountedPrice}</span>
              </p>
            ) : (
              <p className={styles.amount}>$ {product.price}</p>
            )}
          </div>
          <AddToCartBtn product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
