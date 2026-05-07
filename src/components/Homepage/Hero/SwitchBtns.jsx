import styles from "../../../Styles/Homepage/Hero/SwitchBtns.module.css";

const SwitchBtns = ({ switchFn }) => {
  return (
    <div className={styles.switchBtns}>
      <button onClick={() => switchFn("previous")}>
        <div className={styles.heroArrowIconCentering}>
          <img src="src/assets/images/icons/arrow_left_32px_black.svg" alt="" />
        </div>
      </button>
      <button onClick={() => switchFn("next")}>
        <div className={styles.heroArrowIconCentering}>
          <img
            src="src/assets/images/icons/arrow_right_32px_black.svg"
            alt=""
          />
        </div>
      </button>
    </div>
  );
};

export default SwitchBtns;
