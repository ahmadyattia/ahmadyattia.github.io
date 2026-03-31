import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "../../Styles/Cart/CheckoutSection.module.css";
import { useNavigate } from "react-router-dom";

const CheckoutSection = ({ page }) => {
  const { cart } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("checkout"); // protected route
  };

  const handlePlaceOrder = () => {};

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
          {page === "cart" && (
            <button id={styles.checkoutBtn} onClick={handleCheckout}>
              Continue to checkout
            </button>
          )}
          {page === "checkout" && (
            <button id={styles.checkoutBtn} onClick={handlePlaceOrder}>
              Place Order
            </button>
          )}
        </div>
        {page === "cart" && (
          <p id={styles.mustLoginMessage}>
            *You must be logged into an existing account to proceed.
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutSection;
