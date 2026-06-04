import { useContext, useEffect, useState } from "react";
import styles from "../../Styles/search-bar/SearchResults.module.css";
import SearchItem from "./SearchItem";
import { ProductsContext } from "../../context/ProductsContext";

const SearchResults = ({ searchTerm }) => {
  const { data } = useContext(ProductsContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (data) {
      setResults([
        ...data.filter((item) => {
          const title = item.title.toLowerCase();

          if (searchTerm === "") {
            return;
          }

          return title.includes(searchTerm.toLowerCase());
        }),
      ]);
    }
  }, [data, searchTerm]);

  return (
    <div>
      {results.map((item) => {
        return <SearchItem key={item.id} item={item} searchTerm={searchTerm} />;
      })}
    </div>
  );
};

export default SearchResults;
