import SearchItem from "./SearchItem";
import useFilterSearchResults from "@/hooks/useFilterSearchResults";

interface SearchResultsProps {
  searchTerm: string;
}

const SearchResults = ({ searchTerm }: SearchResultsProps) => {
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
