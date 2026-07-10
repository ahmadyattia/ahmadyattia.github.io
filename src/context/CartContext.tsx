import { createContext, useState, useContext, useEffect } from "react";
import { ref, update } from "firebase/database";
import { db } from "../server/firebase";
import { useAuth } from "./AuthContext";
import { useUserData } from "./UserDataContext";
import { ReactNode } from "react";

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  handleAddToCart: (targetProduct: CartItem) => void;
  handleRemoveFromCart: (
    targetProduct: CartItem,
    removeEntirely?: boolean,
  ) => void;
}

export interface CartItem {
  category: string;
  description: string;
  discountPercentage: number;
  id: string;
  img: string;
  price: number;
  quantity: number;
  title: string;
}

export const CartContext = createContext<CartContextType | null>(null);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { userData } = useUserData();

  // initialize the cart
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // SCENARIO A: Authenticated User
    if (user && userData) {
      let currentDbCart = userData.cart || [];

      let guestCartData: CartItem[] = [];

      try {
        const localData = localStorage.getItem("guest_cart");
        if (localData) guestCartData = JSON.parse(localData) as CartItem[];
      } catch (err) {
        console.error("Failed parsing guest cart during merge phase:", err);
      }

      // Merge only if a guest cart actively exists on login
      if (guestCartData.length > 0) {
        const mergedMap = new Map<string, CartItem>();

        [...currentDbCart, ...guestCartData].forEach((item) => {
          const existingItem = mergedMap.get(item.id);
          if (existingItem) {
            mergedMap.set(item.id, {
              ...existingItem,
              quantity: existingItem.quantity + item.quantity,
            });
          } else {
            mergedMap.set(item.id, { ...item });
          }
        });

        const finalizedMergedCart = Array.from(mergedMap.values());

        // Sync merge to state and db

        setCart(finalizedMergedCart);

        const userRef = ref(db, `users/${user.uid}`);
        update(userRef, { cart: finalizedMergedCart });

        localStorage.removeItem("guest_cart");
      } else {
        // no guest items to combine, just inherit db data
        setCart(currentDbCart);
      }
      return;
    }

    // SCENARIO B: Unauthenticated Guest
    if (!user) {
      try {
        const savedCart = localStorage.getItem("guest_cart");
        if (savedCart) setCart(JSON.parse(savedCart) as CartItem[]);
      } catch (error) {
        console.error("Corrupted guest item structure:", error);
      }
    }
  }, [user, userData]);

  // Helper: Persist state updates to correct destination
  const persistCartState = (nextCartState: CartItem[]) => {
    setCart(nextCartState);
    if (user) {
      update(ref(db, `users/${user.uid}`), { cart: nextCartState });
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(nextCartState));
    }
  };

  // Action: Add to Cart
  function handleAddToCart(targetProduct: CartItem) {
    const existingIndex = cart.findIndex(
      (item) => item.id === targetProduct.id,
    );
    let updatedCart: CartItem[];

    // if item exists already, increase quantity
    if (existingIndex > -1) {
      updatedCart = cart.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item,
      );
    } else {
      // add a new item
      updatedCart = [...cart, { ...targetProduct, quantity: 1 }];
    }

    // update cart state
    persistCartState(updatedCart);
  }

  // Action: Remove from Cart
  function handleRemoveFromCart(
    targetProduct: CartItem,
    removeEntirely = false,
  ) {
    const match = cart.find((item) => item.id === targetProduct.id);
    if (!match) return;

    let updatedCart: CartItem[];

    if (match.quantity > 1 && !removeEntirely) {
      updatedCart = cart.map((item) =>
        item.id === targetProduct.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    } else {
      updatedCart = cart.filter((item) => item.id !== targetProduct.id);
    }

    // update cart state
    persistCartState(updatedCart);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}

export default CartProvider;
