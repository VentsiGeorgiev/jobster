import {
    TOGGLE_SIDEBAR,
    CREATE_JOB_PENDING,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_REJECTED,
    FETCH_ALL_JOBS_PENDING,
    FETCH_ALL_JOBS_SUCCESS,
    FETCH_ALL_JOBS_REJECTED,
    FETCH_USER_JOBS_PENDING,
    FETCH_USER_JOBS_SUCCESS,
    FETCH_USER_JOBS_REJECTED,
    DELETE_JOB_PENDING,
    DELETE_JOB_SUCCESS,
    DELETE_JOB_REJECTED,
    SET_FORM_DATA,
    CLEAR_FORM_DATA,
    FETCH_JOB_PENDING,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_REJECTED,
    UPDATE_JOB_PENDING,
    UPDATE_JOB_REJECTED,
    UPDATE_JOB_SUCCESS,
    SET_SEARCH_FORM_DATA,
    CHANGE_PAGE,
} from './jobsActions';

const reducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            };
        case CREATE_JOB_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                job: action.payload,
                allJobs: [...state.allJobs, action.payload],
                userJobs: [...state.userJobs, action.payload]
            };
        case CREATE_JOB_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case FETCH_ALL_JOBS_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_ALL_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                totalJobs: action.payload.totalJobs,
                numOfPages: action.payload.numOfPages,
                allJobs: action.payload.jobs
            };
        case FETCH_ALL_JOBS_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case FETCH_USER_JOBS_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_USER_JOBS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                userJobs: action.payload
            };
        case FETCH_USER_JOBS_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case DELETE_JOB_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case DELETE_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allJobs: state.allJobs.filter((x) => x._id !== action.payload.id),
                userJobs: state.userJobs.filter((x) => x._id !== action.payload.id),
            };
        case DELETE_JOB_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case SET_FORM_DATA:
            const job = {
                ...state.job,
                [action.payload.name]: action.payload.value[0]
            };
            return {
                ...state,
                job,
            };
        case CLEAR_FORM_DATA:
            console.log(action.payload);
            return {
                ...state,
                job: action.payload
            };
        case FETCH_JOB_PENDING:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_JOB_SUCCESS:
            const currentJob = {
                company: action.payload.company,
                position: action.payload.position,
                status: action.payload.status,
                jobType: action.payload.jobType,
                jobLocation: action.payload.jobLocation,
            };
            return {
                ...state,
                isLoading: false,
                job: currentJob,
                editJobId: action.payload._id,
            };
        case FETCH_JOB_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case UPDATE_JOB_PENDING:
            return {
                ...state,
                isLoading: true,
                isEditing: true,
            };
        case UPDATE_JOB_SUCCESS:
            return {
                ...state,
                editJobId: null,
                isEditing: false,
                isLoading: false,
                job: action.payload
            };
        // case UPDATE_JOB_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         job: action.payload
        //     };
        case UPDATE_JOB_REJECTED:
            return {
                ...state,
                isLoading: false,
                isEditing: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case SET_SEARCH_FORM_DATA:
            const searchCriteria = {
                ...state.searchCriteria,
                [action.payload.name]: action.payload.value[0]
            };
            return {
                ...state,
                searchCriteria,
            };
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        default:
            throw new Error(`No such action ${action.type}`);
    }
};

export default reducer;