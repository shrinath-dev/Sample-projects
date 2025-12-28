import React from "react";
import styles from './LoginPage.module.css';
import { LoginForm } from "../../components";


function LoginPage() {

    return (
        <div className={styles.loginPageContainer}>
            <LoginForm />
        </div>
    )
};


export default LoginPage;