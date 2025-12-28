import React from "react";
import styles from "./UserAuthStatus.module.css";
import { useAuthContext } from "../../../context";
import { Link } from "react-router-dom";
function UserAuthStatus() {
  const { user, isLoggedIn } = useAuthContext();
  return (
    <Link to='/login'><div className={styles.userStatusContainer}>
      <img className={styles.userIcon} src="./user-icon.svg" alt="user-icon" />
      {isLoggedIn ? (
        <p className={styles.logout}>Logout</p>
      ) : (
        <p className={styles.login}>Login</p>
      )}
    </div></Link>
  );
}

export default UserAuthStatus;
