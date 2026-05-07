import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../server/firebase";
import { ref, set } from "firebase/database";
import styles from "../Styles/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import ShowPassword from "../components/ShowPassword";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  useEffect(() => {
    if (showPassword) {
      setPasswordVisibility("text");
    } else {
      setPasswordVisibility("password");
    }
  }, [showPassword]);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      console.log(user);

      if (user) {
        const userRef = ref(db, "users/" + user.uid);

        // set the user data in the db for the first time.
        await set(userRef, {
          firstName,
          lastName,
          email,
        });

        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
      }
      setMessage(
        `Account created successfully for ${email}! Welcome, ${user.displayName}.`,
      );

      console.log("Data saved successfully!");

      setFirstName("");
      setLastName("");
      setPassword("");
      setEmail("");

      navigate("/home");
    } catch (error) {
      // Handle errors during sign-up
      console.error("Sign-up error:", error.code, error.message);
      switch (error.code) {
        case "auth/email-already-in-use":
          setMessage(
            "This email address is already in use. Please sign in or use a different email.",
          );
          break;
        case "auth/invalid-email":
          setMessage("The email address is not valid.");
          break;
        case "auth/operation-not-allowed":
          setMessage(
            "Email/Password sign-up is not enabled. Please contact support.",
          );
          break;
        case "auth/weak-password":
          setMessage(
            "The password is too weak. It must be at least 6 characters.",
          );
          break;
        default:
          setMessage(
            `An unexpected error occurred during sign-up: ${error.message}`,
          );
      }
    }
  }

  return (
    <div id={styles.registerForm}>
      <h2 id={styles.signUpHead}>Sign Up</h2>
      <form onSubmit={handleSubmit} action="">
        <div>
          <label htmlFor="fName">First Name</label>
          <input
            id="fName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name</label>
          <input
            id="lName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <span id={styles.passwordSpan}>
            <input
              id="password"
              type={passwordVisibility}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </span>
        </div>
        <div>
          <button id={styles.submitBtn} type="submit">
            Sign Up
          </button>
        </div>
      </form>
      {message && (
        <p
          style={{
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SignUp;
