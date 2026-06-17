import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import styles from "@/styles/Cart/Success.module.css";
import successIcon from "@/assets/images/icons/check-success-page.svg";

const Success = () => {
  const location = useLocation();
  const order = location.state;

  // Guard clause: Redirect users safely back home if they try to access this page without order details
  if (!order || !order.orderId) {
    <Navigate to={"/home"} replace />;
  }

  return (
    <div id={styles.mainBox}>
      <div id={styles.messageBox}>
        <img id={styles.icon} src={successIcon} alt="success icon" />
        <h2 id={styles.successMessage}>
          Your order has been placed successfully!
        </h2>
        <p id={styles.orderIdMessage}>Order id: {order.orderId}</p>
        <p id={styles.orderReviewMessage}>
          Check your orders in your profile for a full review.
        </p>
      </div>
    </div>
  );
};

export default Success;
