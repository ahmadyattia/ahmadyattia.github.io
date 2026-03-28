import { createContext, useState, useEffect, useContext } from "react";
export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();

        // adding slug to each product
        data.products.forEach(
          (product) => (product.slug = slugify(product.title)),
        );

        setData(data);

        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, []);

  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-"); // Replace multiple - with single -
  }

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
