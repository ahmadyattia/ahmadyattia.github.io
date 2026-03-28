import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <h1 style={{ color: "white" }}>Welcome, {user.displayName}</h1>
      ) : (
        <p style={{ color: "white" }}>No user available</p>
      )}
    </>
  );
};

export default Profile;
