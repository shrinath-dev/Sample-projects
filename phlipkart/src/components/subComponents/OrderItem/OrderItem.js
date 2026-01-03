import React from "react";
import styles from './OrderItem.module.css';
import { useSelector } from "react-redux";
import { selectProductsById } from "../../../features/products/productSlice";


function OrderItem({ item }) {

    const product = useSelector(state => selectProductsById(state, item.id))

    return (
        <div className={styles.orderItem}>
            <div className={styles.itemName}>
                <span className={styles.productName}>{product.title}</span><span> x </span><span className={styles.quantity}>{item.quantity}</span>
            </div>
            <span className={styles.price}>{(item.price * item.quantity).toFixed(2)}$</span>
        </div>
    )
};

export default OrderItem;