import React, { useMemo } from "react";
import styles from './Cart.module.css';
import { useSelector, useDispatch } from "react-redux";
import { getCartLength, getCartVisibility, selectCartItems, setCartVisibility, clearCart } from "../../features/cart/cartSlice";
import { CartItem } from "../subComponents";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";



function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showCart = useSelector(getCartVisibility);
    const cartLength = useSelector(getCartLength);
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => { return (total + (item.quantity * item.price)) }, 0)
    }, [cartItems]);

    const handleNavigation = () => {
        dispatch(setCartVisibility());
        navigate('/checkout');
    }
    if (!showCart) return;
    return (
        <div className={styles.cartContainer}>
            <div className={styles.cart}>
                <h2 className={styles.heading}>Your Cart ({cartLength + ` Item${cartLength > 1 ? 's' : ''}`})</h2>

                <div className={styles.cartGrid}>
                    <div className={styles.gridHeader}>
                        <p className={styles.item}>Item</p>
                        <p className={styles.price}>Price</p>
                        <p className={styles.total}>Total</p>
                    </div>

                    {
                        cartItems.length === 0 ? (
                            <div className={styles.empty}> Your cart is empty</div>
                        ) : (

                            cartItems.map((item) => (
                                <CartItem key={item.id} itemId={item.id} />
                            ))

                        )
                    }

                </div>

                <div className={styles.summary}>
                    <button disabled={cartItems.length === 0 ? true : false} onClick={() => dispatch(clearCart())} className={styles.clearBtn}>Clear Cart</button>
                    <div className={styles.total}>
                        <p className={styles.grandTotal}>Grand Total:</p>
                        <p className={styles.totalValue}>${cartTotal.toFixed(2)}</p>
                    </div>
                </div>

                <button disabled={cartItems.length === 0 ? true : false} onClick={handleNavigation} className={styles.checkoutBtn}>
                    Checkout
                    <FaArrowRightLong />
                </button>
            </div>
        </div>
    )
};

export default Cart;