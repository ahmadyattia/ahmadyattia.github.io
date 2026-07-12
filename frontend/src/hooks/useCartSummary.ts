import { calculateDiscount, calculateSubTotal } from "@/utils/cartSummaryUtils";
import { useMemo } from "react";
import { CartItem } from "@/context/CartContext";

export default function useCartSummary(cart: CartItem[], shippingMethod: string) {
  return useMemo(() => {
    const subTotal = calculateSubTotal(cart);
    const discount = calculateDiscount(cart);
    const shippingPrice = shippingMethod === "delivery" ? 10 : 0; // delivery is $10, pickup is free
    const total = subTotal - discount + shippingPrice;

    return {
      subTotal: subTotal.toFixed(2),
      discount: discount.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
      total: total.toFixed(2),
    };
  }, [cart, shippingMethod]);
}
