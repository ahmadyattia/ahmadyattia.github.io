import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ref, get, child } from "firebase/database";
import { db } from "../server/firebase";

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
          const snapshot = await get(child(dbRef, "users/" + user.uid));

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
          if (isMounted) setError(error);
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

export default UserDataProvider;
