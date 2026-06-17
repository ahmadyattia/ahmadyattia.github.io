import styles from "@/Styles/Homepage/categories/HomeCategoryCard.module.css";
import categoriesImages from "@/data/CategoriesImages";
import { useNavigate } from "react-router-dom";

const HomeCategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const categoryImg = categoriesImages.find((img) => {
    return img.category.toLowerCase() === category.name.toLowerCase();
  }).imgURL;

  function handleClick() {
    navigate(`/shop/${category.slug}`);
  }

  return (
    <div className={styles.card} onClick={handleClick}>
      <img className={styles.img} src={categoryImg} alt="" />
      <p className={styles.name}>{category.name}</p>
    </div>
  );
};

export default HomeCategoryCard;
