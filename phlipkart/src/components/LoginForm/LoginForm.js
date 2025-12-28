import React, { useState } from "react";
import styles from './LoginForm.module.css';


function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })


    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = () => {
        // later 
    }

    return (
        <div className={styles.formContainer}>
            <form name="login" onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label for='username' className={styles.label}>Username</label>
                    <input type="text" name='username' value={formData.username}
                        onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <div className={styles.formGroup}>
                    <label for='password' className={styles.label}>Password</label>
                    <input type="password" name='password' value={formData.password}
                        onChange={(e) => handleChange(e.target.name, e.target.value)} />
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};


export default LoginForm;