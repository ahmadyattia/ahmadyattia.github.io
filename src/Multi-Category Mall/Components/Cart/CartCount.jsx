import { useContext } from "react";
import { CartContext } from "../../Context/CartContext.jsx";
import styles from "../../Styles/Cart/CartCount.module.css";

const CartCount = () => {
  const { cart } = useContext(CartContext);
  // let cartCount = cart.length;

  let totalQuantity = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return <p id={styles.count}>{totalQuantity}</p>;
};

export default CartCount;
