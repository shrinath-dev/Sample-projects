import React from "react";
import styles from "./UserAuthStatus.module.css";
import { useAuthContext } from "../../../context";

function UserAuthStatus() {
  const { user, isLoggedIn } = useAuthContext();
  return (
    <div className={styles.userStatusContainer}>
      <img className={styles.userIcon} src="./user-icon.svg" alt="user-icon" />
      {isLoggedIn ? (
        <p className={styles.logout}>Logout</p>
      ) : (
        <p className={styles.login}>Login</p>
      )}
    </div>
  );
}

export default UserAuthStatus;
