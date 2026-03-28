import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { ref, get, child } from "firebase/database";
import { db } from "../server/firebase";

export const UserDataContext = createContext();

const UserDataProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load user data from db
  useEffect(() => {
    if (user) {
      async function readUserData() {
        const dbRef = ref(db);

        try {
          const snapshot = await get(child(dbRef, "users/" + user.uid));
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("No data exists for this user.");
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }

      readUserData();
    } else {
      console.log("There is not a signed in user.");
      setUserData(null);
    }
  }, [user]);

  return (
    <>
      <UserDataContext.Provider value={{ userData }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export default UserDataProvider;
