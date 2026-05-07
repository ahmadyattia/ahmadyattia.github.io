import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../../context/ProductsContext";
import HeroCard from "./HeroCard";
import styles from "../../../Styles/Homepage/hero/Hero.module.css";

const Hero = () => {
  const { data } = useContext(ProductsContext);
  let [displayedProductIndex, setDisplayedProductIndex] = useState(0);
  const [fourRandomItems, setFourRandomItems] = useState([]);
  let products = null;

  if (data) {
    products = data;
  } else {
    console.log("Failed to fetch data.");
  }

  useEffect(() => {
    // generate 4 random products from the products data
    // that are not groceries
    let selected = [];

    while (products && selected.length < 4) {
      const randomItem = products[Math.floor(Math.random() * products.length)];

      const alreadyChosen = selected.some((item) => item.id === randomItem.id);

      if (!alreadyChosen && randomItem.category !== "groceries") {
        selected.push(randomItem);
      }
    }

    setFourRandomItems([...selected]);
  }, [products]);

  function handleSwitch(order) {
    if (fourRandomItems.length === 0) return;

    setDisplayedProductIndex((prevIndex) => {
      if (order === "next") {
        return prevIndex === 3 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? 3 : prevIndex - 1;
      }
    });
  }

  // automatic switching
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     handleSwitch("next");
  //   }, 15000);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [fourRandomItems]);

  return (
    <div id={styles.hero}>
      {fourRandomItems.length > 0 && (
        <HeroCard
          item={fourRandomItems[displayedProductIndex]}
          switchFn={handleSwitch}
        />
      )}
    </div>
  );
};

export default Hero;
