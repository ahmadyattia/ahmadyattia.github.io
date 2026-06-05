import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "../../Styles/Cart/ItemsSection.module.css";
import CartItem from "./CartItem";

const ItemsSection = () => {
  const { cart } = useContext(CartContext);

  return (
    <section id={styles.itemsSectionBox}>
      <div id={styles.itemsSection}>
        <div id={styles.headDiv}>
          <h2 id={styles.cartHeader}>Cart</h2>
          <p id={styles.countNotice}>({cart.length})</p>
        </div>

        {cart.length != 0 ? (
          <div id={styles.cartColumnTitles}>
            <p id={styles.productsHead}>Product</p>
            <p id={styles.quantityHead}>Quantity</p>
            <p id={styles.priceHead}>Price</p>
            <div id={styles.titlesPlaceholder}></div>
          </div>
        ) : (
          <h3 id={styles.emptyCartNotice}>Your Cart is Empty!</h3>
        )}

        {cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
    </section>
  );
};

export default ItemsSection;
