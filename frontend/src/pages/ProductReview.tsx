import { useNavigate, useParams } from "react-router-dom";
import styles from "@/styles/ProductReview.module.css";
import { useMemo, useState } from "react";
import AddToCartBtn from "@/components/Cart/AddToCartBtn";
import { useProductsData } from "@/context/ProductsContext";
import backArrowIcon from "@/assets/images/icons/backward_arrow_white_16px.svg";

const ProductReview = () => {
  const { productId } = useParams();
  const { data, isLoading, error } = useProductsData();
  const navigate = useNavigate();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = useMemo(() => {
    if (!data) return null;
    return data.find((item) => String(item.id) === String(productId));
  }, [data, productId]);

  if (!product) return <p style={{ color: "white" }}>Product not found...</p>;

  const mainImage = product?.images?.[selectedImageIndex] || undefined;

  const discount = product?.discountPercentage || 0;

  const priceAfterDiscount =
    discount > 0
      ? (product.price - product.price * (discount / 100)).toFixed(2)
      : null;

  if (isLoading) return <p style={{ color: "white" }}>Loading...</p>;

  if (error)
    return <p style={{ color: "white" }}>Problem fetching the data...</p>;

  return (
    <>
      <div id={styles.flexbox}>
        <div className={styles.product}>
          <div className={styles.images}>
            <div className={styles.allSmallImages}>
              {product.images?.map((image, index) => {
                const isSelected = index === selectedImageIndex;

                return (
                  <div className={styles.smallImgDiv} key={index}>
                    <img
                      className={styles.smallImages}
                      src={image}
                      key={index}
                      alt={`${product.title} gallery thumbnail ${index + 1}`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                    <div
                      className={isSelected ? styles.selectedImgOverlay : ""}
                    ></div>
                  </div>
                );
              })}
            </div>

            <img
              className={styles.mainImageStyle}
              src={mainImage}
              alt={product.title}
            />
          </div>

          <div className={styles.details}>
            <div className={styles.backBtnFlex}>
              <button
                type="button"
                className={styles.backLink}
                onClick={() => navigate(-1)}
              >
                <div className={styles.backBtnContentFlex}>
                  <img
                    className={styles.arrowIcon}
                    src={backArrowIcon}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className={styles.backText}>Back</span>
                </div>
              </button>
            </div>

            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.description}>{product.description}</p>
            <div className={styles.checkout}>
              <div className={styles.price}>
                <p className={styles.priceLabel}>Price</p>
                {discount > 0 ? (
                  <p className={styles.amount}>
                    <span className={styles.oldAmount}>${product.price}</span>{" "}
                    <span className={styles.newAmount}>
                      ${priceAfterDiscount}
                    </span>
                  </p>
                ) : (
                  <p className={styles.amount}>${product.price}</p>
                )}
              </div>
              <AddToCartBtn product={product} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReview;
