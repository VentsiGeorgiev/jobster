import { createContext, useContext, useState } from 'react';

const initialState = {
    isLoading: true,
    showAlert: false,
    message: '',
    alertType: '',
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, setState] = useState(initialState);

    return <AppContext.Provider value={{
        ...state,
    }}
    >
        {children}
    </AppContext.Provider>;

};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };