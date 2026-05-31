import {
  equalTo,
  off,
  query,
  ref,
  onValue,
  orderByChild,
} from "firebase/database";
import styles from "@/styles/Orders.module.css";
import { db } from "@/server/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import Order from "@/components/Order";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
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

            // latest order first
            orderList.reverse();

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
      {/* {loading && (
        <p className={styles.loadingMessage}>loading your orders...</p>
      )} */}
      <div id={styles.ordersBox}>
        {loading && <p id={styles.loadingMessage}>Loading your orders...</p>}
        {error && (
          <p id={styles.errorMessage}>
            Error finding your orders. Error: {error}
          </p>
        )}
        {orders.map((order) => {
          return <Order key={order.orderId} order={order} />;
        })}
      </div>
    </div>
  );
};

export default Orders;
