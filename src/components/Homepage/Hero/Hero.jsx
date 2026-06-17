import styles from "@/Styles/Homepage/hero/Hero.module.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  function handleShopNow() {
    navigate(`/shop`);
  }

  return (
    <div id={styles.hero}>
      <div className={styles.heroCard}>
        <div className={styles.body}>
          <h1 className={styles.title}>
            From Home to Heart: Find What You’re Looking For.
          </h1>
          <button className={styles.shopNowBtn} onClick={handleShopNow}>
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
