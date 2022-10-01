import { INPUT_CHANGE } from './formActions';

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
        default:
            throw new Error(`No such action ${action.type}`);
    }

};

export default reducer;