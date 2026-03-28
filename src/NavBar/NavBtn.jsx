// import styles from "./NavBar.module.css";

export default function NavBtn({ title, onClickAction, id }) {
  return (
    <>
      <button onClick={onClickAction} id={id}>
        {title}
      </button>
    </>
  );
}
