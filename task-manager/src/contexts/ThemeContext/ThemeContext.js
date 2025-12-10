import React, { useState, createContext, useContext } from "react";



const ThemeContext = createContext();

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(`useThemecontext must be call inside a ThemeProvider`);
    }
    return context;
}

function ThemeProvider({ children }) {

    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    const value = {
        theme: theme,
        toggleTheme, // theme handler
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;