import React, { createContext, useContext, useEffect, useReducer } from "react";


const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext hook must be used inside AuthContextProvider');
    }

    return context;
}

// user initial state
const initialState = {
    currentUser: null,
    isLoggedIn: false,
    loginError: null,
}

const ACTIONS = {
    'SET_USER': 'SET_USER',
    'SET_ERROR': 'SET_ERROR',
};

const authReducer = (state, action) => {
    const saveToLocalStorage = (currentState) => {
        localStorage.setItem('user', JSON.stringify({
            ...currentState
        }))
        return currentState;
    }

    switch (action.type) {
        case ACTIONS.SET_USER:
            return saveToLocalStorage({
                ...state,
                currentUser: action.payload,
                isLoggedIn: true,
                loginError: null,
            });

        case ACTIONS.SET_ERROR:
            return {
                ...state,
                loginError: `${action.payload} Please use "test" as username and "test@123" as password this is a demo app`
            }
        default:
            console.log(action);
            return state;
    }
}

function AuthProvider({ children }) {

    useEffect(() => {
        const savedState = localStorage.getItem('user');
        if (savedState) {
            const user = JSON.parse(savedState).currentUser;
            loginUser(user);
        }
    }, [])

    const [state, dispatch] = useReducer(authReducer, initialState);

    const loginUser = (userData) => {

        if (userData.username !== 'test') {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'Username is incorrect.' })
            return;
        }
        if (userData.password !== 'test@123') {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'Password is incorrect.' })
            return;
        }

        dispatch({ type: ACTIONS.SET_USER, payload: userData });
    }
    const value = {
        user: state.currentUser,
        isLoggedIn: state.isLoggedIn,
        loginError: state.loginError,
        loginUser,

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;