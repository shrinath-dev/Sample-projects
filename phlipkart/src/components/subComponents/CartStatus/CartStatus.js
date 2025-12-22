import React from "react";
import styles from "./CartStatus.module.css";
import { useSelector } from "react-redux";

function CartStatus() {
  const cartValue = useSelector((state) => state.cart.cartLength);
  return (
    <div className={styles.cartStatusContainer}>
      <img className={styles.cartIcon} src="./cart-icon.svg" alt="cart" />
      {cartValue !== 0 && <p className={styles.cartValue}>{cartValue}</p>}
    </div>
  );
}

export default CartStatus;
