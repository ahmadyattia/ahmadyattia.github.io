import styles from "@/Styles/Navbar/Settings/LogoutBtn.module.css";
import logoutIcon from "@/assets/images/icons/logout_black.svg";
import { useLogout } from "@/hooks/useLogout";

const LogoutBtn = () => {
  const handleLogout = useLogout();

  return (
    <button id={styles.flexContainer} onClick={handleLogout}>
      <img id={styles.logoutIcon} src={logoutIcon} alt="" aria-hidden="true" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutBtn;
