import React, { useState } from "react";
import styles from './LoginForm.module.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { useAuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const { loginUser, loginError } = useAuthContext();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(formData);
        setFormData({
            username: '',
            password: '',
        })
        navigate('/');
    }

    return (
        <div className={styles.formContainer}>
            <form name="login" className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.formGroup}>
                    <FaUser className={styles.icon} />
                    <input autoComplete="true" name="username" id="username" type="text" value={formData.username}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required />
                    <label htmlFor='username' className={styles.label}>Username</label>
                </div>

                <div className={styles.formGroup}>
                    <RiLockPasswordFill className={styles.icon} />
                    <input name="password" id="password" type={showPassword ? 'text' : 'password'} value={formData.password}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        required />
                    <label htmlFor='password' className={styles.label}>Password</label>
                    <div onClick={() => setShowPassword(prev => !prev)} className={styles.passVisibilityToggler}>
                        {
                            showPassword ? <BiSolidShow className={styles.icon} /> : <BiSolidHide className={styles.icon} />
                        }
                    </div>

                </div>

                <button className={styles.submitBtn} type='submit'>Login</button>
            </form>

            {
                loginError && (
                    <div className={styles.error}>
                        {loginError}
                    </div>
                )
            }
        </div>
    )
};


export default LoginForm;