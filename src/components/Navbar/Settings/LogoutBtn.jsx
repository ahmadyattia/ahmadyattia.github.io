import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../../server/firebase";
import styles from "../../../Styles/Navbar/Settings/LogoutBtn.module.css";
import { replace, useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/CartContext";
import logoutIcon from "@/assets/images/icons/logout_black.svg";

const LogoutBtn = () => {
  const { loading, user } = useContext(AuthContext);
  const { setCart } = useContext(CartContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login", { replace: "true" });
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Error signing out: ", error);
    }

    // reset cart on log out
    setCart([]);
  }

  if (loading || !user) {
    return null;
  }

  return (
    <div>
      <div id={styles.flexContainer}>
        <img id={styles.logoutIcon} src={logoutIcon} alt="" />
        <button id={styles.logoutBtn} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutBtn;
