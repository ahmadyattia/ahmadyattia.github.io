import { useEffect, useContext } from "react";
import { useState } from "react";
import styles from "../../Styles/Cart/CartDropdown.module.css";
import NavbarCartItem from "../../Components/Cart/NavbarCartItem.jsx";
import { CartContext } from "../../Context/CartContext.jsx";
import CartDropdownActions from "./CartDropdownActions";

const CartDropdown = ({ setOpenMenu, toggled }) => {
  const { cart } = useContext(CartContext);
  const [height, setHeight] = useState(``);

  useEffect(() => {
    if (toggled === false) {
      setHeight(``);
    } else {
      setHeight(`${styles.adjustHeight}`);
    }
  }, [toggled]);

  return (
    <div className={`${styles.cartDropdown} ${height}`}>
      <h1 id={styles.cartHead}>Cart</h1>
      {cart.length == 0 ? (
        <div id={styles.emptyCartHeader}>
          <h2>Your Cart is Empty!</h2>
        </div>
      ) : (
        <div id={styles.cartItems}>
          {cart.map((item) => {
            return (
              <div>
                <NavbarCartItem item={item} key={item.id} />;
                <hr />
              </div>
            );
          })}
        </div>
      )}

      {cart.length > 0 && <CartDropdownActions setOpenMenu={setOpenMenu} />}
    </div>
  );
};

export default CartDropdown;
