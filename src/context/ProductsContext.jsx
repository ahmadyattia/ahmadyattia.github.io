import { createContext, useContext } from "react";
import { useProducts } from "../hooks/useProducts";
import productsMapper from "../data/mappers/productsMapper";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  let data = useProducts();

  data = productsMapper(data);

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
