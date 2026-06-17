import { Link } from "react-router-dom";
import styles from "../Styles/CategoryCard.module.css";

const CategoryCard = ({ slug, name }) => {
  return (
    <Link className={styles.card} to={`/shop/${slug}`}>
      <h3 className={styles.name}>{name}</h3>
    </Link>
  );
};

export default CategoryCard;
