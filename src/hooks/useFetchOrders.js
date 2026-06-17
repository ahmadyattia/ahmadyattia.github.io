// fetch orders from db

import { equalTo, query, ref, onValue, orderByChild } from "firebase/database";
import { db } from "@/server/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function useFetchOrders() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    setLoading(true);
    setError(null);

    if (!user) {
      setOrders([]);
      setLoading(false);
      return;
    }

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
          // no orders found for this user
          setOrders([]);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching user orders:", err);
        setError(err);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [user, authLoading]);

  return [orders, loading, error];
}
