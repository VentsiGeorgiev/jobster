import { createContext, useContext, useReducer } from 'react';
import { TOGGLE_SIDEBAR } from './jobsActions';
import reducer from './jobsReducer';

const initialState = {
    showSidebar: true,
};

const JobsContext = createContext();

const JobsProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);


    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    return <JobsContext.Provider value={{
        ...state,
        toggleSidebar
    }}
    >
        {children}
    </JobsContext.Provider>;
};

const useJobsContext = () => {
    return useContext(JobsContext);
};

export { JobsProvider, useJobsContext };