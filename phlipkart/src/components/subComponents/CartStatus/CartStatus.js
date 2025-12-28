import React from "react";
import styles from "./CartStatus.module.css";
import { useSelector } from "react-redux";
import { getCartLength, selectCartItems } from "../../../features/cart/cartSlice";

function CartStatus() {
  const cartValue = useSelector(getCartLength);
  const items = useSelector(selectCartItems);
  console.log(items);
  console.log(cartValue);
  return (
    <div className={styles.cartStatusContainer}>
      <img className={styles.cartIcon} src="./cart-icon.svg" alt="cart" />
      {cartValue !== 0 && <p className={styles.cartValue}>{cartValue}</p>}
    </div>
  );
}

export default CartStatus;
