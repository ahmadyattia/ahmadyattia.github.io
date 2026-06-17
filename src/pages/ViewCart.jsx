import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import CheckoutSection from "@/components/Cart/CheckoutSummary";
import ItemsSection from "@/components/Cart/ItemsSection";
import styles from "@/styles/Cart/ViewCart.module.css";

const ViewCart = () => {
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
