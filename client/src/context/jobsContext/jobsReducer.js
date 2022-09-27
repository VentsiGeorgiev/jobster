import {
    TOGGLE_SIDEBAR,
    CREATE_JOB_PENDING,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_REJECTED,
    FETCH_ALL_JOBS_PENDING,
    FETCH_ALL_JOBS_SUCCESS,
    FETCH_ALL_JOBS_REJECTED,
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
                job: action.payload
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
                allJobs: action.payload
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
        default:
            throw new Error(`No such action ${action.type}`);
    }
};

export default reducer;