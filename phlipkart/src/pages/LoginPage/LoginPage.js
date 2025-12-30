import React from "react";
import styles from './LoginPage.module.css';
import { LoginForm } from "../../components";
import { useThemeContext } from "../../context";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

function LoginPage() {

    const { theme } = useThemeContext();


    return (
        <div data-theme={theme} className={styles.loginPageContainer}>
            <div className={styles.back}>
                <Link to='/'>
                    <button className={styles.backBtn}>
                        <MdOutlineKeyboardBackspace className={styles.icon} />
                        Back
                    </button>
                </Link>
            </div>


            <div className={styles.loginForm}>
                <div className={styles.sectionHead}>
                    <p className={styles.heading}>Welcome Back</p>
                    <p className={styles.subHeading}>Please Enter Your Account Details.</p>
                </div>
                <LoginForm />
            </div>
        </div>
    )
};


export default LoginPage;