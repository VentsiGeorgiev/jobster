import { useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import styles from './Profile.module.css';
import { FaUserEdit } from 'react-icons/fa';

function Profile() {
    const { user, updateUser, isEditing, toggleEdit } = useAppContext();

    const [updName, setUpdName] = useState(user.name);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: updName
        };
        updateUser(data);
    };

    return (
        <section className={styles['profile-container']}>
            <h4>{user.name}</h4>
            <div>
                <span>Edit username </span>
                <button
                    className='btn btn-primary'
                    onClick={toggleEdit}
                >
                    <FaUserEdit />
                </button>
            </div>
            {isEditing && <form onSubmit={submitHandler}>
                <div className='form-row'>
                    <input
                        className='form-input'
                        type='text'
                        value={updName}
                        onChange={(e) => setUpdName(e.target.value)}
                    />
                </div>
                <button className='btn btn-primary'>Save</button>
            </form>}
        </section>
    );
}

export default Profile;