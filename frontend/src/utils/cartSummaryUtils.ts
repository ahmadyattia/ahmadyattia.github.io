import { CartItem } from "@/context/CartContext";

export const calculateSubTotal = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

export const calculateDiscount = (cart: CartItem[]) => {
  return cart.reduce((acc, item) => {
    const itemDiscount = item.price * (item.discountPercentage / 100);
    return acc + itemDiscount * item.quantity;
  }, 0);
};
