import styles from "../Styles/ShowPassword.module.css";

const ShowPassword = ({ showPassword, setShowPassword }) => {
  return (
    <>
      {showPassword ? (
        <img
          className={styles.showPasswordIcon}
          src="src/assets/images/icons/password_hidden_icon_colored_16px.svg"
          onClick={() => setShowPassword(false)}
          title="Hide Password"
        />
      ) : (
        <img
          className={styles.showPasswordIcon}
          src="src/assets/images/icons/password_shown_icon_colored_16px.svg"
          onClick={() => setShowPassword(true)}
          title="Show Password"
        />
      )}
    </>
  );
};

export default ShowPassword;
