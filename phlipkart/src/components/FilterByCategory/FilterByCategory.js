import React from "react";
import styles from './FilterByCategory.module.css';
import { getCategories } from "../../features/products/productSlice";
import { setCategory, getCategory } from "../../features/filters/filterSlice";
import { useDispatch, useSelector } from 'react-redux'


function FilterByCategory({ category }) {
    const dispatch = useDispatch();

    const currentCategory = useSelector(getCategory);
    const allCategory = useSelector(getCategories);
    const categories = ['all', ...new Set(allCategory)]

    if (!categories.length > 0) return;
    return (
        <div className={styles.filterContainer}>
            <h2 className={styles.sectionHeading}>Filter By Category : </h2>
            <div className={styles.categoryContainer}>
                {
                    categories.map((category) => (
                        <div onClick={() => dispatch(setCategory(category))} key={category} className={`${styles.categoryItem} ${currentCategory === category ? styles.active : ''}`}>
                            <p  >{category}</p>
                        </div>

                    ))
                }
            </div>
        </div>
    )
}

export default FilterByCategory;