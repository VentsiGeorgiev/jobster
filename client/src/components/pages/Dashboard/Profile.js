import { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import styles from './Profile.module.css';
import { FaUserEdit } from 'react-icons/fa';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { Alert, Job, Spinner } from '../../shared';

function Profile() {
    const { user, updateUser, isEditing, toggleEdit, isLoading: userIsLoading } = useAppContext();
    const { userJobs, fetchUserJobs, isLoading } = useJobsContext();

    useEffect(() => {
        fetchUserJobs();
    }, []);

    const [updName, setUpdName] = useState(user.name);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: updName
        };
        updateUser(data);
    };

    if (userIsLoading) {
        return <Spinner />;
    }
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
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

            <section className={styles['all-jobs-container']}>
                {userJobs.map((job) => (
                    <Job key={job._id} job={job} />
                ))}
            </section>
        </>
    );
}

export default Profile;