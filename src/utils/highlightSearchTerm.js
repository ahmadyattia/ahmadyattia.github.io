export function highlightSearchTerm(text, searchTerm) {
  // Split text by the search term, keeping case-insensitivity in mind
  const regex = new RegExp(`(${searchTerm})`, "gi");

  const parts = text.split(regex);

  return parts;
}
