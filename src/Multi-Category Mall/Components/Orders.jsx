import {
  equalTo,
  off,
  query,
  ref,
  onValue,
  orderByChild,
} from "firebase/database";
import styles from "../Styles/Orders.module.css";
import { db } from "../server/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch orders from db
  useEffect(() => {
    if (user) {
      const ordersRef = ref(db, "/orders");
      const userOrdersQuery = query(
        ordersRef,
        orderByChild("userId"),
        equalTo(user.uid),
      );

      const unsubscribe = onValue(
        userOrdersQuery,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const orderList = Object.keys(data).map((key) => {
              return { id: key, ...data[key] };
            });
            setOrders(orderList);
          } else {
            setOrders([]); // no orders found for this user
          }
          setLoading(false);
        },
        (err) => {
          console.error("Error fetching useer orders:", err);
          setError(err);
          setLoading(false);
        },
      );

      return () => {
        off(userOrdersQuery, "value", unsubscribe);
      };
    }
  }, [user]);

  console.log("orders:", orders);

  return (
    <div id={styles.mainBox}>
      <div id={styles.ordersBox}>
        {loading && <p>Loading orders...</p>}
        {error && <p>Error finding your orders. Error: ${error}</p>}
      </div>
    </div>
  );
};

export default Orders;
