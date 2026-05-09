import React, { useState, useRef } from "react";
import styles from "../../Styles/search-bar/SearchEngine.module.css";
import SearchResults from "./SearchResults";
import closeMenuOnClickOutside from "@/utils/closeMenuOnClickOutside";

const SearchEngine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  closeMenuOnClickOutside(setIsOpen, containerRef);

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div id={styles.searchBar} ref={containerRef}>
      <input
        id={styles.searchInput}
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        value={searchTerm}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div id={`${styles.searchDropdown}`}>
          <SearchResults searchTerm={searchTerm} />
        </div>
      )}
    </div>
  );
};

export default SearchEngine;
