import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "../../Styles/Cart/CheckoutSection.module.css";
import { useNavigate } from "react-router-dom";

const CheckoutSection = ({
  page,
  shippingMethod,
  triggerSubmit,
  sendTotal,
}) => {
  const { cart } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [shippingPrice, setShippingPrice] = useState(0);
  const deliveryCost = 10;

  useEffect(() => {
    if (shippingMethod === "pickup") {
      setShippingPrice(0); // pickup is free
    } else if (shippingMethod === "delivery") {
      setShippingPrice(deliveryCost); // delivery costs $10
    }
  }, [shippingMethod]);

  const handleCheckout = () => {
    // if the cart is not empty, proceed to checkout
    if (cart.length > 0) {
      navigate("checkout"); // protected route
    }
  };

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
    setTotal(() => (subTotal - discount + shippingPrice).toFixed(2));
  }, [subTotal, discount, shippingPrice]);

  console.log(cart);

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
        <div id={styles.shippingBox}>
          <p>Shipping</p>
          {page === "cart" ? (
            <p>*cost calculated at checkout</p>
          ) : (
            <p>${shippingPrice.toFixed(2)}</p>
          )}
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
            <button
              id={styles.checkoutBtn}
              onClick={() => {
                sendTotal(total);
                triggerSubmit();
              }}
            >
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
