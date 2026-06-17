import { createContext, useState, useContext, useEffect } from "react";
import { ref, update } from "firebase/database";
import { db } from "../server/firebase";
import { AuthContext } from "./AuthContext";
import { UserDataContext } from "./UserDataContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { userData } = useContext(UserDataContext);

  // initialize the cart
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // SCENARIO A: Authenticated User
    if (user && userData) {
      let currentDbCart = userData.cart || [];
      let guestCartData = [];

      try {
        const localData = localStorage.getItem("guest_cart");
        if (localData) guestCartData = JSON.parse(localData);
      } catch (err) {
        console.error("Failed parsing guest cart during merge phase:", err);
      }

      // Merge only if a guest cart actively exists on login
      if (guestCartData.length > 0) {
        const mergedMap = new Map();

        [...currentDbCart, ...guestCartData].forEach((item) => {
          if (mergedMap.has(item.id)) {
            const match = mergedMap.get(item.id);
            mergedMap.set(item.id, {
              ...match,
              quantity: match.quantity + item.quantity,
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
        if (savedCart) setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Corrupted guest item structure:", error);
      }
    }
  }, [user, userData]);

  // Helper: Persist state updates to correct destination
  const persistCartState = (nextCartState) => {
    setCart(nextCartState);
    console.log(nextCartState);
    if (user) {
      update(ref(db, `users/${user.uid}`), { cart: nextCartState });
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(nextCartState));
    }
  };

  // Action: Add to Cart
  function handleAddToCart(targetProduct) {
    const existingIndex = cart.findIndex(
      (item) => item.id === targetProduct.id,
    );
    let updatedCart;

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
  function handleRemoveFromCart(targetProduct, removeEntirely = false) {
    const match = cart.find((item) => item.id === targetProduct.id);
    if (!match) return;

    let updatedCart;

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

export default CartProvider;
