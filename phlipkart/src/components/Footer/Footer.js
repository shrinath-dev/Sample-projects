import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <p className={styles.footerText}>
        &copy; Copyright {new Date().getFullYear()} Phlipkart pvt. ltd
      </p>
    </div>
  );
}

export default Footer;
