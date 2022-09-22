import { DISPLAY_ALERT, CLEAR_ALERT } from './actions';

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

        default:
            throw new Error(`No such action ${action.type}`);
    }

};

export default reducer;