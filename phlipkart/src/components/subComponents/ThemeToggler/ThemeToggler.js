import React from "react";
import styles from "./ThemeToggler.module.css";
import { useThemeContext } from "../../../context";

function ThemeToggler() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.toggleContainer}>
      {theme === "light" ? (
        <img
          className={styles.themeIcon}
          onClick={toggleTheme}
          src="./day-icon.svg"
          alt="day"
        />
      ) : (
        <img
          className={styles.themeIcon}
          onClick={toggleTheme}
          src="./night-icon.svg"
          alt="night"
        />
      )}
    </div>
  );
}

export default ThemeToggler;
