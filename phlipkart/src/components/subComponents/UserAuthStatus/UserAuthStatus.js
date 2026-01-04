import React from "react";
import styles from "./UserAuthStatus.module.css";
import { useAuthContext } from "../../../context";
import { Link, NavLink } from "react-router-dom";
import { CiShop } from "react-icons/ci";

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
      <div className={styles.user}>
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
      <NavLink className={`${styles.homeLink}`} to='/'>
        <CiShop className={styles.shopIcon} />
      </NavLink>

    </div>
  );
}

export default UserAuthStatus;
