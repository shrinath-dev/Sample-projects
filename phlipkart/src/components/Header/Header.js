import React from "react";
import styles from './Header.module.css';
import { UserAuthStatus, CartStatus } from "../subComponents";


function Header() {
    return (
        <div className={styles.header}>
            <img src='./logo.png' alt='logo' />
            <UserAuthStatus />
            <CartStatus />
        </div>
    )
}

export default Header;