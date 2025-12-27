import React, { useEffect } from "react";
import styles from './ProductGrid.module.css';
import { fetchProducts, productSearchResults } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../subComponents";
import { getSearchTerm, getCategory } from "../../features/filters/filterSlice";

function ProductGrid() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

    const products = useSelector(productSearchResults);
    const fetchStatus = useSelector(state => state.products.status);
    const category = useSelector(getCategory);
    const searchTerm = useSelector(getSearchTerm);

    return (
        <div className={styles.productsContainer}>
            <h2 className={styles.heading}>
                {
                    searchTerm === '' ? (
                        'All Products ' + (category !== 'all' ? `in "${category}"` : '')
                    ) : (
                        `(${products.length}) Search Results For "${searchTerm}" ` + (category !== 'all' ? `in "${category}"` : '')
                    )
                }
            </h2>
            {
                products.length === 0 ? (
                    <div className={styles.empty}>
                        {
                            searchTerm === '' ? (
                                'No products founds ' + (category !== 'all' ? `in "${category}"` : '')
                            ) : (
                                `No products found for "${searchTerm}" ` + (category !== 'all' ? `in "${category}"` : '')
                            )
                        }
                    </div>
                ) :
                    (fetchStatus === 'loading' ? (

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

                    ))
            }
        </div>
    )
}

export default ProductGrid;