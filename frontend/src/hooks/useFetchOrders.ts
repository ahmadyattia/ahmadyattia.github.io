// fetch orders from db

import { equalTo, query, ref, onValue, orderByChild } from "firebase/database";
import { db } from "@/server/firebase";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CartItem } from "@/context/CartContext";

export interface Order {
  date: string;
  items: CartItem[];
  orderId: string;
  shipping: {
    email: string;
    fullName: string;
    shippingMethod: string;
    city?: string;
    country?: string;
    state?: string;
    zipCode?: string;
  };
  total: string;
  userId: string;
}

type useFetchOrdersType = [
  orders: Order[],
  loading: boolean,
  error: Error | null
];

export default function useFetchOrders(): useFetchOrdersType {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
          const data: Record<string, Order> = snapshot.val();
          const orderList: Order[] = Object.keys(data).map((key) => {
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
