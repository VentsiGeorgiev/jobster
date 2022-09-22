import { DISPLAY_ALERT } from './actions';

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return { ...state, showAlert: true, alertType: 'danger', message: 'All fields are required' };
    }
    throw new Error(`No such action ${action.type}`);
};

export default reducer;