import { useState } from 'react';
import { Logo, FormInputRow } from '../../shared/';

function Register() {
    const initialState = {
        name: '',
        email: '',
        password: '',
        repass: '',
        isMember: false,
    };

    const [values, setValue] = useState(initialState);

    const toggleMember = () => {
        setValue({ ...values, isMember: !values.isMember });
    };

    const handleChange = (e) => {
        console.log(e.target);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className='center'>
            <form onSubmit={handleSubmit} className='form'>
                <div className='align-center'>
                    <Logo />
                    <h3>{values.isMember ? 'Register' : 'Login'}</h3>
                </div>
                <FormInputRow
                    id='name'
                    type='text'
                    labelText='Name'
                    name='name'
                    value={values.name}
                    handleChange={handleChange}
                />
                <FormInputRow
                    id='email'
                    type='email'
                    labelText='Email'
                    name='email'
                    value={values.email}
                    handleChange={handleChange}
                />
                {values.isMember && (
                    <>
                        <FormInputRow
                            id='password'
                            type='password'
                            labelText='Password'
                            name='password'
                            value={values.password}
                            handleChange={handleChange}
                        />
                        <FormInputRow
                            id='repass'
                            type='repass'
                            labelText='Repeat password'
                            name='repass'
                            value={values.repass}
                            handleChange={handleChange}
                        />
                    </>)
                }

                <div className='form-row align-center'>
                    <button className='btn btn-primary' >
                        {values.isMember ? 'Sign Up' : 'Sign In'}
                    </button>
                    <p>
                        {values.isMember ? 'Already have an account?' : 'Don\'t have an account yet?'}
                        <button
                            onClick={toggleMember}
                            className='btn btn-secondary'
                        >
                            {values.isMember ? 'Sign In' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </form>
        </section>
    );
}
export default Register;