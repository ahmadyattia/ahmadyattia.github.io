import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import CheckoutSection from "@/components/Cart/CheckoutSection";
import ItemsSection from "@/components/Cart/ItemsSection";
import styles from "@/styles/Cart/ViewCart.module.css";

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
