import React from "react";
import styles from "../Styles/OrderItem.module.css";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => {
  const itemLocation = `/shop/${item.category}/${item.id}/${item.slug}`;

  return (
    <div className={styles.mainBox}>
      <img className={styles.img} src={item.img} alt="" />
      <div className={styles.title}>{item.title}</div>
      <div className={styles.price}>${item.price}</div>
      <div className={styles.quantity}>Qty: {item.quantity}</div>
      <div className={styles.viewLinkBox}>
        <Link to={itemLocation} className={styles.viewLink}>
          View
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
