import styles from "../../../Styles/Navbar/Settings/DeleteAccBtn.module.css";
import deleteAccIcon from "@/assets/images/icons/delete_black.svg";
import useDeleteAcc from "@/hooks/useDeleteAcc";

const DeleteAccBtn = () => {
  const handleDeleteAccount = useDeleteAcc();

  return (
    <div>
      <div id={styles.flexContainer}>
        <img id={styles.deleteAccIcon} src={deleteAccIcon} alt="" />
        <button className={styles.deleteAccBtn} onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccBtn;
