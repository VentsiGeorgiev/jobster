import { createContext, useContext, useReducer } from 'react';
import { register, login, update } from '../api/api';
import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_PENDING,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REJECTED,
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REJECTED,
    LOGOUT_USER,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REJECTED,
    TOGGLE_EDIT,
} from './actions';
import reducer from './reducer';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    showAlert: false,
    isError: false,
    isEditing: false,
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
        dispatch({ type: REGISTER_USER_PENDING });
        try {
            const response = await register(user);
            dispatch({ type: REGISTER_USER_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: REGISTER_USER_REJECTED, payload: error.message });
            clearAlert();
        }
    };

    const loginUser = async (user) => {
        dispatch({ type: LOGIN_USER_PENDING });
        try {
            const response = await login(user);
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: LOGIN_USER_REJECTED, payload: error.message });
            clearAlert();
        }
    };

    const logout = () => {
        dispatch({ type: LOGOUT_USER });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const updateUser = async (data) => {
        dispatch({ type: UPDATE_USER_PENDING });
        try {
            const response = await update(data);
            dispatch({ type: UPDATE_USER_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: UPDATE_USER_REJECTED, payload: error.message });
            clearAlert();
        }
    };

    const toggleEdit = () => {
        dispatch({ type: TOGGLE_EDIT });
    };


    return <AppContext.Provider value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logout,
        updateUser,
        toggleEdit,
    }}
    >
        {children}
    </AppContext.Provider>;

};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };