import React from "react";
import styles from './ProductCard.module.css';
import { FiStar, FiShoppingCart } from "react-icons/fi";


function ProductCard({ product }) {

    return (
        <div className={styles.productCardContainer}>
            <div className={styles.pImageContianer}>
                <img className={styles.pImage} src={product.image} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
                <p className={styles.pTitle}>{product.title}</p>
                <div className={styles.pRatingContianer}>
                    <div className={styles.rating}>
                        <FiStar className={styles.starIcon} />
                        <span className={styles.ratingValue}>{product.rating.rate}</span>
                    </div>
                    <span className={styles.ratingCount}>({product.rating.count})</span>
                </div>
                <p className={styles.pDescription}>
                    {product.description}
                </p>
                <div className={styles.cardFooter}>
                    <p className={styles.pPrice}>$ {product.price}</p>
                    <div className={styles.paddToCart}>
                        <button className={styles.addToCartBtn}>
                            <p>Add to cart</p>
                            <FiShoppingCart className={styles.cartIcon} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
};


export default ProductCard;