import React from "react";
import styles from "@/styles/Navbar/NavbarBtn.module.css";
import { Link } from "react-router-dom";

const NavbarBtn = ({ icon, name, path }) => {
  return (
    <Link to={path} className={styles.navbarBtn}>
      <img src={icon} alt="" aria-hidden="true" />
      <span>{name}</span>
    </Link>
  );
};

export default NavbarBtn;
