import styles from "../../Styles/Cart/OrderCheckout.module.css";
import { useState } from "react";
import CheckoutSection from "./CheckoutSection";

const OrderCheckout = () => {
  const [shippingOption, setShippingOption] = useState();

  function handleChange(e) {
    // change shipping option
    setShippingOption(e.target.value);
  }

  return (
    <div id={styles.main}>
      <form action="">
        <h2>Shipping Information</h2>
        <div id={styles.deliveryOptionsBox}>
          <div>
            <input
              type="radio"
              id="deliveryOption"
              name="shipping-option"
              checked={shippingOption === "delivery"}
              value={"delivery"}
              onChange={handleChange}
            />
            <label htmlFor="deliveryOption">Delivery</label>
          </div>
          <div>
            <input
              type="radio"
              id="pickupOption"
              name="shipping-option"
              checked={shippingOption === "pickup"}
              value={"pickup"}
              onChange={handleChange}
            />

            <label htmlFor="pickupOption">Pickup</label>
          </div>
        </div>
        <label htmlFor="fname">Full name</label>
        <input id="fname" type="text" placeholder="Enter full name" />

        <label htmlFor="email">Email address</label>
        <input id="email" type="email" placeholder="Enter email address" />
        <label htmlFor="phone">Phone number</label>
        <input id="phone" type="tel" placeholder="Enter phone number" />
        <label htmlFor="country">Country</label>
        <input id="country" type="text" placeholder="Enter your country" />
        <div id={styles.cityStateZip}>
          <div>
            <label htmlFor="city">City</label>
            <input id="city" type="text" placeholder="Enter city" />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input id="state" type="text" placeholder="Enter state" />
          </div>
          <div>
            <label htmlFor="zipcode">Zip Code</label>
            <input id="zipcode" type="text" placeholder="Enter ZIP code" />
          </div>
        </div>
      </form>
      <div id={styles.orderDetails}>
        <CheckoutSection page="checkout" />
      </div>
    </div>
  );
};

export default OrderCheckout;
