import React, { useState, createContext, useContext } from "react";


const ThemeContext = createContext();

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(`useThemeContext must call inside a ThemeProvider`);
    }

    return context;
}


function ThemeProvider({ children }) {

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    const value = {
        theme,
        toggleTheme,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;