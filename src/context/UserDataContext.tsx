import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext, useAuth } from "./AuthContext";
import { ref, get, child } from "firebase/database";
import { db } from "../server/firebase";
import { CartItem } from "./CartContext";

interface UserDataContextType {
  userData: UserData | null;
  isLoading: boolean;
  error: Error | null;
}

interface UserData {
  cart: CartItem[];
  email: string;
  firstName: string;
  lastName: string;
}

interface UserDataProviderProps {
  children: React.ReactNode;
}

export const UserDataContext = createContext<UserDataContextType | null>(null);

const UserDataProvider = ({ children }: UserDataProviderProps) => {
  const { user, loading: authLoading } = useAuth();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // load user data from db
  useEffect(() => {
    if (authLoading) return;

    // flag to prevent state updates if the user logs out mid-fetch
    let isMounted = true;

    if (user) {
      setIsLoading(true);
      setError(null);

      async function readUserData() {
        const dbRef = ref(db);

        try {
          const snapshot = await get(child(dbRef, "users/" + user?.uid));

          if (isMounted) {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              console.log("No data exists for this user.");
              setUserData(null);
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (isMounted) {
            setError(
              error instanceof Error
                ? error
                : new Error("An unknown error occurred"),
            );
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      }

      readUserData();
    } else {
      // Clean up profile states immediately if user logs out
      setUserData(null);
      setIsLoading(false);
    }

    // Cleanup function turns flag off if user logs out mid-stream
    return () => {
      isMounted = false;
    };
  }, [user, authLoading]);

  return (
    <>
      <UserDataContext.Provider value={{ userData, isLoading, error }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export function useUserData() {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
}

export default UserDataProvider;
