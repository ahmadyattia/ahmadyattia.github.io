import styles from "../../../Styles/Homepage/categories/HomeCategoryCard.module.css";
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
    <div className={styles.card}>
      <img className={styles.img} src={categoryImg} alt="" />
      <p className={styles.name}>{category.name}</p>
      <button className={styles.shopNowBtn} onClick={handleClick}>
        Shop Now
      </button>
      {/* <div className={styles.nameAndBtn}>
      </div> */}
    </div>
  );
};

export default HomeCategoryCard;
