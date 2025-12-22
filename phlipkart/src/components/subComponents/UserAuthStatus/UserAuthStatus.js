import React from "react";
import styles from './UserAuthStatus.module.css';
import { useAuthContext } from "../../../context";


function UserAuthStatus() {

    const { user, isLoggedIn } = useAuthContext();
    return (
        <div className={styles.userStatusContianer} >
            <img src='./user-icon.svg' alt='user-icon' />
            {
                isLoggedIn ? <p>LogOut</p> : <p>LogIn</p>
            }
        </div>
    )
}


export default UserAuthStatus;