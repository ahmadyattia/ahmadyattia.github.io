import styles from "./NavBar.module.css";
import NavBtn from "./NavBtn";
import NavProjectsDropdown from "./NavProjectsDropdown";

export default function NavBar() {
  return (
    <>
      <nav>
        <div id={styles["nav-bar"]}>
          <a href="">
            <NavBtn title="Contact"></NavBtn>
          </a>
          <a href="">
            <NavBtn title="About"></NavBtn>
          </a>
          <NavProjectsDropdown></NavProjectsDropdown>
          <a href="">
            <NavBtn title="Home"></NavBtn>
          </a>
        </div>
      </nav>
    </>
  );
}
