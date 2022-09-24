import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    ERROR,
    LOGIN_USER,
    REGISTER_USER,
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
        case REGISTER_USER:

            return {
                ...state,
                user: action.payload
            };
        case ERROR:

            return {
                ...state,
                showAlert: true,
                message: action.payload,
                alertType: 'danger',
            };
        case LOGIN_USER:

            return {
                ...state,
                user: action.payload
            };

        default:
            throw new Error(`No such action ${action.type}`);
    }

};

export default reducer;