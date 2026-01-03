import React, { useState } from "react";
import styles from './PaymentMethod.module.css';

function PaymentMethod() {

    const [method, setMethod] = useState('cod');

    const [card, setCard] = useState({
        cardNumber: '',
        dateOfExpiry: '',
        securityCode: ''
    })

    const handleCard = (name, value) => {
        setCard({
            ...card,
            [name]: value,
        })
    }

    return (
        <div className={styles.paymentContainer}>
            <p className={styles.heading}>Payment Method</p>
            <div className={styles.methods}>
                <div className={styles.method}>
                    <input
                        type='radio'
                        value='card'
                        id='card'
                        name='payment-method'
                        checked={method === 'card'}
                        onChange={(e) => setMethod(e.target.value)}
                    />
                    <label htmlFor='card' >Credit/Debit Card</label>

                </div>
                {
                    method === 'card' ? (
                        <div className={styles.cardForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="cardNumber">Card Number*</label>
                                <input
                                    type='text'
                                    name='cardNumber'
                                    value={card.cardNumber}
                                    onChange={(e) => handleCard(e.target.name, e.target.value)}
                                    placeholder="xxxx xxxx xxxx xxxx"
                                />
                            </div>
                            <div className={styles.code}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="dateOfExpiry">Expiration(MM/YY)*</label>
                                    <input
                                        type='text'
                                        name='dateOfExpiry'
                                        value={card.dateOfExpiry}
                                        onChange={(e) => handleCard(e.target.name, e.target.value)}
                                        placeholder="MM/YY"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="securityCode">Card Security Code*</label>
                                    <input
                                        type='password'
                                        name='securityCode'
                                        value={card.securityCode}
                                        onChange={(e) => handleCard(e.target.name, e.target.value)}
                                        placeholder="CSC"
                                    />
                                </div>
                            </div>
                        </div>
                    ) :
                        (
                            ''
                        )
                }
                <div className={styles.method}>
                    <input
                        type='radio'
                        value='cod'
                        id='cod'
                        name='payment-method'
                        checked={method === 'cod'}
                        onChange={(e) => setMethod(e.target.value)}
                    />
                    <label htmlFor='cod'>Cash On Delivery</label>
                </div>
            </div>
        </div>
    )
};


export default PaymentMethod;