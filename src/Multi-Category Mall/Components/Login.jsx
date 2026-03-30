import styles from "../Styles/Login.module.css";
import { useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../server/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import ShowPassword from "./ShowPassword";

const Login = () => {
  const { setToken, setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (showPassword) {
      setPasswordVisibility("text");
    } else {
      setPasswordVisibility("password");
    }
  }, [showPassword]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      const idToken = await user.getIdToken();

      setUser(userCredential.user);
      setToken(idToken);

      setMessage(`Successfully signed in as: ${userCredential.user.email}`);
      setEmail("");
      setPassword("");
      console.log("Signed in user:", userCredential.user);

      // if coming from, for example, the order checkout, redirect there
      const redirectPath = location.state.from?.pathname || "/profile";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error("Sign-in error:", error.code, error.message);
      switch (error.code) {
        case "auth/user-not-found":
          setMessage(
            "No account found with this email. Please check your email or sign up.",
          );
          break;
        case "auth/wrong-password":
          setMessage("Incorrect password. Please try again.");
          break;
        case "auth/invalid-email":
          setMessage("The email address is not valid.");
          break;
        case "auth/invalid-credential": // Generic error for bad credentials
          setMessage(
            "Invalid credentials. Please check your email and password.",
          );
          break;
        case "auth/too-many-requests":
          setMessage(
            "Access to this account has been temporarily blocked due to many failed login attempts. Try again later.",
          );
          break;
        default:
          setMessage(`An unexpected error occurred: ${error.message}`);
      }
    }
  }

  return (
    <div id={styles.loginForm}>
      <h2 id={styles.loginHead}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            />
            <ShowPassword
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </span>
        </div>
        <div>
          <button id={styles.loginBtn} type="submit">
            Login
          </button>
        </div>
      </form>
      {message && (
        <p
          style={{ color: message.includes("Successfully") ? "green" : "red" }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Login;
