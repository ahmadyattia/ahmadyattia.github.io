import { useLocation, Link } from "react-router-dom";
import styles from "../Styles/Breadcrumbs.module.css";
import rightBracketIcon from "@/assets/images/icons/right_angle_bracket_white_16px.svg";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // define a regex pattern that matches the product id
  // for the purpose of omitting the product id from breadcrumbs
  const isProductId = (segment) => /^-[A-Za-z0-9_-]{19}$/.test(segment);

  // omitting product id from breadcrumbs
  const breadcrumbs = pathnames.filter((path) => {
    return !isProductId(path);
  });

  // no breadcrumbs on home page
  if (location.pathname === "/" || location.pathname === "/home") return null;

  return (
    <nav>
      <ol id={styles.breadcrumbs}>
        {breadcrumbs.map((value, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <li className={styles.flexContainer}>
              {/* Only show arrow icons starting from the second item */}
              {index > 0 && (
                <img className={styles.arrowIcon} src={rightBracketIcon} />
              )}

              {isLast ? (
                <span key={to}>{value}</span>
              ) : (
                <Link to={to} className={styles.breadcrumbLinks}>
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
