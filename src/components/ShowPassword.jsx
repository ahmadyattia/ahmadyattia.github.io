import styles from "../Styles/ShowPassword.module.css";
import passwordHiddenIcon from "@/assets/images/icons/password_hidden_icon_colored_16px.svg";
import passwordShownIcon from "@/assets/images/icons/password_shown_icon_colored_16px.svg";

const ShowPassword = ({ showPassword, setShowPassword }) => {
  return (
    <>
      {showPassword ? (
        <img
          className={styles.showPasswordIcon}
          src={passwordHiddenIcon}
          onClick={() => setShowPassword(false)}
          title="Hide Password"
        />
      ) : (
        <img
          className={styles.showPasswordIcon}
          src={passwordShownIcon}
          onClick={() => setShowPassword(true)}
          title="Show Password"
        />
      )}
    </>
  );
};

export default ShowPassword;
