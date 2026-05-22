import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/ProductReview.module.css";
import { useContext, useEffect, useState } from "react";
import AddToCartBtn from "@/components/Cart/AddToCartBtn";
import { ProductsContext } from "../context/ProductsContext";
import backArrowIcon from "@/assets/images/icons/backward_arrow_white_16px.svg";

const ProductReview = () => {
  const { productId } = useParams();
  const { data } = useContext(ProductsContext);
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [product, setProduct] = useState(null);
  let selectedImgOverlay;
  let discountedPrice;
  let discount;

  useEffect(() => {
    if (data) {
      setProduct(data.filter((item) => item.id == productId)[0]);
    }
  }, [data]);

  useEffect(() => {
    if (product) {
      setMainImage(product.images[0]);
    }
  }, [product]);

  // computing the discounted price
  if (product) {
    discount = product.discountPercentage;
    discountedPrice = (
      product.price -
      product.price * (discount / 100)
    ).toFixed(2);
  }

  const switchImage = (index) => {
    setMainImage(product.images[index]);
  };

  return (
    <>
      {product ? (
        <div id={styles.flexbox}>
          <div className={styles.product}>
            <div className={styles.images}>
              <div className={styles.allSmallImages}>
                {product.images.map((image, index) => {
                  if (image === mainImage) {
                    selectedImgOverlay = styles.selectedImgOverlay;
                  } else {
                    selectedImgOverlay = "";
                  }
                  return (
                    <div className={styles.smallImgDiv} key={index}>
                      <img
                        className={styles.smallImages}
                        src={image}
                        key={index}
                        onClick={() => switchImage(index)}
                      />
                      <div id={selectedImgOverlay}></div>
                    </div>
                  );
                })}
              </div>
              <img
                className={styles.mainImageStyle}
                src={mainImage}
                alt={product.description}
              />
            </div>
            <div className={styles.details}>
              <div className={styles.backBtnFlex}>
                <button
                  className={styles.backLink}
                  onClick={() => navigate(-1)}
                >
                  <div className={styles.backBtnContentFlex}>
                    <img className={styles.arrowIcon} src={backArrowIcon} />
                    <p className={styles.backP}>Back</p>
                  </div>
                </button>
              </div>
              <h2 className={styles.title}>{product.title}</h2>
              <p className={styles.category}>{product.category}</p>{" "}
              <p className={styles.description}>{product.description}</p>
              <div className={`${styles.checkout}`}>
                <div className={`${styles.price}`}>
                  <p className={styles.priceLabel}>Price</p>
                  {discount ? (
                    <p className={styles.amount}>
                      <span className={styles.oldAmount}>${product.price}</span>{" "}
                      <span className={styles.newAmount}>
                        ${discountedPrice}
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
      ) : (
        <h2 style={{ color: "white" }}>Problem fetching the data</h2>
      )}
    </>
  );
};

export default ProductReview;
