import { useEffect } from "react";

function useClickOutside(setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // If the clicked element is NOT inside our container, close the dropdown
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, setIsOpen]);
}

export default useClickOutside;
