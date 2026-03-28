import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../Styles/Navbar/Settings/LoginBtn.module.css";

const LoginBtn = () => {
  return (
    <div>
      <Link to="/login">
        <div className={styles.flexContainer}>
          <img
            id={styles.loginIcon}
            src="/src/assets/images/icons/login_black.svg"
            alt=""
          />
          <button className={styles.loginBtn}> Login</button>
        </div>
      </Link>
    </div>
  );
};

export default LoginBtn;
