import { createContext, useState, useContext, useEffect } from "react";
import { ref, update } from "firebase/database";
import { db } from "../server/firebase";
import { AuthContext } from "./AuthContext";
import { UserDataContext } from "./UserDataContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { userData } = useContext(UserDataContext);

  const [error, setError] = useState(null);

  // initialize the cart
  const [cart, setCart] = useState([]);

  // get cart data from local storage on load
  // while logged out
  useEffect(() => {
    if (!user) {
      try {
        const savedCart = localStorage.getItem("guest_cart");

        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error parsing json. Data corrupted:", error);
      }
    }
  }, []);

  // saving cart to local storage if it doesn't exist or for update
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_cart", JSON.stringify(cart));
    }
  }, [cart]);

  // load cart from db when the user signs in
  useEffect(() => {
    if (user && userData) {
      userData.cart ? setCart(userData.cart) : setCart([]);
    }
  }, [user, userData]);

  // update/set cart in the db
  useEffect(() => {
    if (user) {
      const userId = user.uid;

      // reference to the user data in firebase
      const userRef = ref(db, `users/${userId}`);

      update(userRef, {
        cart: cart,
      });
    } else {
      // No authenticated user
      setError("Please log in to view your profile.");
    }
  }, [cart]);

  // merge cart on login
  useEffect(() => {
    if (user) {
      const userId = user.uid;

      // reference to the user data in firebase
      const userRef = ref(db, `users/${userId}`);

      let guestCart = localStorage.getItem("guest_cart");

      if (guestCart && userData) {
        guestCart = JSON.parse(guestCart);

        if (userData.cart) {
          // merging for duplicate items using a Map
          const mergedMap = new Map();

          [...userData.cart, ...guestCart].forEach((item) => {
            if (mergedMap.has(item.id)) {
              const existing = mergedMap.get(item.id);
              mergedMap.set(item.id, {
                ...existing,
                quantity: existing.quantity + item.quantity,
              });
            } else {
              mergedMap.set(item.id, { ...item });
            }
          });

          const finalCart = Array.from(mergedMap.values());

          setCart(finalCart);

          // update db
          update(userRef, {
            cart: finalCart,
          });
        } else {
          setCart(guestCart);

          // update db
          update(userRef, {
            cart: guestCart,
          });
        }

        // reset local storage (this is after merging the data)
        localStorage.setItem("guest_cart", []);
      }
    }
  }, [user, userData]);

  function handleAddToCart(item) {
    // the item if it is already in the cart
    const existingItem = cart.find((value) => value.id === item.id);

    // if the item exists, increase the quantity
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      );

      setCart(updatedCart);
    } else {
      // otherwise add the item to the cart
      item.quantity += 1;
      setCart([...cart, item]);
    }
  }

  function handleRemoveFromCart(item, removeEntirely = false) {
    // if there's a quantity reduce it until quantity equals 1

    if (item.quantity > 1) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem,
      );

      setCart(updatedCart);
    }
    if (item.quantity <= 1 || removeEntirely) {
      // remove the item completely and update the cart
      item.quantity = 0;
      setCart([...cart.filter((value) => value.id !== item.id)]);
    }
  }

  return (
    <div>
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
    </div>
  );
};

export default CartProvider;
