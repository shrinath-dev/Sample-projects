import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import { useThemeContext } from "../../context";
import { Carousel } from "../../components";

import { selectProducts, fetchProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const { theme } = useThemeContext();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [])

  const products = useSelector(selectProducts);
  const dispatch = useDispatch();
  console.log(products);

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
        <h2>All Products</h2>
        {
          products.map(product => (
            <div key={product.id}>
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <img src={product.image} alt='product-image' />
              <p>{product.category}</p>
              <p>{product.description}</p>
            </div>
          ))
        }
      </section>
    </div>
  );
}

export default HomePage;
