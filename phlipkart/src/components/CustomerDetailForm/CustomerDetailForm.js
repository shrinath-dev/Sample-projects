import React, { useState } from "react";
import styles from './CustomerDetailForm.module.css';

function CustomerDetailForm({ customerData, errorState, changeCustomerData }) {

    const [checked, setChecked] = useState(true);
    return (
        <div className={styles.formContainer}>
            <form id='customer-detail' name='customer-detail'>
                <div className={styles.formGroup}>
                    <div className={styles.formGroup}>
                        <label htmlFor='firstName' >First Name*</label>
                        <input
                            type='text'
                            name='firstName'
                            value={customerData.firstName}
                            onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor='lastName' >Last Name (optional)</label>
                        <input
                            type='text'
                            name='lastName'
                            value={customerData.lastName}
                            onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='country'>Country*</label>
                    <input
                        type='text'
                        name='country'
                        value={customerData.country}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='address1' >Addrese Line 1*</label>
                    <input
                        type='text'
                        name='address1'
                        value={customerData.address1}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='address2' >Addrese Line 2(optional)</label>
                    <input
                        type='text'
                        name='address2'
                        value={customerData.address2}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='pincode' >Postcode*</label>
                    <input
                        type='text'
                        name='postcode'
                        value={customerData.postcode}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='phone' >Phone*</label>
                    <input
                        type='text'
                        name='phone'
                        value={customerData.phone}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                    {
                        (errorState.phone !== '') && <div className={styles.error}>{errorState.phone}</div>
                    }
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor='email' >Email Address*</label>
                    <input
                        type='email'
                        name='email'
                        value={customerData.email}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                    {
                        (errorState.email !== '') && <div className={styles.error}>{errorState.email}</div>
                    }
                </div>

                <div className={styles.formGroup}>
                    <input
                        type='checkbox'
                        name='marketing'
                        checked={checked}
                        onChange={() => setChecked(prev => !prev)}
                        value='choosen'
                    />
                    <label htmlFor='marketing'>Sign me up for email updates and news(optional).</label>
                </div>
            </form>
        </div>
    )
}

export default CustomerDetailForm;