import React from "react";
import styles from "./Header.module.css";
import { UserAuthStatus, CartStatus, ThemeToggler } from "../subComponents";
import Cart from "../Cart/Cart";

function Header() {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src="./logo.png" alt="logo" />
      <div className={styles.headerInfo}>
        <UserAuthStatus />
        <div className={styles.cartTheme}>
          <CartStatus />
          <Cart />
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}

export default Header;
