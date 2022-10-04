import { createContext, useContext, useReducer } from 'react';
import { createJobOffer, getAllJobs, getUserJobs, removeJob, getJob, updateJob, getStats } from '../../api/api';
import { CHANGE_PAGE, CLEAR_FORM_DATA, CREATE_JOB_PENDING, CREATE_JOB_REJECTED, CREATE_JOB_SUCCESS, DELETE_JOB_PENDING, DELETE_JOB_REJECTED, DELETE_JOB_SUCCESS, FETCH_ALL_JOBS_PENDING, FETCH_ALL_JOBS_REJECTED, FETCH_ALL_JOBS_SUCCESS, FETCH_CURRENT_JOB_PENDING, FETCH_CURRENT_JOB_REJECTED, FETCH_CURRENT_JOB_SUCCESS, FETCH_JOB_PENDING, FETCH_JOB_REJECTED, FETCH_JOB_SUCCESS, FETCH_STATS_JOBS_PENDING, FETCH_STATS_JOBS_REJECTED, FETCH_STATS_JOBS_SUCCESS, FETCH_USER_JOBS_PENDING, FETCH_USER_JOBS_REJECTED, FETCH_USER_JOBS_SUCCESS, SET_FORM_DATA, SET_SEARCH_FORM_DATA, TOGGLE_SIDEBAR, UPDATE_JOB_PENDING, UPDATE_JOB_REJECTED, UPDATE_JOB_SUCCESS } from './jobsActions';
import reducer from './jobsReducer';

const initialState = {
    job: {
        company: '',
        position: '',
        jobLocation: '',
        description: '',
        type: 'full-time',
        seniority: 'intern',
        skills: 'javascript',
    },
    searchCriteria: {
        term: '',
        type: 'all',
        status: 'all',
        sort: 'latest',
        seniority: 'all',
        skills: 'all',
    },
    jobStats: {},
    currentJob: {},
    page: 1,
    totalJobs: 0,
    numOfPages: 1,
    editJobId: null,
    allJobs: [],
    userJobs: [],
    showSidebar: true,
    isEditing: false,
    isLoading: false,
    showAlert: false,
    isError: false,
    message: '',
    alertType: '',
};

const JobsContext = createContext();

const JobsProvider = ({ children }) => {


    const [state, dispatch] = useReducer(reducer, initialState);

    const handleJobChange = ({ name, value }) => {
        dispatch({ type: SET_FORM_DATA, payload: { name, value } });
    };

    const resetJobForm = () => {
        dispatch({ type: CLEAR_FORM_DATA, payload: initialState.job });
    };


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
        resetJobForm();
    };

    const fetchJobs = async ({ type, status, sort, term, page, seniority, skills }) => {

        dispatch({ type: FETCH_ALL_JOBS_PENDING });
        try {
            const response = await getAllJobs({ type, status, sort, term, page, seniority, skills });
            const { jobs, totalJobs, numOfPages } = response;
            dispatch({ type: FETCH_ALL_JOBS_SUCCESS, payload: { jobs, totalJobs, numOfPages } });
        } catch (error) {
            dispatch({ type: FETCH_ALL_JOBS_REJECTED, payload: error.message });
        }

    };


    const fetchUserJobs = async () => {
        dispatch({ type: FETCH_USER_JOBS_PENDING });

        try {
            const response = await getUserJobs();
            dispatch({ type: FETCH_USER_JOBS_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: FETCH_USER_JOBS_REJECTED, payload: error.message });
        }

    };
    const fetchStatsJobs = async () => {
        dispatch({ type: FETCH_STATS_JOBS_PENDING });

        try {
            const response = await getStats();
            dispatch({ type: FETCH_STATS_JOBS_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: FETCH_STATS_JOBS_REJECTED, payload: error.message });
        }

    };

    const deleteJob = async (id) => {
        dispatch({ type: DELETE_JOB_PENDING });
        try {
            const response = await removeJob(id);
            dispatch({ type: DELETE_JOB_SUCCESS, payload: { response, id } });
        } catch (error) {
            dispatch({ type: DELETE_JOB_REJECTED, payload: error.message });
        }
    };

    const getSingleJob = async (id) => {
        dispatch({ type: FETCH_JOB_PENDING });
        try {
            const response = await getJob(id);
            dispatch({ type: FETCH_JOB_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: FETCH_JOB_REJECTED, payload: error.message });
        }
    };

    const loadJob = async (id) => {
        dispatch({ type: UPDATE_JOB_PENDING });
        const jobId = id ?? initialState.editJobId;
        getSingleJob(jobId);
    };

    const editJob = async (id, updJob) => {
        try {
            const response = await updateJob(id, updJob);
            dispatch({ type: UPDATE_JOB_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: UPDATE_JOB_REJECTED, payload: error.message });
        }
        resetJobForm();
    };

    const handleSearch = ({ name, value }) => {
        dispatch({ type: SET_SEARCH_FORM_DATA, payload: { name, value } });
    };

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload: page });
    };

    const getCurrentJob = async (id) => {
        dispatch({ type: FETCH_CURRENT_JOB_PENDING });
        try {
            const response = await getJob(id);
            dispatch({ type: FETCH_CURRENT_JOB_SUCCESS, payload: response });
        } catch (error) {
            dispatch({ type: FETCH_CURRENT_JOB_REJECTED, payload: error.message });
        }
    };


    return <JobsContext.Provider value={{
        ...state,
        toggleSidebar,
        createJob,
        deleteJob,
        handleJobChange,
        resetJobForm,
        loadJob,
        editJob,
        fetchJobs,
        fetchUserJobs,
        handleSearch,
        changePage,
        fetchStatsJobs,
        getSingleJob,
        getCurrentJob,
    }}
    >
        {children}
    </JobsContext.Provider>;
};

const useJobsContext = () => {
    return useContext(JobsContext);
};

export { JobsProvider, useJobsContext };