import SearchItem from "./SearchItem";
import useFilterSearchResults from "@/hooks/useFilterSearchResults";

const SearchResults = ({ searchTerm }) => {
  const results = useFilterSearchResults(searchTerm);

  return (
    <div>
      {results.map((item) => {
        return <SearchItem key={item.id} item={item} searchTerm={searchTerm} />;
      })}
    </div>
  );
};

export default SearchResults;
