import { useEffect, useContext, useRef } from "react";
import { useState } from "react";
import styles from "../../Styles/Cart/CartDropdown.module.css";
import NavbarCartItem from "./NavbarCartItem.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import CartDropdownActions from "./CartDropdownActions";
import closeMenuOnClickOutside from "@/utils/closeMenuOnClickOutside";

const CartDropdown = ({ isOpen, setIsOpen }) => {
  const { cart } = useContext(CartContext);
  const [height, setHeight] = useState(``);

  useEffect(() => {
    if (!isOpen) {
      setHeight(``);
    } else {
      setHeight(`${styles.adjustHeight}`);
    }
  }, [isOpen]);

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

      {cart.length > 0 && <CartDropdownActions setIsOpen={setIsOpen} />}
    </div>
  );
};

export default CartDropdown;
