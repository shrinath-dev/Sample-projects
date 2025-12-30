import React from "react";
import styles from "./CartStatus.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartLength, setCartVisibility } from "../../../features/cart/cartSlice";

function CartStatus() {
  const cartValue = useSelector(getCartLength);
  const dispatch = useDispatch();

  const showCart = () => {
    dispatch(setCartVisibility());
  }

  return (
    <div onClick={showCart} className={styles.cartStatusContainer}>
      <img className={styles.cartIcon} src="./cart-icon.svg" alt="cart" />
      {cartValue !== 0 && <p className={styles.cartValue}>{cartValue}</p>}
    </div>
  );
}

export default CartStatus;
