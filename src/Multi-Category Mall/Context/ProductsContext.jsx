import { createContext, useState, useEffect, useContext } from "react";
import { useProducts } from "../hooks/useProducts";
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const data = useProducts();

  return (
    <ProductsContext.Provider value={{ data }}>
      {children}
    </ProductsContext.Provider>
  );
};

export function useProductsData() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("There is no context");
  }

  return context;
}
