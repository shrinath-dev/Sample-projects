import React from "react";
import styles from "./UserAuthStatus.module.css";
import { useAuthContext } from "../../../context";
import { Link } from "react-router-dom";
function UserAuthStatus() {
  const { user, isLoggedIn, logoutUser } = useAuthContext();

  const handleLogout = () => {
    if (window.confirm('Did you really want to logout?')) {
      logoutUser();
    }
    return;
  }
  return (
    <div className={styles.userStatusContainer}>
      {
        user && <p className={styles.username}>(Hey! {user.username})</p>
      }
      <img className={styles.userIcon} src="./user-icon.svg" alt="user-icon" />
      {isLoggedIn ? (
        <p onClick={handleLogout} className={styles.logout}>Logout</p>
      ) : (
        <Link to='/login'><p className={styles.login}>Login</p></Link>
      )}
    </div>
  );
}

export default UserAuthStatus;
