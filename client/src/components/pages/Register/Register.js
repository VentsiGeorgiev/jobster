import { useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import { Logo, FormInputRow, Alert } from '../../shared/';

function Register() {
    const { displayAlert } = useAppContext();
    const initialState = {
        name: '',
        email: '',
        password: '',
        repass: '',
        isMember: false,
    };

    const [values, setValue] = useState(initialState);
    const { name, email, password, repass, isMember } = values;

    const toggleMember = () => {
        setValue({ ...values, isMember: !values.isMember });
    };

    const handleChange = (e) => {
        setValue({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password || !name || !repass) {
            displayAlert();
        }

        console.log(values);


    };

    return (
        <section className='center'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='align-center'>
                    <Logo />
                    <h3>{isMember ? 'Register' : 'Login'}</h3>
                    <Alert />
                </div>
                <FormInputRow
                    id='name'
                    type='text'
                    labelText='Name'
                    name='name'
                    value={name}
                    handleChange={handleChange}
                />

                <FormInputRow
                    id='email'
                    type='email'
                    labelText='Email'
                    name='email'
                    value={email}
                    handleChange={handleChange}
                />
                {isMember && (
                    <>
                        <FormInputRow
                            id='password'
                            type='password'
                            labelText='Password'
                            name='password'
                            value={password}
                            handleChange={handleChange}
                        />
                        <FormInputRow
                            id='repass'
                            type='repass'
                            labelText='Repeat password'
                            name='repass'
                            value={repass}
                            handleChange={handleChange}
                        />
                    </>)
                }

                <div className='form-row align-center'>
                    <button className='btn btn-primary' >
                        {isMember ? 'Sign Up' : 'Sign In'}
                    </button>
                    <p>
                        {isMember ? 'Already have an account?' : 'Don\'t have an account yet?'}
                        <button
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