import React, { useState } from "react";
import styles from './SearchProduct.module.css';
import { setSearchTerm } from "../../features/filters/filterSlice";
import { useDispatch } from "react-redux";

function SearchProduct() {

    const [term, setTerm] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setTerm(e.target.value);
        dispatch(setSearchTerm(e.target.value));
    }

    return (
        <div className={styles.searchContainer} >
            <input
                type='text'
                autoComplete="off"
                className={styles.searchBox}
                value={term}
                onChange={(e) => handleChange(e)}
                id='search'
                placeholder='Search Products...'
            />
        </div>
    )
}

export default SearchProduct;