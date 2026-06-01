import styles from "../../../Styles/Homepage/categories/HomepageCategories.module.css";
import categories from "../../../data/Categories";
import HomeCategoryCard from "./HomeCategoryCard";
import { useState } from "react";
import backArrow from "@/assets/images/icons/arrow_back_white_20px.svg";
import forwardArrow from "@/assets/images/icons/arrow_forward_white_20px.svg";

const HomepageCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // number of slides according to categories
  const slidesCount = Math.ceil(categories.length / 2);

  let trackVibrate = "";

  const nextSlide = () => {
    // Loop back to start if at the end
    setCurrentIndex((prev) => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    // Loop to end if at the start
    setCurrentIndex((prev) => (prev === 0 ? slidesCount - 1 : prev - 1));
  };

  // track vibrates only on first slide
  if (currentIndex === 0) {
    trackVibrate = `${styles.trackVibrate}`;
  }

  return (
    <div id={styles.main}>
      <h1 id={styles.title}>Shop by Category</h1>
      <div id={styles.carousel}>
        <button id={styles.backBtn} onClick={prevSlide}>
          <img src={backArrow} alt="back_arrow" />
        </button>
        <div id={styles.trackWrapper}>
          <div
            id={styles.track}
            className={trackVibrate}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {categories.map((category) => {
              return (
                <HomeCategoryCard key={category.name} category={category} />
              );
            })}
          </div>
        </div>
        <button id={styles.forwardBtn} onClick={nextSlide}>
          <img src={forwardArrow} alt="forward_arrow" />
        </button>
      </div>
    </div>
  );
};

export default HomepageCategories;
