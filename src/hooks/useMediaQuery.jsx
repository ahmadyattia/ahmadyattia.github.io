import { useState, useEffect } from "react";

// hook for listening to media query
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // set initial value
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // define listener
    const listener = () => setMatches(media.matches);

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query, matches]);

  return matches;
};

export default useMediaQuery;
