import styles from "../Styles/ShowPassword.module.css";
import passwordHiddenIcon from "@/assets/images/icons/password_hidden_icon_colored_16px.svg";
import passwordShownIcon from "@/assets/images/icons/password_shown_icon_colored_16px.svg";

interface ShowPasswordProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowPassword = ({ showPassword, setShowPassword }: ShowPasswordProps) => {
  return (
    <>
      {showPassword ? (
        <img
          className={styles.showPasswordIcon}
          src={passwordHiddenIcon}
          onClick={() => setShowPassword(false)}
          title="Hide Password"
          alt="Hide Password"
        />
      ) : (
        <img
          className={styles.showPasswordIcon}
          src={passwordShownIcon}
          onClick={() => setShowPassword(true)}
          title="Show Password"
          alt="Show Password"
        />
      )}
    </>
  );
};

export default ShowPassword;
