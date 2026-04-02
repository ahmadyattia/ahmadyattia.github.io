import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "/Users/ahmadattia/portfolio/src/Multi-Category Mall/Styles/Navbar/Navbar.module.css";
import NavbarCart from "../Cart/NavbarCart";
import NavbarSettings from "./Settings/NavbarSettings";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const { user } = useContext(AuthContext);

  return (
    <nav>
      <div id={styles.navbar}>
        <h1 id={styles.logo}>Shop Site</h1>
        <div className={styles.mainNavigation}>
          <Link to="/home">
            <div className={styles.mainNavLnkBox}>
              <p>Home</p>
            </div>
          </Link>
          <Link to="/shop">
            <div className={styles.mainNavLnkBox}>
              <p>Shop</p>
            </div>
          </Link>
          <Link to="/about">
            <div className={styles.mainNavLnkBox}>
              <p>About</p>
            </div>
          </Link>
        </div>

        <div className={styles.rightContainer}>
          {user && <button id={styles.yourOrdersBtn}>Your Orders</button>}
          <NavbarCart openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavbarSettings openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
