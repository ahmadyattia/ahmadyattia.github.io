import { useState } from "react";
import NavBtn from "./NavBtn";
import styles from "./NavBar.module.css";

export default function NavProjectsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [classList, setClassList] = useState(styles["dropdown-is-closed"]);

  function handleBtnClick() {
    if (isOpen) {
      setIsOpen(false);
      setClassList(styles["dropdown-is-closed"]);
    } else if (!isOpen) {
      setIsOpen(true);
      setClassList(styles["dropdown-is-open"]);
    }
  }

  return (
    <>
      <NavBtn
        title={"projects"}
        onClickAction={handleBtnClick}
        id={styles["nav-proj-btn"]}
      ></NavBtn>
      <div id={styles["projects-dropdown"]} className={classList}>
        <h2 id={styles["projects-title"]}>Projects</h2>
        <ul id={styles["projects"]}></ul>
      </div>
    </>
  );
}
