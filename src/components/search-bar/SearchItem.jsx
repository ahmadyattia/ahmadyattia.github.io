import React from "react";
import styles from "../../Styles/search-bar/SearchItem.module.css";
import { Link } from "react-router-dom";
import { highlightSearchTerm } from "@/utils/highlightSearchTerm";

const SearchItem = ({ item, searchTerm }) => {
  const parts = highlightSearchTerm(item.title, searchTerm);

  return (
    <Link
      className={styles.searchItem}
      to={`/shop/${item.category}/${item.id}/${item.slug}`}
    >
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <mark key={index}>{part}</mark>
        ) : (
          part
        ),
      )}
    </Link>
  );
};

export default SearchItem;
