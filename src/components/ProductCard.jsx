import styles from "../Styles/ProductCard.module.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AddToCartBtn from "./Cart/AddToCartBtn";

const ProductCard = ({ product }) => {
  let discountedPrice = null;
  const navigate = useNavigate();

  if (product.discountPercentage > 0) {
    discountedPrice = (
      product.price -
      product.price * (product.discountPercentage / 100)
    ).toFixed(2);
  }

  function handleCardClick() {
    navigate(`${product.id}/${product.slug}`);
  }

  return (
    <article className={`${styles.card} ${styles.font}`}>
      <img
        src={product.images[0]}
        alt={product.description}
        onClick={handleCardClick}
      />
      <div className={styles.details}>
        <h3 className={styles.title} onClick={handleCardClick}>
          {product.title}
        </h3>
        <div className={styles.description} onClick={handleCardClick}>
          <p className={styles.descriptionPara}>{product.description}</p>
          <p className={styles.readMore}>Read More</p>
        </div>
        <p className={styles.category} onClick={handleCardClick}>
          {product.category}
        </p>
        <div className={styles.checkout}>
          <div onClick={handleCardClick}>
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
    </article>
  );
};

export default ProductCard;
