import { createContext, useContext, useEffect, useReducer } from 'react';
import { createJobOffer, getAllJobs } from '../../api/api';
import { useAppContext } from '../appContext';
import { CREATE_JOB_PENDING, CREATE_JOB_REJECTED, CREATE_JOB_SUCCESS, FETCH_ALL_JOBS_PENDING, FETCH_ALL_JOBS_REJECTED, FETCH_ALL_JOBS_SUCCESS, TOGGLE_SIDEBAR } from './jobsActions';
import reducer from './jobsReducer';

const initialState = {
    job: {},
    allJobs: [],
    showSidebar: true,
    isLoading: false,
    showAlert: false,
    isError: false,
    message: '',
    alertType: '',
};

const JobsContext = createContext();

const JobsProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, initialState);


    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    };

    const createJob = async (job) => {
        dispatch({ type: CREATE_JOB_PENDING });
        try {
            const response = await createJobOffer(job);
            dispatch({ type: CREATE_JOB_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: CREATE_JOB_REJECTED, payload: error.message });
        }
    };

    useEffect(() => {
        dispatch({ type: FETCH_ALL_JOBS_PENDING });
        const fetchJobs = async () => {

            try {
                const response = await getAllJobs();
                dispatch({ type: FETCH_ALL_JOBS_SUCCESS, payload: response });
            } catch (error) {
                dispatch({ type: FETCH_ALL_JOBS_REJECTED, payload: error.message });
            }

        };
        fetchJobs();

    }, []);

    return <JobsContext.Provider value={{
        ...state,
        toggleSidebar,
        createJob,
    }}
    >
        {children}
    </JobsContext.Provider>;
};

const useJobsContext = () => {
    return useContext(JobsContext);
};

export { JobsProvider, useJobsContext };