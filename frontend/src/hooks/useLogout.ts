import { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/server/firebase";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export function useLogout() {
  const navigate = useNavigate();
  const { setCart } = useCart();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Error signing out: ", error);
    }

    // reset cart on log out
    setCart([]);
  }

  return handleLogout;
}
