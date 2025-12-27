import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import { useThemeContext } from "../../context";
import { Carousel, ProductCard } from "../../components";

import { selectProducts, fetchProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const { theme } = useThemeContext();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])



  const products = useSelector(selectProducts);
  const fetchStatus = useSelector(state => state.products.status);
  console.log(fetchStatus);
  const heroImagesSrc = [
    "./header-image-1.webp",
    "./header-image-2.webp",
    "./header-image-3.webp",
  ];
  return (
    <div data-theme={theme} className={styles.homePageContainer}>
      <section className={styles.heroSection}>
        <Carousel>
          {heroImagesSrc.map((imageSrc, index) => (
            <img src={imageSrc} key={index} alt="hero-image" />
          ))}
        </Carousel>
      </section>

      <section className={styles.productsSection}>
        <h2 className={styles.heading}>All Products</h2>
        {
          fetchStatus === 'loading' ? (

            <div className={styles.loaderContainer}>
              <div className={styles.loader}></div>
              <p className={styles.loadingText}>Loading Products...</p>
            </div>
          ) : (
            fetchStatus === 'failed' ? (
              <div className={styles.fetchError}>
                <p className={styles.errorMsg}>Failed to load product, please try again</p>
              </div>
            ) : (
              <div className={styles.productGrid}>
                {
                  products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))
                }
              </div>
            )

          )
        }
      </section >
    </div >
  );
}

export default HomePage;
