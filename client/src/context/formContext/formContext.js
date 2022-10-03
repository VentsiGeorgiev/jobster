import { createContext, useContext, useReducer } from 'react';
import { validateInput } from '../../utils/formUtils';
import { CLEAN_FORM, INPUT_CHANGE, TOGGLE_MEMBER, UPDATE_FORM } from './formActions';
import reducer from './formReducer';

const FormContext = createContext();
const initialState = {
    name: { value: '', touched: false, hasError: true, error: '' },
    email: { value: '', touched: false, hasError: true, error: '' },
    password: { value: '', touched: false, hasError: true, error: '' },
    repass: { value: '', touched: false, hasError: true, error: '' },
    isFormValid: false,
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

    const onInputChange = (name, value, hasError, error, state, isMember) => {

        let isFormValid = true;

        if (!isMember) {
            // Check for inputs on login
            if (state.email.hasError || state.password.hasError) {
                isFormValid = false;
            }
        } else {
            // Check for inputs on register
            for (const key in state) {
                const item = state[key];
                // Check if the current field has error
                if (key === name && hasError) {
                    isFormValid = false;
                    break;
                }
                else if (key !== name && item.hasError) {
                    // Check if any other field has error
                    isFormValid = false;
                    break;
                }
            }
        }



        dispatch({
            type: UPDATE_FORM,
            data: {
                name,
                value,
                hasError,
                error,
                touched: false,
                isFormValid,
            },
        });
    };

    const onFocusOut = (name, value, hasError, error, state, isMember) => {

        let isFormValid = true;

        if (!isMember) {
            // Check for inputs on login
            if (state.email.hasError || state.password.hasError) {
                isFormValid = false;
            }
        } else {
            // Check for inputs on register
            for (const key in state) {
                const item = state[key];
                // Check if the current field has error
                if (key === name && hasError) {
                    isFormValid = false;
                    break;
                } else if (key !== name && item.hasError) {
                    // Check if any other field has error
                    isFormValid = false;
                    break;
                }
            }
        }



        dispatch({
            type: UPDATE_FORM,
            data: { name, value, hasError, error, touched: true, isFormValid },
        });
    };

    const cleanFormState = () => {
        dispatch({ type: CLEAN_FORM, payload: initialState });
    };


    return <FormContext.Provider
        value={{
            state,
            dispatch,
            ...state,
            onChange,
            toggleMember,
            onInputChange,
            onFocusOut,
            cleanFormState,
        }}
    >
        {children}
    </FormContext.Provider>;

};

export const useFormContext = () => {
    return useContext(FormContext);
};

export default FormProvider;
