import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

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
