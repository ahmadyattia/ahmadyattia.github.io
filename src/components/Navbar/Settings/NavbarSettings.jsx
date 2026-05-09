import React, { useContext, useState, useEffect, useRef } from "react";
// import LogoutButton from "./LogoutButton";
import LogoutBtn from "./LogoutBtn";
import DeleteAccount from "./DeleteAccBtn";
import { AuthContext } from "../../../context/AuthContext";
import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";
import styles from "../../../Styles/Navbar/Settings/NavbarSettings.module.css";
import closeMenuOnClickOutside from "@/utils/closeMenuOnClickOutside";

const NavbarSettings = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const settingsRef = useRef(null);

  // close menu when clicking away from it
  closeMenuOnClickOutside(setIsOpen, settingsRef);

  function handleToggle() {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <div
      className={styles.settingsContainer}
      onClick={handleToggle}
      ref={settingsRef}
    >
      <div
        className={styles.settingsIconContainer}
        title="Settings"
        onClick={handleToggle}
      >
        <img
          className={styles.settingsIcon}
          src="/src/assets/images/icons/settings.svg"
          alt=""
        />
      </div>
      {isOpen && (
        <div className={styles.settingsDropdown}>
          <h2 id={styles.settingsHead}>Settings</h2>
          {user ? (
            <ul>
              <div className={styles.liContainer}>
                <li>
                  <LogoutBtn />
                </li>
              </div>
              <hr />

              <div className={styles.liContainer}>
                <li>
                  <DeleteAccount />
                </li>
              </div>
            </ul>
          ) : (
            <ul>
              <div className={styles.liContainer}>
                <li>
                  <LoginBtn />
                </li>
              </div>
              <hr />
              <div className={styles.liContainer}>
                <li>
                  <SignUpBtn />
                </li>
              </div>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NavbarSettings;
