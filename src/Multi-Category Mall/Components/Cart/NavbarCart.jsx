import { useContext, useEffect, useState } from "react";
import styles from "../../Styles/Cart/NavbarCart.module.css";
import CartDropdown from "/Users/ahmadattia/portfolio/src/Multi-Category Mall/Components/Cart/CartDropdown.jsx";
import { CartContext } from "../../Context/CartContext";
import CartCount from "./CartCount";

const NavbarCart = ({ openMenu, setOpenMenu }) => {
  const [toggled, setToggled] = useState(false);
  const { cart } = useContext(CartContext);

  // close dropdown menu when another is opened
  useEffect(() => {
    if (openMenu != "cart") {
      setToggled(false);
    }
  }, [openMenu]);

  // control the toggling of the dropdown
  function handleIconClick() {
    if (toggled === false) {
      setToggled(true);
      setOpenMenu("cart");
    } else {
      setToggled(false);
      setOpenMenu(null);
    }
  }

  return (
    <div className={styles.navbarCart}>
      <div
        className={styles.cartIconContainer}
        onClick={handleIconClick}
        title="Cart"
      >
        <img
          id={styles.cartIcon}
          src="/src/assets/images/icons/shopping_cart.svg"
          alt=""
        />
      </div>

      <CartCount />

      <div id={styles.dropdown}>
        <CartDropdown setOpenMenu={setOpenMenu} toggled={toggled} />
      </div>
    </div>
  );
};

export default NavbarCart;
