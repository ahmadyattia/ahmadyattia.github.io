import CheckoutSummary from "@/components/Cart/CheckoutSummary";
import ItemsSection from "@/components/Cart/ItemsSection";
import styles from "@/styles/Cart/ViewCart.module.css";

const ViewCart = () => {
  return (
    <div>
      <div id={styles.cartView}>
        <ItemsSection />
        <CheckoutSummary page="cart" />
      </div>
    </div>
  );
};

export default ViewCart;
