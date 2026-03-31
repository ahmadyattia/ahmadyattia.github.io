import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import CheckoutSection from "./CheckoutSection";
import ItemsSection from "./ItemsSection";
import styles from "../../Styles/Cart/ViewCart.module.css";

const ViewCart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <div id={styles.cartView}>
        <ItemsSection />
        <CheckoutSection page="cart" />
      </div>
    </div>
  );
};

export default ViewCart;
