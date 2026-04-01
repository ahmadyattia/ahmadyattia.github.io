import React from "react";
import { useLocation } from "react-router-dom";
import styles from "../../Styles/Cart/Success.module.css";

const Success = () => {
  const location = useLocation();
  const order = location.state;

  return <div id={styles.mainBox}></div>;
};

export default Success;
