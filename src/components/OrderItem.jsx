import styles from "../Styles/OrderItem.module.css";
import { Link } from "react-router-dom";
import slugify from "../utils/slugify";

const OrderItem = ({ item }) => {
  const itemLocation = `/shop/${slugify(item.category)}/${item.id}/${item.slug}`;
  let discount = null;

  if (item.discountPercentage > 0) {
    discount = (
      item.price -
      item.price * (item.discountPercentage / 100)
    ).toFixed(2);
  }

  return (
    <div className={styles.mainBox}>
      <img className={styles.img} src={item.img} alt="" />
      <div className={styles.title}>{item.title}</div>
      {discount ? (
        <div className={styles.price}>
          <span className={styles.oldPrice}>${item.price}</span>{" "}
          <span className={styles.newPrice}>${discount}</span>
        </div>
      ) : (
        <div className={styles.price}>${item.price}</div>
      )}
      <div className={styles.quantity}>Qty: {item.quantity}</div>
      <div className={styles.viewLinkBox}>
        <Link to={itemLocation} className={styles.viewLink}>
          View
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
