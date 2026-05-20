import React from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../Styles/Breadcrumbs.module.css";
import rightBracketIcon from "@/assets/images/icons/right_angle_bracket_white_16px.svg";

const Breadcrumbs = () => {
  // const location = useLocation();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // omitting product id from breadcrumbs
  const breadcrumbs = pathnames.filter((path) => {
    return isNaN(path);
  });

  console.log(location.pathname);

  return (
    <nav>
      <div id={styles.breadcrumbs}>
        {breadcrumbs.map((value, index) => {
          const last = index === breadcrumbs.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <span className={styles.flexContainer} key={to}>
              <img className={styles.arrowIcon} src={rightBracketIcon} />
              <p>{value}</p>
            </span>
          ) : (
            // The breadcrumb link uses absolute path starting with "/"
            <span className={styles.flexContainer} key={to}>
              <img className={styles.arrowIcon} src={rightBracketIcon} />

              <Link to={to} className={styles.breadcrumbLinks}>
                <p>{value}</p>
              </Link>
            </span>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
