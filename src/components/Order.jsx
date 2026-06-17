import React from "react";
import styles from "../Styles/Order.module.css";
import OrderItem from "./OrderItem";
import orderIcon from "@/assets/images/icons/order-icon.svg";

const Order = ({ order }) => {
  const orderShippingMethod = order?.shipping?.shippingMethod;
  const shipping = order?.shipping;

  return (
    <article className={styles.mainBox}>
      <div className={styles.idSection}>
        <img src={orderIcon} alt="Order" />
        <div className={styles.orderId}>{order.orderId}</div>
      </div>

      <div className={styles.orderLogistics}>
        {orderShippingMethod === "delivery" && shipping && (
          <div className={styles.shippingInfo}>
            Delivery to: {shipping.city}, {shipping.state}, {shipping.country}{" "}
            {shipping.zipCode}
          </div>
        )}
        {orderShippingMethod === "pickup" && (
          <div className={styles.shippingInfo}>Pickup</div>
        )}
        <div className={styles.date}>Placed on: {order.date}</div>
      </div>
      <div className={styles.orderItems}>
        {order?.items?.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </div>
      <div className={styles.total}>Total: ${order?.total}</div>
    </article>
  );
};

export default Order;
