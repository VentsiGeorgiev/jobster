import { createContext, useContext, useReducer } from 'react';
import { createJobOffer, getAllJobs, getUserJobs, removeJob, getJob, updateJob, getStats, jobApply } from '../../api/api';
import { CHANGE_PAGE, CLEAR_FORM_DATA, CLEAR_JOB_ALERT, CREATE_JOB_PENDING, CREATE_JOB_REJECTED, CREATE_JOB_SUCCESS, DELETE_JOB_PENDING, DELETE_JOB_REJECTED, DELETE_JOB_SUCCESS, FETCH_ALL_JOBS_PENDING, FETCH_ALL_JOBS_REJECTED, FETCH_ALL_JOBS_SUCCESS, FETCH_CURRENT_JOB_PENDING, FETCH_CURRENT_JOB_REJECTED, FETCH_CURRENT_JOB_SUCCESS, FETCH_JOB_PENDING, FETCH_JOB_REJECTED, FETCH_JOB_SUCCESS, FETCH_STATS_JOBS_PENDING, FETCH_STATS_JOBS_REJECTED, FETCH_STATS_JOBS_SUCCESS, FETCH_USER_JOBS_PENDING, FETCH_USER_JOBS_REJECTED, FETCH_USER_JOBS_SUCCESS, JOB_APPLY_PENDING, JOB_APPLY_REJECTED, JOB_APPLY_SUCCESS, SET_FORM_DATA, SET_SEARCH_FORM_DATA, TOGGLE_MODAL, TOGGLE_SIDEBAR, UPDATE_JOB_PENDING, UPDATE_JOB_REJECTED, UPDATE_JOB_SUCCESS } from './jobsActions';
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
    hasApplied: false,
    isOwner: false,
    isModalOpen: false,
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

            const user = JSON.parse(localStorage.getItem('user'));
            const hasApplied = response.candidates.includes(user._id);
            const isOwner = response.createdBy === user._id;

            dispatch({ type: FETCH_CURRENT_JOB_SUCCESS, payload: { response, hasApplied, isOwner } });
        } catch (error) {
            dispatch({ type: FETCH_CURRENT_JOB_REJECTED, payload: error.message });
        }
    };

    const applyForJob = async (id) => {
        dispatch({ type: JOB_APPLY_PENDING });
        try {
            const response = await jobApply(id);

            dispatch({ type: JOB_APPLY_SUCCESS, payload: response.message });
        } catch (error) {
            dispatch({ type: JOB_APPLY_REJECTED, payload: error.message });
        }
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_JOB_ALERT });
        }, 4000);
    };

    const toggleDeleteModal = (id) => {
        dispatch({ type: TOGGLE_MODAL, payload: id });
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
        applyForJob,
        toggleDeleteModal
    }}
    >
        {children}
    </JobsContext.Provider>;
};

const useJobsContext = () => {
    return useContext(JobsContext);
};

export { JobsProvider, useJobsContext };