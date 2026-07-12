import { useContext, useState, useRef } from "react";
import LogoutBtn from "./LogoutBtn";
import DeleteAccount from "./DeleteAccBtn";
import { useAuth } from "@/context/AuthContext";
import styles from "@/Styles/Navbar/Settings/NavbarSettings.module.css";
import useClickOutside from "@/hooks/useClickOutside";
import settingsIcon from "@/assets/images/icons/settings.svg";

const NavbarSettings = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const settingsRef = useRef(null);

  // close menu when clicking away from it
  useClickOutside(setIsOpen, settingsRef);

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
        <img className={styles.settingsIcon} src={settingsIcon} alt="" />
      </div>
      {isOpen && user && (
        <div className={styles.settingsDropdown}>
          <h2 id={styles.settingsHead}>Settings</h2>
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
        </div>
      )}
    </div>
  );
};

export default NavbarSettings;
