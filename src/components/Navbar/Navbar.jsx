import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "@/Styles/Navbar/Navbar.module.css";
import NavbarCart from "../Cart/NavbarCart";
import NavbarSettings from "./Settings/NavbarSettings";
import useMediaQuery from "../../hooks/useMediaQuery";
import hamburgerMenuIcon from "@/assets/images/icons/menu_16px-white.svg";
import NavbarBtn from "./NavbarBtn";
import { AuthContext } from "@/context/AuthContext";
import { useLogout } from "@/hooks/useLogout";
import useDeleteAcc from "@/hooks/useDeleteAcc";

// icons
import rightArrow from "@/assets/images/icons/right_angle_bracket_white_16px.svg";
import loginIcon from "@/assets/images/icons/login_black.svg";
import orderIcon from "@/assets/images/icons/order-icon.svg";
import homeIcon from "@/assets/images/icons/home-icon-black.svg";
import aboutIcon from "@/assets/images/icons/about-icon-black.svg";
import shopIcon from "@/assets/images/icons/shop-icon-black.svg";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 850px)");
  const isDesktop = !useMediaQuery("(max-width: 850px)");
  const [isActive, setIsActive] = useState(false);
  const { user } = useContext(AuthContext);
  const handleLogout = useLogout();
  const handleDeleteAccount = useDeleteAcc();

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
              {user && (
                <Link to="/orders">
                  <div className={styles.mainNavLnkBoxMobile}>
                    <p>My Orders</p>
                    <img src={rightArrow} />
                  </div>
                </Link>
              )}
              <Link to="/about">
                <div className={styles.mainNavLnkBoxMobile}>
                  <p>About</p>
                  <img src={rightArrow} />
                </div>
              </Link>
              {!user && (
                <Link to="login">
                  <div className={styles.mainNavLnkBoxMobile}>
                    <p>Login</p>
                    <img src={rightArrow} />
                  </div>
                </Link>
              )}
              {user && (
                <div
                  className={styles.mainNavLnkBoxMobile}
                  onClick={handleLogout}
                >
                  <p>Logout</p>
                  <img src={rightArrow} />
                </div>
              )}
              {user && (
                <div
                  className={styles.mainNavLnkBoxMobile}
                  onClick={handleDeleteAccount}
                >
                  <p>Delete Account</p>
                  <img src={rightArrow} />
                </div>
              )}
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
        <Link to={"/home"} id={isMobile ? styles.logoMobile : styles.logo}>
          <h1>Shop Site</h1>
        </Link>
        {/* {isDesktop && (
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
        )} */}

        <div className={styles.rightContainer}>
          {isDesktop && <NavbarBtn icon={homeIcon} name="Home" path="/home" />}
          {isDesktop && <NavbarBtn icon={shopIcon} name="Shop" path="/shop" />}

          {isDesktop && (
            <NavbarBtn icon={aboutIcon} name="About" path="/about" />
          )}

          {user && isDesktop && (
            <NavbarBtn icon={orderIcon} name="My Orders" path="/orders" />
          )}

          {!user && isDesktop && (
            <NavbarBtn icon={loginIcon} name="Login" path="/login" />
          )}
          <NavbarCart />
          {user && isDesktop && <NavbarSettings />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
