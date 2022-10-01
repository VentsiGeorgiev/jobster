import { createContext, useContext, useReducer } from 'react';
import { INPUT_CHANGE, TOGGLE_MEMBER } from './formActions';
import reducer from './formReducer';

const FormContext = createContext();
const initialState = {
    authForm: {
        name: '',
        email: '',
        password: '',
        repass: '',
    },
    isMember: false,

};

const FormProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onChange = ({ name, value }) => {
        dispatch({ type: INPUT_CHANGE, payload: { name, value } });
    };
    const toggleMember = () => {
        dispatch({ type: TOGGLE_MEMBER });
    };


    return <FormContext.Provider
        value={{
            ...state,
            onChange,
            toggleMember,
        }}
    >
        {children}
    </FormContext.Provider>;

};

export const useFormContext = () => {
    return useContext(FormContext);
};

export default FormProvider;
