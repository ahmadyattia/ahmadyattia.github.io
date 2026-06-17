import styles from "@/styles/Login.module.css";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/server/firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import ShowPassword from "@/components/ShowPassword";

const Login = () => {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const passwordInputType = showPassword ? "text" : "password";

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setIsSubmitting(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      const user = userCredential.user;

      setUser(userCredential.user);

      setMessage(`Successfully signed in as: ${userCredential.user.email}`);
      setEmail("");
      setPassword("");
      console.log("Signed in user:", userCredential.user);

      // if coming from, for example, the order checkout, redirect there
      const redirectPath = location.state?.from?.pathname || "/home";

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
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.loginForm}>
      <h2 className={styles.loginHead}>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <span className={styles.passwordSpan}>
            <input
              id="password"
              type={passwordInputType}
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
          <button
            className={styles.loginBtn}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging In..." : "Login"}
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
      <p className={styles.signupP}>
        Don't have an account?{" "}
        <Link to={"/signup"} state={{ from: location.state?.from }}>
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
