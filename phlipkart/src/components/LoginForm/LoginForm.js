import React, { useState } from "react";
import styles from './LoginForm.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";



function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false);


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
            <form name="login" className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <FaUser className={styles.icon} />
                    <label htmlFor='username' className={styles.label}>Username</label>
                    <input autoComplete="true" name="username" id="username" type="text" value={formData.username}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required />
                </div>

                <div className={styles.formGroup}>
                    <RiLockPasswordFill className={styles.icon} />
                    <label htmlFor='password' className={styles.label}>Password</label>
                    <input name="password" id="password" type={showPassword ? 'text' : 'password'} value={formData.password}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required />
                    <div onClick={() => setShowPassword(prev => !prev)} className={styles.passVisibilityToggler}>
                        {
                            showPassword ? <BiSolidShow className={styles.icon} /> : <BiSolidHide className={styles.icon} />
                        }
                    </div>

                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};


export default LoginForm;