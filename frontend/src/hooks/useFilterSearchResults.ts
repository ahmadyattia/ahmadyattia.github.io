// filter search results

import { useMemo } from "react";
import { useProductsData } from "@/context/ProductsContext";

export default function useFilterSearchResults(searchTerm: string) {
  const { data } = useProductsData();

  return useMemo(() => {
    if (!data) return [];

    if (!searchTerm.trim()) return [];

    return data.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);
}
