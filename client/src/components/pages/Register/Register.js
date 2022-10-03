import { useEffect } from 'react';
import { useAppContext } from '../../../context/appContext';
import { Logo, FormInputRow, Alert } from '../../shared/';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../../../context/formContext/formContext';
import { onInputChange, validateInput } from '../../../utils/formUtils';

function Register() {
    const { registerUser, loginUser, isLoading, user, displayAlert } = useAppContext();
    const { onChange, toggleMember, isMember, name, email, password, repass, state, onInputChange, onFocusOut, isFormValid } = useFormContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }

    }, [user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) {
            displayAlert('Please fill all fields correctly', 'danger');
        } else {
            if (!isMember) {
                const user = {
                    email,
                    password
                };
                loginUser(user);
            } else {
                const user = {
                    name,
                    email,
                    password
                };
                registerUser(user);
            }
        }




    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const { hasError, error } = validateInput(name, value, password);
        onInputChange(name, value, hasError, error, state);

    };

    const handleBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const { hasError, error } = validateInput(name, value, password);
        onFocusOut(name, value, hasError, error, state);
    };

    return (
        <section className='center'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='align-center'>
                    <Logo />
                    <h3>{isMember ? 'Register' : 'Login'}</h3>
                    <Alert />
                </div>
                {isFormValid && <Alert message='Invalid form' alertType='danger' />}
                {isMember &&
                    <div className='input-wrapper'>
                        {<FormInputRow
                            id='name'
                            type='text'
                            labelText='Name'
                            name='name'
                            value={name.value}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />}
                        {name.touched && name.hasError && (
                            <span className='error'>{name.error}</span>
                        )}
                    </div>
                }
                <div className='input-wrapper'>
                    <FormInputRow
                        id='email'
                        type='email'
                        labelText='Email'
                        name='email'
                        value={email.value}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {email.touched && email.hasError && (
                        <span className='error'>{email.error}</span>
                    )}
                </div>

                <div className='input-wrapper'>
                    <FormInputRow
                        id='password'
                        type='password'
                        labelText='Password'
                        name='password'
                        value={password.value}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {password.touched && password.hasError && (
                        <span className='error'>{password.error}</span>
                    )}
                </div>
                {isMember &&
                    <div className='input-wrapper'>
                        <FormInputRow
                            id='repass'
                            type='password'
                            labelText='Repeat password'
                            name='repass'
                            value={repass.value}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                        />
                        {repass.touched && repass.hasError && (
                            <span className='error'>{repass.error}</span>
                        )}
                    </div>
                }

                <div className='form-row align-center'>
                    <button className='btn btn-primary' >
                        {isMember ? 'Sign Up' : 'Sign In'}
                    </button>
                    <p>
                        {isMember ? 'Already have an account?' : 'Don\'t have an account yet?'}
                        <button
                            type='button'
                            onClick={toggleMember}
                            className='btn btn-secondary'
                        >
                            {isMember ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </form>
        </section>
    );
}
export default Register;