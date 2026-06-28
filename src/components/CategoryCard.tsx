import { Link } from "react-router-dom";
import styles from "../styles/CategoryCard.module.css";

interface CategoryCardProps {
  slug: string;
  name: string;
}

const CategoryCard = ({ slug, name }: CategoryCardProps) => {
  return (
    <Link className={styles.card} to={`/shop/${slug}`}>
      <h3 className={styles.name}>{name}</h3>
    </Link>
  );
};

export default CategoryCard;
