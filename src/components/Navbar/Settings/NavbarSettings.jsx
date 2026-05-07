import React, { useContext, useState, useEffect } from "react";
// import LogoutButton from "./LogoutButton";
import LogoutBtn from "./LogoutBtn";
import DeleteAccount from "./DeleteAccBtn";
import { AuthContext } from "../../../context/AuthContext";
import LoginBtn from "./LoginBtn";
import SignUpBtn from "./SignUpBtn";
import styles from "../../../Styles/Navbar/Settings/NavbarSettings.module.css";

const NavbarSettings = ({ openMenu, setOpenMenu }) => {
  const { user } = useContext(AuthContext);
  const [toggle, setToggle] = useState(false);
  const [className, setClassName] = useState(
    `${styles.settingsDropdown} ${styles.hideDropdown}`,
  );

  // close dropdown menu when another is opened
  useEffect(() => {
    if (openMenu != "settings") {
      setToggle(false);
      setClassName(`${styles.settingsDropdown}  ${styles.hideDropdown}`);
    }
  }, [openMenu]);

  function handleToggle() {
    if (!toggle) {
      setClassName(`${styles.settingsDropdown}`);
      setToggle(true);
      setOpenMenu("settings");
    } else {
      setClassName(`${styles.settingsDropdown}  ${styles.hideDropdown}`);
      setToggle(false);
      setOpenMenu(null);
    }
  }

  return (
    <div className={styles.settingsContainer} onClick={handleToggle}>
      <div className={styles.settingsIconContainer} title="Settings">
        <img
          className={styles.settingsIcon}
          src="/src/assets/images/icons/settings.svg"
          alt=""
        />
      </div>
      <div className={className}>
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
    </div>
  );
};

export default NavbarSettings;
