// fetch products from mock data source

import { useEffect, useState } from "react";

export const fetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();

      setData(data);
    };

    loadData();
  }, []);

  return data;
};
