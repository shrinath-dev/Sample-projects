import React, { createContext, useContext, useReducer } from "react";


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
    user: null,
    isLoggedIn: false,
}

const ACTION_TYPES = {
    'SET_USER': 'SET_USER'
}

const reducer = (action, state) => {

    switch (action.type) {
        case ACTION_TYPES.SET_USER:
            return state;

        default:
            return state;
    }
}

function AuthProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState);

    const logInUser = (email, password) => {
        dispatch({ type: ACTION_TYPES.SET_USER, payload: { email, password } });
    }
    const value = {
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        logInUser,

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;