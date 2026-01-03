import React, { useMemo } from "react";
import styles from './OrderSummary.module.css';
import { useSelector } from "react-redux";
import { selectCartItems } from "../../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { OrderItem } from "../subComponents";
function OrderSummary({ data }) {

    const cart = useSelector(selectCartItems);
    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => { return (total + (item.quantity * item.price)) }, 0)
    }, [cart]);


    return (
        <div className={styles.orderSummaryContainer}>
            <h2 className={styles.heading}>
                Your Order Summary
            </h2>

            <div className={styles.cartSummary}>
                {
                    cart.length === 0 ? (
                        <div className={styles.empty}>
                            <p>You have no products in your cart.</p>
                            <Link className={styles.link} to='/'>Browse Shop</Link>
                        </div>
                    ) : (

                        cart.map((item) => (
                            <OrderItem key={item.id} item={item} />
                        ))
                    )
                }
            </div>

            <div className={styles.cartTotal}>
                <p>SubTotal</p>
                <p>{cartTotal.toFixed(2)}$</p>
            </div>

            <div className={styles.shipping}>
                <p className={styles.shippingLabel}>Shipping Address :</p>

                {
                    (data.address1 === '' && data.address2 === '') ? (
                        <p className={styles.noAddress}>Please provide address.</p>
                    ) : (
                        <div className={styles.address} >
                            <p>
                                {
                                    data.address1 && data.address1
                                }
                            </p>
                            <p>
                                {
                                    data.address2 && data.address2
                                }
                            </p>
                            <p>
                                {
                                    data.postcode && data.postcode
                                }
                            </p>
                            <p>
                                {
                                    data.country && data.country
                                }
                            </p>
                        </div>

                    )
                }

            </div>

        </div>
    )
};


export default OrderSummary;