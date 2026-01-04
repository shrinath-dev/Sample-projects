import React, { useState } from "react";
import styles from './CheckoutPage.module.css';
import { CustomerDetailForm, OrderSummary } from '../../components'
import { useThemeContext } from "../../context";


function CheckoutPage() {

    const { theme } = useThemeContext();


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
        country: '',
        address1: '',
        pincode: '',
        email: '',
        phone: '',
    })

    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })

        if (name !== 'lastName' && name !== 'address2' && name !== 'email' && name !== 'phone') {
            if (value.length > 1) {
                setError({
                    ...error,
                    [name]: '',
                })
            }
        }
        //setting error messages
        // email validation
        if (name === 'email') {
            const emialRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (!emialRegex.test(value)) {
                setError({
                    ...error,
                    email: 'Please Enter a Valid Email Address'
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
                    phone: 'Please Enter a Valid Phone Number',
                })
            } else {
                setError({
                    ...error,
                    phone: '',
                })
            }
        }
    }

    const handleError = (name, value) => {
        setError(err => ({
            ...err,
            [name]: value,
        }))
    }

    const resetAll = () => {
        setError(err => ({
            ...err,
            firstName: '',
            country: '',
            address1: '',
            pincode: '',
            email: '',
            phone: '',
        }));

        setFormData(data => ({
            ...data,
            firstName: '',
            lastName: '',
            country: '',
            address1: '',
            address2: '',
            pincode: '',
            email: '',
            phone: '',
        }))
    }

    return (
        <div data-theme={theme} className={styles.checkoutPageContainer}>
            <div className={styles.checkoutContainer}>
                <div className={styles.customerDetailForm}>
                    <CustomerDetailForm customerData={formData} errorState={error} changeCustomerData={handleChange} />
                </div>

                <div className={styles.summaryContainer}>
                    <OrderSummary data={formData} errors={error} changeErrror={handleError} reset={resetAll} />
                </div>
            </div>
        </div>
    )
};


export default CheckoutPage;