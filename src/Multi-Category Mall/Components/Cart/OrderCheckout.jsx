import styles from "../../Styles/Cart/OrderCheckout.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import CheckoutSection from "./CheckoutSection";
import { AuthContext } from "../../Context/AuthContext";
import { ulid } from "ulid"; // id generator
import { CartContext } from "../../Context/CartContext";
import { ref, set } from "firebase/database";
import { db } from "../../server/firebase";
import { useNavigate } from "react-router-dom";

const OrderCheckout = () => {
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const form = useRef(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const navigate = useNavigate();

  const userId = user.uid;
  let shipping;

  const handlePlaceOrder = async (e) => {
    // form validation passed, place order
    e.preventDefault();
    const orderId = `ORD-${ulid()}`;
    const date = new Date();

    if (shippingMethod === "pickup") {
      shipping = {
        shippingMethod,
        fullName: fullName,
        email: email,
        phone: phone,
      };
    } else if (shippingMethod === "delivery") {
      shipping = {
        shippingMethod,
        fullName: fullName,
        email: email,
        phone: phone,
        country: country,
        city: city,
        state: state,
        zipCode: zipCode,
      };
    }

    const order = {
      orderId: orderId,
      userId,
      shipping,
      items: cart,
      date: date.toString(),
    };

    try {
      // reference to the db
      //   const orderRef = ref(db, "orders/" + orderId);

      // set order in db
      //   await set(orderRef, order);

      // navigate to the success page
      navigate("success", { state: order, replace: true });

      // empty the cart
      setCart([]);
    } catch (error) {
      alert("Something went wrong. Failed to place your order.");
      console.error(error);
    }
    console.log(order);
  };

  // triggered on "Place Order" button click
  const triggerSubmit = () => {
    if (form.current) {
      form.current.requestSubmit(); // for running validation before submitting
    }
  };

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFullName(user.displayName);
    }
  }, [user]);

  return (
    <div id={styles.main}>
      <form ref={form} action="" onSubmit={handlePlaceOrder}>
        <h2>Shipping Information</h2>
        <div id={styles.deliveryOptionsBox}>
          <div>
            <input
              type="radio"
              id="deliveryOption"
              name="shipping-option"
              checked={shippingMethod === "delivery"}
              value={"delivery"}
              onChange={(e) => setShippingMethod(e.target.value)}
              required
            />
            <label htmlFor="deliveryOption">Delivery</label>
          </div>
          <div>
            <input
              type="radio"
              id="pickupOption"
              name="shipping-option"
              checked={shippingMethod === "pickup"}
              value={"pickup"}
              onChange={(e) => setShippingMethod(e.target.value)}
              required
            />

            <label htmlFor="pickupOption">Pickup</label>
          </div>
        </div>
        <label htmlFor="fname">Full name</label>
        <input
          id="fname"
          type="text"
          defaultValue={fullName}
          placeholder="Enter full name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          defaultValue={email}
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="phone">Phone number (Optional)</label>
        <input
          id="phone"
          type="tel"
          placeholder="Enter phone number"
          onChange={(e) => setPhone(e.target.value)}
        />
        {shippingMethod === "delivery" && (
          <div id={styles.addressInfo}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              placeholder="Enter your country"
              required
              onChange={(e) => setCountry(e.target.value)}
            />
            <div id={styles.cityStateZip}>
              <div>
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  type="text"
                  placeholder="Enter city"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="state">State</label>
                <input
                  id="state"
                  type="text"
                  placeholder="Enter state"
                  required
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="zipcode">Zip Code</label>
                <input
                  id="zipcode"
                  type="text"
                  placeholder="Enter ZIP code"
                  required
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </form>
      <div id={styles.orderDetails}>
        <CheckoutSection
          page="checkout"
          shippingMethod={shippingMethod}
          placeOrder={triggerSubmit}
        />
      </div>
    </div>
  );
};

export default OrderCheckout;
