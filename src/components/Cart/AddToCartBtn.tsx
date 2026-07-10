import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import styles from "../../Styles/Cart/AddToCartBtn.module.css";
import mapToCartItem from "@/data/mappers/cartItemMapper";
import { MappedProduct } from "@/data/mappers/productsMapper";

interface AddToCartBtnProps {
  product: MappedProduct;
}

const AddToCartBtn = ({ product }: AddToCartBtnProps) => {
  const { cart } = useContext(CartContext);
  const { handleAddToCart } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);

  // if the cart gets updated, update the UI
  useEffect(() => {
    setIsInCart(cart.some((item) => item.id == product.id));
  }, [cart]);

  function handleBtnClick() {
    setIsInCart(true);
  }

  const cartItem = mapToCartItem(product);

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
