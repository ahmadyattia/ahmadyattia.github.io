import styles from "@/Styles/Navbar/Settings/DeleteAccBtn.module.css";
import deleteAccIcon from "@/assets/images/icons/delete_black.svg";
import useDeleteAcc from "@/hooks/useDeleteAcc";

const DeleteAccBtn = () => {
  const handleDeleteAccount = useDeleteAcc();

  return (
    <button className={styles.flexContainer} onClick={handleDeleteAccount}>
      <img
        className={styles.deleteAccIcon}
        src={deleteAccIcon}
        alt=""
        aria-hidden="true"
      />
      <span>Delete Account</span>
    </button>
  );
};

export default DeleteAccBtn;
