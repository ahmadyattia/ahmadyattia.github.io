import React from "react";
import styles from "../Styles/Order.module.css";
import OrderItem from "./OrderItem";
import orderIcon from "@/assets/images/icons/order-icon.svg";

const Order = ({ order }) => {
  const orderShippingMethod = order.shipping.shippingMethod;

  return (
    <div className={styles.mainBox}>
      <div className={styles.idSection}>
        <img src={orderIcon} alt="Order" />
        <div className={styles.orderId}>{order.orderId}</div>
      </div>

      <div className={styles.orderLogistics}>
        {orderShippingMethod === "delivery" && (
          <div className={styles.shippingInfo}>
            Delivery to: {order.shipping.city}, {order.shipping.state},{" "}
            {order.shipping.country} {order.shipping.zipCode}
          </div>
        )}
        {orderShippingMethod === "pickup" && (
          <div className={styles.shippingInfo}>Pickup</div>
        )}
        <div className={styles.date}>Placed on: {order.date}</div>
      </div>
      <div className={styles.orderItems}>
        {order.items.map((item) => {
          return <OrderItem item={item} />;
        })}
      </div>
      <div className={styles.total}>Total: ${order.total}</div>
    </div>
  );
};

export default Order;
