import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "@/Styles/Navbar/Navbar.module.css";
import NavbarCart from "../Cart/NavbarCart";
import NavbarSettings from "./Settings/NavbarSettings";
import useMediaQuery from "../../hooks/useMediaQuery";
import hamburgerMenuIcon from "@/assets/images/icons/menu_16px-white.svg";
import rightArrow from "@/assets/images/icons/right_angle_bracket_white_16px.svg";

const Navbar = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = !useMediaQuery("(max-width: 768px)");
  const [isActive, setIsActive] = useState(false);

  function handleYourOrdersBtn() {
    navigate("/orders"); // protected route
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
      <div id={styles.navbar}>
        {isMobile && (
          <div className={styles.mainNavMenuMobile} onClick={handleMenuClick}>
            <div
              className={
                isActive ? styles.mainNavLstOpened : styles.mainNavLstClosed
              }
            >
              <div className={styles.closeMenuIconBox}>
                <img
                  className={styles.closeMenuIcon}
                  src={hamburgerMenuIcon}
                  onClick={handleMenuClick}
                  alt="menu_icon"
                ></img>
              </div>
              <Link to="/home">
                <div className={styles.mainNavLnkBoxMobile}>
                  <p>Home</p>
                  <img src={rightArrow} />
                </div>
              </Link>
              <Link to="/shop">
                <div className={styles.mainNavLnkBoxMobile}>
                  <p>Shop</p>
                  <img src={rightArrow} />
                </div>
              </Link>
              <Link to="/about">
                <div className={styles.mainNavLnkBoxMobile}>
                  <p>About</p>
                  <img src={rightArrow} />
                </div>
              </Link>
            </div>
            <div className={styles.OpenMenuIconBox} onClick={handleMenuClick}>
              <img
                className={styles.openMenuIcon}
                src={hamburgerMenuIcon}
                alt="menu_icon"
              />
            </div>
          </div>
        )}
        <h1 id={isMobile ? styles.logoMobile : styles.logo}>Shop Site</h1>

        {isDesktop && (
          <div className={styles.mainNav}>
            <Link to="/shop">
              <div className={styles.mainNavLnkBox}>
                <p>Shop</p>
              </div>
            </Link>
            <Link to="/home">
              <div className={styles.mainNavLnkBox}>
                <p>Home</p>
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
          <button id={styles.yourOrdersBtn} onClick={handleYourOrdersBtn}>
            Your Orders
          </button>

          <NavbarCart />
          <NavbarSettings />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
