import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    REGISTER_USER_PENDING,
    REGISTER_USER_REJECTED,
    REGISTER_USER_SUCCESS,
    LOGIN_USER_PENDING,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_REJECTED,
    LOGOUT_USER,
    UPDATE_USER_PENDING,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_REJECTED,
    TOGGLE_EDIT,
} from './actions';

const reducer = (state, action) => {
    switch (action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                isError: true,
                message: action.payload.msg,
                alertType: action.payload.type,
            };
        case CLEAR_ALERT:
            return {
                ...state,
                showAlert: false,
                isError: false,
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
        case UPDATE_USER_PENDING:
            return {
                ...state,
                isLoading: true
            };
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isEditing: false,
                user: action.payload,
            };
        case UPDATE_USER_REJECTED:
            return {
                ...state,
                isLoading: false,
                showAlert: true,
                isError: true,
                message: action.payload,
                alertType: 'danger',
            };
        case TOGGLE_EDIT:
            return {
                ...state,
                isEditing: !state.isEditing
            };

        default:
            throw new Error(`No such action ${action.type}`);
    }

};

export default reducer;