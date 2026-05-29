import styles from "../../../Styles/Navbar/Settings/LogoutBtn.module.css";
import logoutIcon from "@/assets/images/icons/logout_black.svg";
import { useLogout } from "@/hooks/useLogout";

const LogoutBtn = () => {
  const handleLogout = useLogout();

  return (
    <div>
      <div id={styles.flexContainer}>
        <img id={styles.logoutIcon} src={logoutIcon} alt="" />
        <button id={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutBtn;
