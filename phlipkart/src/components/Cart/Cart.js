import React, { useState } from "react";
import styles from './Cart.module.css';
import { useDispatch, useSelector } from "react-redux";
import { getCartLength, getCartVisibility, selectCartItems } from "../../features/cart/cartSlice";
import { CartItem } from "../subComponents";

function Cart() {
    const showCart = useSelector(getCartVisibility);
    const cartLength = useSelector(getCartLength);
    const cartItems = useSelector(selectCartItems);

    if (!showCart) return;
    return (
        <div className={styles.cartContainer}>
            <div className={styles.cart}>
                <h2 className={styles.heading}>Your Cart ({cartLength + ` Item${cartLength > 1 ? 's' : ''}`})</h2>

                <div className={styles.cartGrid}>
                    {
                        cartItems.map((item) => (
                            <CartItem key={item.id} itemId={item.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default Cart;