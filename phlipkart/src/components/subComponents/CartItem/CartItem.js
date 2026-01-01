import React from "react";
import styles from './CartItem.module.css';
import { selectCartItemById, removeFromCart, increaseQuantity, decreaseQuantity } from "../../../features/cart/cartSlice";
import { selectProductsById } from "../../../features/products/productSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";


function CartItem({ itemId }) {
    const dispatch = useDispatch();
    const item = useSelector(state => selectCartItemById(state, itemId));
    const product = useSelector(state => selectProductsById(state, itemId));
    const handleIncrease = () => {
        dispatch(increaseQuantity({
            id: itemId, changes: {
                quantity: item.quantity + 1,
            }
        }))
    };

    const handleDecrease = () => {
        if (item.quantity === 1) {
            dispatch(removeFromCart(itemId));
            return;
        }
        else {
            dispatch(decreaseQuantity({
                id: itemId,
                changes: {
                    quantity: item.quantity - 1,
                }
            }))
        }
    }
    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemImage}>
                <img className={styles.image} src={product.image} alt='item-image' />
            </div>
            <div className={styles.itemAndQuantity}>
                <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{product.title}</p>
                </div>
                <div className={styles.quantityContainer}>
                    <AiFillMinusCircle onClick={handleDecrease} className={styles.decreaseBtn} />
                    {item.quantity}
                    <IoMdAddCircle onClick={handleIncrease} className={styles.increaseBtn} />
                </div>
            </div>
            <div className={styles.itemPrice}>
                <p>${product.price}</p>
            </div>
            <div className={styles.itemTotal}>
                <p>${(item.quantity * product.price).toFixed(2)}</p>
            </div>
        </div>
    )
};


export default CartItem;