import React, { useEffect } from "react";
import styles from './ProductGrid.module.css';
import { fetchProducts, productSearchResults } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../subComponents";

function ProductGrid() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    const products = useSelector(productSearchResults);
    const fetchStatus = useSelector(state => state.products.status);
    console.log(fetchStatus);

    return (
        <div className={styles.productsContainer}>
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
        </div>
    )
}

export default ProductGrid;