import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import styles from "../../Styles/Cart/AddToCartBtn.module.css";

const AddToCartBtn = ({ product }) => {
  const { cart } = useContext(CartContext);
  const { handleAddToCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);

  const itemExistsInCart = cart.some((item) => item.id == product.id);

  function handleBtnClick() {
    setIsInCart(true);
  }

  useEffect(() => {
    if (itemExistsInCart) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [itemExistsInCart]);

  const cartItem = {
    id: product.id,
    img: product.images[0],
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    discountPercentage: product.discountPercentage,
    quantity: 0,
  };

  return (
    <div>
      {isInCart ? (
        <button className={styles.addedToCartBtn}>Added To Cart</button>
      ) : (
        <button
          className={styles.addToCartBtn}
          onClick={() => {
            handleAddToCart(cartItem);
            handleBtnClick();
          }}
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default AddToCartBtn;
