import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.css";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

function Carousel({ children, autoSlide = false }) {
  const [current, setCurrent] = useState(0);

  const next = () => {
    current === children.length - 1
      ? setCurrent(0)
      : setCurrent((prev) => prev + 1);
  };

  const prev = () => {
    current === 0
      ? setCurrent((prev) => children.length - 1)
      : setCurrent((prev) => prev - 1);
  };

  useEffect(() => {
    if (autoSlide === false) return;
    const interval = setInterval(function () {
      next();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <div className={styles.carouselContainer}>
      <div
        className={`${styles.slidesContainer}`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {children}
      </div>

      <div className={styles.btnsGrp}>
        <button
          onClick={prev}
          className={styles.leftBtn + ` ${styles.slideBtn}`}
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={next}
          className={styles.rightBtn + ` ${styles.slideBtn}`}
        >
          <FiChevronRight />
        </button>
      </div>

      <div className={styles.indicators}>
        {children.map((item, index) => (
          <div
            key={index}
            className={`${styles.indicator} ${current === index ? styles.active : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
