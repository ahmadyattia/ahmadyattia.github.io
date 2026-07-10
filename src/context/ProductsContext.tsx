import { createContext, useContext, useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import productsMapper from "../data/mappers/productsMapper";
import { MappedProduct } from "../data/mappers/productsMapper";
import { ReactNode } from "react";

interface ProductsContextType {
  data: MappedProduct[];
  isLoading: Boolean;
  error: Error | null;
}

export const ProductsContext = createContext<ProductsContextType | null>(null);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
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
    throw new Error("useProductsData must be used within a ProductsProvider");
  }

  return context;
}
