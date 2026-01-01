import React from "react";
import styles from './CartItem.module.css';
import { selectCartItemById } from "../../../features/cart/cartSlice";
import { selectProductsById } from "../../../features/products/productSlice";
import { useSelector, useStore } from "react-redux";


function CartItem({ itemId }) {
    const store = useStore();
    console.log(store.getState().cart)
    // const item = useSelector(selectCartItemById(store.getState().cart, itemId));
    // console.log(item);
    // const product = useSelector(selectProductsById);
    // console.log(product);

    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemAndQuantity}>
                {/* <div className={styles.itemInfo}>
                    <img className={styles.itemImage} src={product.image} alt='item-image' />
                    <p className={styles.itemName}>{product.title}</p>
                </div>
                <div className={styles.quantityContainer}>
                    <button className={styles.increaseBtn}>+</button>
                    {item.quantity}
                    <button className={styles.decreaseBtn}>-</button>
                </div>
                <div className={styles.itemPrice}>
                    <p>{product.price}</p>
                </div>
                <div className={styles.itemTotal}>
                    <p>{item.quantity * product.price}</p>
                </div> */}
            </div>
        </div>
    )
};


export default CartItem;