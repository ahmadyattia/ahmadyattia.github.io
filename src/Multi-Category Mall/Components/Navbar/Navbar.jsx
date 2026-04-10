import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "/Users/ahmadattia/portfolio/src/Multi-Category Mall/Styles/Navbar/Navbar.module.css";
import NavbarCart from "../Cart/NavbarCart";
import NavbarSettings from "./Settings/NavbarSettings";
import { AuthContext } from "../../Context/AuthContext";
import useMediaQuery from "../../hooks/useMediaQuery";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = !useMediaQuery("(max-width: 768px)");
  const [isActive, setIsActive] = useState(false);

  function handleYourOrdersBtn() {
    navigate("/orders");
  }

  function handleMenuClick() {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }

  return (
    <nav>
      {/* <div className={styles.allOfNavbar}> */}
      <div id={styles.navbar}>
        {isMobile && (
          <div className={styles.mainNavMenuMobile}>
            <div
              className={
                isActive ? styles.mainNavLstOpened : styles.mainNavLstClosed
              }
            >
              <div className={styles.closeMenuIconBox}>
                <img
                  className={styles.closeMenuIcon}
                  src="src/assets/images/icons/menu_16px-white.svg"
                  onClick={handleMenuClick}
                ></img>
              </div>
              <Link to="/home">
                <div className={styles.mainNavLnkBoxMobile}>
                  <p>Home</p>
                </div>
              </Link>
              <Link to="/shop">
                <div className={styles.mainNavLnkBoxMobile}>
                  <p>Shop</p>
                </div>
              </Link>
              <Link to="/about">
                <div className={styles.mainNavLnkBoxMobile}>
                  <p>About</p>
                </div>
              </Link>
            </div>
            <div className={styles.OpenMenuIconBox} onClick={handleMenuClick}>
              <img
                className={styles.openMenuIcon}
                src="src/assets/images/icons/menu_16px-white.svg"
                alt=""
              />
            </div>
          </div>
        )}
        <h1 id={isMobile ? styles.logoMobile : styles.logo}>Shop Site</h1>

        {isDesktop && (
          <div className={styles.mainNav}>
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
        )}

        <div className={styles.rightContainer}>
          {user && (
            <button id={styles.yourOrdersBtn} onClick={handleYourOrdersBtn}>
              Your Orders
            </button>
          )}
          <NavbarCart openMenu={openMenu} setOpenMenu={setOpenMenu} />
          <NavbarSettings openMenu={openMenu} setOpenMenu={setOpenMenu} />
        </div>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
