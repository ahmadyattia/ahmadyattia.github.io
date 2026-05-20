import styles from "../../../Styles/Navbar/Settings/SignUpBtn.module.css";
import { Link } from "react-router-dom";
import signupIcon from "@/assets/images/icons/sign_up_black.svg";

const SignUpBtn = () => {
  return (
    <div>
      <Link to="/signup">
        <div className={styles.flexContainer}>
          <img id={styles.signUpIcon} src={signupIcon} alt="" />
          <button className={styles.signUpBtn}>Sign Up</button>
        </div>
      </Link>
    </div>
  );
};

export default SignUpBtn;
