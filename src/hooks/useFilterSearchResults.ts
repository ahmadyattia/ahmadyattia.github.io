// filter search results

import { useContext, useMemo } from "react";
import { ProductsContext } from "@/context/ProductsContext";

export default function useFilterSearchResults(searchTerm: string) {
  const { data } = useContext(ProductsContext);

  return useMemo(() => {
    if (!data) return [];

    if (!searchTerm.trim()) return [];

    return data.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);
}
