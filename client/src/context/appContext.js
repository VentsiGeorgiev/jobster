import { createContext, useContext, useReducer } from 'react';
import { DISPLAY_ALERT } from './actions';
import reducer from './reducer';

const initialState = {
    isLoading: true,
    showAlert: false,
    message: '',
    alertType: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
    };

    return <AppContext.Provider value={{
        ...state,
        displayAlert
    }}
    >
        {children}
    </AppContext.Provider>;

};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };