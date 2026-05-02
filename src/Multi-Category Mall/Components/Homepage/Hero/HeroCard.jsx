import styles from "../../../Styles/Homepage/Hero/HeroCard.module.css";
import { useNavigate } from "react-router-dom";
import SwitchBtns from "./SwitchBtns";
import slugify from "../../../../utils/slugify";

const HeroCard = ({ item }) => {
  const navigate = useNavigate();

  function handleShopNow() {
    navigate(`/shop/${slugify(item.category)}/${item.id}/${item.slug}`);
  }

  return (
    <div className={`${styles.heroCard}`}>
      <div className={styles.body}>
        <h1 className={styles.title}>{item.title}</h1>
        <button className={styles.shopNowBtn} onClick={handleShopNow}>
          Shop now
        </button>
      </div>

      <div className={styles.heroImgContainer}>
        <img src={item.images[0]} alt="" />
      </div>
    </div>
  );
};

export default HeroCard;
