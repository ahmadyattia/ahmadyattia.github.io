import React, { createContext, useEffect, useState } from "react";

const FetchData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();

      setData(data);
    };

    loadData();
  }, []);

  console.log(data);

  return <div>{data ? <img src={data[0].images[0]} alt="" /> : ""}</div>;
};

export default FetchData;
