import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "../Styles/ProductsPagination.module.css";

const ProductsPagination = ({ productsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();

  // six products per page
  let pagesCount = Math.ceil(productsCount / 6);

  // turn the count into an array
  // example: pagesCount = 4 -> countArr = [1, 2, 3, 4]
  function countToArray() {
    let countArr = [];
    let i = pagesCount;

    while (i > 0) {
      countArr.push(i);
      i--;
    }

    countArr = countArr.reverse();

    return countArr;
  }

  let countArray = countToArray();

  // jump to top of the page on link press
  const jumpToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className={styles.pagination}>
      {countArray.map((num) => {
        const params = new URLSearchParams(searchParams);

        // if it's the current page (for styling purposes)
        if (params.get("page") == num) {
          return (
            <Link
              className={styles.currentLink}
              to={`/shop/${category}?${params}`}
              key={num}
            >
              {num}
            </Link>
          );
        }

        params.set("page", num);
        params.toString();

        return (
          <Link
            className={styles.link}
            to={`/shop/${category}?${params}`}
            key={num}
            onClick={jumpToTop}
          >
            {num}
          </Link>
        );
      })}
    </nav>
  );
};

export default ProductsPagination;
