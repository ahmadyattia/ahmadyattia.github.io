import React from "react";
import styles from "../../Styles/search-bar/SearchItem.module.css";
import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  const category = item.category;

  const itemId = item.id;

  return (
    <Link className={styles.searchItem} to={`/shop/${category}/${itemId}`}>
      {item.title}
    </Link>
  );
};

export default SearchItem;
