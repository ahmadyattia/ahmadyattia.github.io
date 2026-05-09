import { useEffect } from "react";

function closeMenuOnClickOutside(setIsOpen, containerRef) {
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
}

export default closeMenuOnClickOutside;
