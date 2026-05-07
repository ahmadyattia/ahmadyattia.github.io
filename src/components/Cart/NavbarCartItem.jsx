import { useContext } from "react";
import styles from "../../Styles/Cart/NavbarCartItem.module.css";
import { CartContext } from "../../context/CartContext.jsx";

const NavbarCartItem = ({ item }) => {
  const { handleAddToCart, handleRemoveFromCart } = useContext(CartContext);

  let discountedPrice;
  const discount = item.discountPercentage;

  if (discount) {
    discountedPrice = (item.price - item.price * (discount / 100)).toFixed(2);
  }

  return (
    <div className={styles.item}>
      <img src={item.img} alt="" className={styles.images} />

      <div className={styles.details}>
        <p>{item.title}</p>
        <div className={styles.priceAndQuantity}>
          {discount ? (
            <p className={styles.price}>
              <span className={styles.oldPrice}>${item.price}</span>{" "}
              <span className={styles.newPrice}>${discountedPrice}</span>
            </p>
          ) : (
            <p className={styles.price}>${item.price}</p>
          )}
          <div id={styles.quantity}>
            <button onClick={() => handleAddToCart(item)}>+</button>
            <p>{item.quantity}</p>
            <button onClick={() => handleRemoveFromCart(item)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCartItem;
