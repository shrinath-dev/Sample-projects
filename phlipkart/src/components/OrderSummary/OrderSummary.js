import React, { useMemo, useState } from "react";
import styles from './OrderSummary.module.css';
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, clearCart } from "../../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { OrderItem, PaymentMethod } from "../subComponents";

function OrderSummary({ data, errors, changeErrror, reset }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false)
    const cart = useSelector(selectCartItems);
    const cartTotal = useMemo(() => {
        return cart.reduce((total, item) => { return (total + (item.quantity * item.price)) }, 0)
    }, [cart]);

    const showButton = (data.firstName === '' ||
        data.country === '' ||
        data.address1 === '' ||
        data.pincode === '' ||
        data.phone === '' ||
        data.email === '');

    const validateForm = () => {
        let isError = false;
        for (const [key, value] of Object.entries(data)) {
            if (value === '') {
                if (key !== 'lastName' && key !== 'address2') {
                    changeErrror(key, `This a  Mandatory Field.`);
                    isError = true;
                }
            } else {
                if (key !== 'lastName' && key !== 'address2') {
                    changeErrror(key, '');
                }
            }
        }

        return isError;
    }

    const handleSubmit = () => {
        // do form validation then set error then submit
        setSubmitting(true);
        const isError = validateForm();
        if (isError) {
            const errorElement = document.getElementById('customer-detail');
            errorElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
            return;
        }

        setTimeout(() => {
            reset();

            dispatch(clearCart());
            setSubmitting(false)
            alert('Your Order Placed Successfully.')
            navigate('/');
        }, 2000);
    };

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
                <div className={styles.shippingMethod}>
                    <span className={styles.shippingLabel}>Shipping Address </span>

                    {
                        data.pincode === '' ? '' : (
                            <span className={styles.shippingType}>
                                Free Shipping
                            </span>

                        )

                    }
                </div>

                {
                    (data.address1 === '' && data.address2 === '') ? (
                        <p className={styles.noAddress}>Please provide address to view shipping options.</p>
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
                                    data.pincode && data.pincode
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

            <div className={styles.payment}>
                <PaymentMethod />
            </div>

            <div className={styles.contactInfo}>
                <p className={styles.contactHeading}>Contact Info</p>
                <div className={styles.info}>
                    <p className={styles.infoElement}>
                        <span className={styles.infoAnchor}>Receiver's Name: </span>
                        {
                            (data.firstName === '' ? '' : data.firstName) + ' ' +
                            (data.lastName === '' ? '' : data.lastName)
                        }
                        {
                            (data.firstName === '' && data.lastName === '') ? 'n/a' : ''
                        }
                    </p>
                    <p className={styles.infoElement}>
                        <span className={styles.infoAnchor}>Receiver's Phone: </span>
                        {
                            (data.phone === '' ? 'n/a' : data.phone)
                        }
                    </p>
                    <p className={styles.infoElement}>
                        <span className={styles.infoAnchor}>Receiver's Email: </span>
                        {
                            (data.email === '' ? 'n/a' : data.email)
                        }
                    </p>

                </div>
            </div>

            <div className={styles.submit}>

                <button disabled={showButton || submitting || cart.length === 0} onClick={handleSubmit} className={`${styles.submitBtn}`}>
                    {
                        submitting ? 'Placing Order...' : 'Place Order'
                    }
                </button>
            </div>



        </div>
    )
};


export default OrderSummary;