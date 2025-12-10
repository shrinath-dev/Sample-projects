import React, { useEffect, useRef } from "react";
import styles from './Header.module.css';
import { useThemeContext } from "../../contexts/ThemeContext/ThemeContext";

function Header() {

    const { theme, toggleTheme } = useThemeContext();

    const switchTheme = useRef(null);

    const handleThemeSwitch = () => {
        const classList = switchTheme.current.classList;
        if (theme === 'light') {
            classList.remove(styles.slideLeft);
            classList.toggle(styles.slideRight);
        } else {
            classList.remove(styles.slideRight);
            classList.toggle(styles.slideLeft);
        }
        toggleTheme();
    }
    return (
        <div data-theme={theme} className={styles.header}>
            <div className={styles.headingTitle}>
                <h1>Task Manager</h1>
                <p>Organize today. Achieve tomorrow.</p>
            </div>
            <div className={styles.themeMode}>
                <p>{theme === 'light' ? 'Light' : 'Dark'}</p>
                <div onClick={handleThemeSwitch} className={styles.toggleTheme}>
                    <div className={styles.switchContianer}>
                        <div ref={switchTheme} id='toggleSwitch' className={styles.toggleSwitch}></div>
                    </div>
                </div>
            </div>

        </div>

    );

}

export default Header; 