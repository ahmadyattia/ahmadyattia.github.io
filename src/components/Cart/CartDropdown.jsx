import { useContext } from "react";
import styles from "../../Styles/Cart/CartDropdown.module.css";
import NavbarCartItem from "./NavbarCartItem.jsx";
import { CartContext } from "../../context/CartContext.jsx";
import CartDropdownActions from "./CartDropdownActions";

const CartDropdown = ({ isOpen, setIsOpen }) => {
  const { cart } = useContext(CartContext);

  return (
    <div className={`${styles.cartDropdown} ${isOpen && styles.adjustHeight}`}>
      <h1 id={styles.cartHead}>Cart</h1>
      {cart.length === 0 ? (
        <div id={styles.emptyCartHeader}>
          <h2>Your Cart is Empty!</h2>
        </div>
      ) : (
        <section id={styles.cartItems}>
          {cart.map((item) => {
            return (
              <div>
                <NavbarCartItem item={item} key={item.id} />;
                <hr />
              </div>
            );
          })}
        </section>
      )}

      {cart.length > 0 && <CartDropdownActions setIsOpen={setIsOpen} />}
    </div>
  );
};

export default CartDropdown;
