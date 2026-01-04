import React, { useState } from "react";
import styles from './CustomerDetailForm.module.css';

function CustomerDetailForm({ customerData, errorState, changeCustomerData }) {

    const [checked, setChecked] = useState(true);
    return (
        <div className={styles.formContainer}>
            <form id='customer-detail' className={styles.customerDetail} name='customer-detail'>
                <div className={styles.nameGroup}>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor='firstName' >First Name*</label>
                        <input
                            type='text'
                            name='firstName'
                            value={customerData.firstName}
                            onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                        />

                        {
                            (errorState.firstName !== '') && <div id='firstName-error' className={styles.error}>{errorState.firstName}</div>
                        }
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label} htmlFor='lastName' >Last Name (optional)</label>
                        <input
                            type='text'
                            name='lastName'
                            value={customerData.lastName}
                            onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='country'>Country*</label>
                    <input
                        type='text'
                        name='country'
                        value={customerData.country}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                    {
                        (errorState.country !== '') && <div id='country-error' className={styles.error}>{errorState.country}</div>
                    }
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='address1' >Addrese Line 1*</label>
                    <input
                        type='text'
                        name='address1'
                        value={customerData.address1}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                    {
                        (errorState.address1 !== '') && <div id='address1-error' className={styles.error}>{errorState.address1}</div>
                    }
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='address2' >Addrese Line 2(optional)</label>
                    <input
                        type='text'
                        name='address2'
                        value={customerData.address2}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='pincode' >Postcode*</label>
                    <input
                        type='text'
                        name='pincode'
                        value={customerData.pincode}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                    {
                        (errorState.pincode !== '') && <div id="pincode-error" className={styles.error}>{errorState.pincode}</div>
                    }
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='phone' >Phone*</label>
                    <input
                        type='text'
                        name='phone'
                        value={customerData.phone}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                    {
                        (errorState.phone !== '') && <div id='phone-error' className={styles.error}>{errorState.phone}</div>
                    }
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='email' >Email Address*</label>
                    <input
                        type='email'
                        name='email'
                        value={customerData.email}
                        onChange={(e) => changeCustomerData(e.target.name, e.target.value)}
                    />
                    {
                        (errorState.email !== '') && <div id='email-error' className={styles.error}>{errorState.email}</div>
                    }
                </div>

                <div className={styles.checkbox}>
                    <input
                        type='checkbox'
                        name='marketing'
                        checked={checked}
                        onChange={() => setChecked(prev => !prev)}
                        value='choosen'
                    />
                    <label className={styles.label} htmlFor='marketing'>Sign me up for email updates and news(optional).</label>
                </div>
            </form>
        </div>
    )
}

export default CustomerDetailForm;