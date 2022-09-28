import { createContext, useContext, useEffect, useReducer } from 'react';
import { createJobOffer, getAllJobs, getUserJobs, removeJob } from '../../api/api';
import { CREATE_JOB_PENDING, CREATE_JOB_REJECTED, CREATE_JOB_SUCCESS, DELETE_JOB_PENDING, DELETE_JOB_REJECTED, DELETE_JOB_SUCCESS, FETCH_ALL_JOBS_PENDING, FETCH_ALL_JOBS_REJECTED, FETCH_ALL_JOBS_SUCCESS, FETCH_USER_JOBS_PENDING, FETCH_USER_JOBS_REJECTED, FETCH_USER_JOBS_SUCCESS, TOGGLE_SIDEBAR } from './jobsActions';
import reducer from './jobsReducer';

const initialState = {
    job: {},
    allJobs: [],
    userJobs: [],
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

    useEffect(() => {
        dispatch({ type: FETCH_USER_JOBS_PENDING });
        const fetchUserJobs = async () => {

            try {
                const response = await getUserJobs();
                dispatch({ type: FETCH_USER_JOBS_SUCCESS, payload: response });
            } catch (error) {
                dispatch({ type: FETCH_USER_JOBS_REJECTED, payload: error.message });
            }

        };
        fetchUserJobs();

    }, []);

    const deleteJob = async (id) => {
        dispatch({ type: DELETE_JOB_PENDING });
        try {
            const response = await removeJob(id);
            dispatch({ type: DELETE_JOB_SUCCESS, payload: { response, id } });
        } catch (error) {
            dispatch({ type: DELETE_JOB_REJECTED, payload: error.message });
        }
    };



    return <JobsContext.Provider value={{
        ...state,
        toggleSidebar,
        createJob,
        deleteJob,
    }}
    >
        {children}
    </JobsContext.Provider>;
};

const useJobsContext = () => {
    return useContext(JobsContext);
};

export { JobsProvider, useJobsContext };