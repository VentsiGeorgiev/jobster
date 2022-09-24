import { createContext, useContext, useReducer } from 'react';
import { register, login } from '../api/api';
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    ERROR,
    LOGIN_USER,
    REGISTER_USER,
} from './actions';
import reducer from './reducer';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    showAlert: false,
    message: '',
    alertType: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = (msg, type) => {
        dispatch({ type: DISPLAY_ALERT, payload: { msg, type } });
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT });
        }, 3000);
    };

    const registerUser = async (user) => {
        try {
            const response = await register(user);
            dispatch({ type: REGISTER_USER, payload: response });
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message });
            clearAlert();
        }
    };

    const loginUser = async (user) => {
        try {
            const response = await login(user);
            dispatch({ type: LOGIN_USER, payload: response });
        } catch (error) {
            dispatch({ type: ERROR, payload: error.message });
            clearAlert();
        }
    };


    return <AppContext.Provider value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
    }}
    >
        {children}
    </AppContext.Provider>;

};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };