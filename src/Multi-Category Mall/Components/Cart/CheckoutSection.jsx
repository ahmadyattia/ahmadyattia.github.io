import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "../../Styles/Cart/CheckoutSection.module.css";

const CheckoutSection = () => {
  const { cart } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setSubTotal(
      cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2),
    );
    setDiscount(
      cart
        .reduce(
          (acc, item) => acc + item.price * (item.discountPercentage / 100),
          0,
        )
        .toFixed(2),
    );
  }, [cart]);

  useEffect(() => {
    setTotal(() => (subTotal - discount).toFixed(2));
  }, [subTotal, discount]);

  console.log(cart);

  // cart.forEach((item) => console.log("1", item.discountPercentage));

  console.log(discount);

  return (
    <div id={styles.checkoutSectionBox}>
      <div id={styles.checkoutSection}>
        <div id={styles.promoCodeBox}>
          <h3>Promo code</h3>
          <div id={styles.promoCodeInputBox}>
            <input
              id={styles.promoCodeInput}
              type="text"
              placeholder="Type here..."
            />
            <button id={styles.applyBtn}>Apply</button>
          </div>
        </div>
        <hr />
        <div id={styles.subtotalBox}>
          <p>Subtotal</p>
          <p>${subTotal}</p>
        </div>
        <div id={styles.discountBox}>
          <p>Discount</p>
          <p>-${discount}</p>
        </div>
        <div id={styles.totalBox}>
          <p>Total</p>
          <p>${total}</p>
        </div>
        <div id={styles.checkoutBtnBox}>
          <button id={styles.checkoutBtn}>Continue to checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSection;
