import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
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
            console.log('REGISTER_USER - REDUCER');
            console.log(action.payload);

            return {
                ...state,
                user: action.payload
            };

        default:
            throw new Error(`No such action ${action.type}`);
    }

};

export default reducer;