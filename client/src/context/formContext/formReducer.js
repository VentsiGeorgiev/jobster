import { INPUT_CHANGE, TOGGLE_MEMBER } from './formActions';

const reducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            const authForm = {
                ...state.authForm,
                [action.payload.name]: action.payload.value[0]
            };
            return {
                ...state,
                authForm,
            };
        case TOGGLE_MEMBER:
            return {
                ...state,
                isMember: !state.isMember
            };
        default:
            throw new Error(`No such action ${action.type}`);
    }

};

export default reducer;