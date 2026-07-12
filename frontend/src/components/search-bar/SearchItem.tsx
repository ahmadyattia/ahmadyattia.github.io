import React, { useMemo } from "react";
import styles from "@/styles/search-bar/SearchItem.module.css";
import { Link } from "react-router-dom";
import { highlightSearchTerm } from "@/utils/highlightSearchTerm";
import { MappedProduct } from "@/data/mappers/productsMapper";

interface SearchItemProps {
  item: MappedProduct;
  searchTerm: string;
}

const SearchItem = ({ item, searchTerm }: SearchItemProps) => {
  // useMemo prevents re-splitting the string unless the item or query changes
  const parts = useMemo(() => {
    return highlightSearchTerm(item.title, searchTerm);
  }, [item.title, searchTerm]);

  return (
    <Link
      className={styles.searchItem}
      to={`/shop/${item.category}/${item.id}/${item.slug}`}
      aria-label={`Result: ${item.title}`}
    >
      {/* aria-hidden hides the fragmented text blocks from screen readers */}
      <span aria-hidden="true">
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <mark key={`${part}-${index}`}>{part}</mark>
          ) : (
            <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>
          ),
        )}
      </span>
    </Link>
  );
};

export default SearchItem;
