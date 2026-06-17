import { useContext } from "react";
import { CartContext } from "@/context/CartContext.jsx";

function calculateCartCount() {
  const { cart } = useContext(CartContext);

  return cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

export default calculateCartCount;
