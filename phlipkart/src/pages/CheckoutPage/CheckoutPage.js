import React, { useState } from "react";
import styles from './CheckoutPage.module.css';
import { useSelector } from 'react-redux';
import { getCartLength, selectCartItems } from "../../features/cart/cartSlice";
import { CustomerDetailForm } from '../../components'

function CheckoutPage() {

    const cartLength = useSelector(getCartLength);
    const cart = useSelector(selectCartItems);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        address1: '',
        address2: '',
        pincode: '',
        email: '',
        phone: '',
    })

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        country: '',
        address1: '',
        address2: '',
        pincode: '',
        email: '',
        phone: '',
    })

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })

        //setting error messages
        // email validation
        if (name === 'email') {
            const emialRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (!emialRegex.test(value)) {
                setError({
                    ...error,
                    email: 'please enter a valid email'
                })
            } else {
                setError({
                    ...error,
                    email: '',
                })
            }
        }

        if (name === 'phone') {
            const checkValue = value.replace(/\s+/g, "");
            if (checkValue.length !== 10) {
                setError({
                    ...error,
                    phone: 'please enter a valid phone number',
                })
            } else {
                setError({
                    ...error,
                    phone: '',
                })
            }
        }
    }

    return (
        <div className={styles.checkoutPageContainer}>
            <div className={styles.checkoutContainer}>
                <div className={styles.customerDetailForm}>
                    <CustomerDetailForm customerData={formData} errorState={error} changeCustomerData={handleChange} />
                </div>
            </div>
        </div>
    )
};


export default CheckoutPage;