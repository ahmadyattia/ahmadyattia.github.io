import { Link } from "react-router-dom";
import styles from "../Styles/CategoryCard.module.css";
import { useEffect, useState } from "react";

const CategoryCard = ({ slug, name }) => {
  const [isMounted, setIsMounted] = useState(false);

  // animation
  useEffect(() => {
    // timer for the mobile browser to delay display so that the animation works
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 20);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Link className={styles.card} to={`/shop/${slug}?page=1`}>
      <h3 className={`${styles.name} ${isMounted ? styles.fadeIn : ""}`}>
        {name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
