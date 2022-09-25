import { TOGGLE_SIDEBAR } from './jobsActions';

const reducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                showSidebar: !state.showSidebar
            };
        default:
            throw new Error(`No such action ${action.type}`);
    }
};

export default reducer;