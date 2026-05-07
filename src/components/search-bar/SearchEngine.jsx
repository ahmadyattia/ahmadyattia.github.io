import React, { useEffect, useState, useRef } from "react";
import styles from "../../Styles/search-bar/SearchEngine.module.css";
import SearchResults from "./SearchResults";

const SearchEngine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const containerRef = useRef(null);

  // handle closing the search dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // If the clicked element is NOT inside our container, close the dropdown
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
