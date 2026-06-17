import { createContext, useContext, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import productsMapper from "../data/mappers/productsMapper";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  let [products, isLoading, error] = useProducts();

  const data = useMemo(() => {
    if (!products) return [];
    return productsMapper(products);
  }, [products]);

  return (
    <ProductsContext.Provider value={{ data, isLoading, error }}>
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
