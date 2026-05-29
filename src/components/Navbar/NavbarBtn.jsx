import React from "react";
import styles from "@/styles/Navbar/NavbarBtn.module.css";
import { Link } from "react-router-dom";

const NavbarBtn = ({ icon, name, path }) => {
  return (
    <Link to={path}>
      <button className={styles.navbarBtn}>
        <img src={icon} alt={name} />
        {name}
      </button>
    </Link>
  );
};

export default NavbarBtn;
