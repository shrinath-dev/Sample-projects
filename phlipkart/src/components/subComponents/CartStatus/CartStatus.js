import React from "react";
import styles from './CartStatus.module.css';
import { useDispatch, useSelector } from 'react-redux'

function CartStatus() {

    const cartValue = useSelector((state) => (state.cart.cartLength));
    const dispatch = useDispatch();
    return (
        <div className={styles.cartStatusContainer} >
            <img src='./cart-icon.svg' alt='cart' />
            <p>{cartValue}</p>
        </div>
    );


}

export default CartStatus;