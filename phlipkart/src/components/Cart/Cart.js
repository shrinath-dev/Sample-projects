import React, { useState } from "react";
import styles from './Cart.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getCartLength, getCartVisibility } from "../../features/cart/cartSlice";

function Cart() {
    const showCart = useSelector(getCartVisibility);
    const cartLength = useSelector(getCartLength);

    if (!showCart) return;
    return (
        <div className={styles.cartContainer}>
            <div className={styles.cart}>
                <h2 className={styles.heading}>Your Cart ({cartLength + ` Item${cartLength > 1 ? 's' : ''}`})</h2>
            </div>
        </div>
    )
};

export default Cart;