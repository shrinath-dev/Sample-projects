import React from "react";
import styles from "./HomePage.module.css";
import { useThemeContext } from "../../context";
import { Carousel, FilterByCategory, SearchProduct, ProductGrid } from "../../components";

function HomePage() {
  const { theme } = useThemeContext();

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

      <section className={styles.searchSection}>
        <SearchProduct />
      </section>

      <section className={styles.filterSection}>
        <FilterByCategory />
      </section>

      <section className={styles.productsSection}>
        <ProductGrid />
      </section >
    </div >
  );
}

export default HomePage;
