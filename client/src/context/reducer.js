import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_PENDING,
    REGISTER_USER_REJECTED,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REJECTED,
    LOGOUT_USER
} from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                message: action.payload.msg,
                alertType: action.payload.type,
            };
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                message: '',
                alertType: '',
            };
        case REGISTER_USER_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case REGISTER_USER_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case LOGIN_USER_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_USER_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
            };

        default:
            throw new Error(`No such action ${action.type}`);
    }

};

export default reducer;