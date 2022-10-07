import { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/appContext';
import styles from './Profile.module.css';
import { FaUserEdit } from 'react-icons/fa';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { Alert, Job, Spinner } from '../../shared';
import { Link } from 'react-router-dom';

function Profile() {
    const { user, updateUser, isEditing, toggleEdit, isLoading: userIsLoading, isError } = useAppContext();
    const { userJobs, fetchUserJobs, isLoading, getAllAppliedJobs, appliedJobs } = useJobsContext();

    useEffect(() => {
        fetchUserJobs();
        getAllAppliedJobs();
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
            {isError && <Alert />}
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
                {userJobs.length > 0 &&
                    userJobs.map((job) => (
                        <Job key={job._id} job={job} />
                    ))
                }
            </section>
            {userJobs.length === 0 &&
                <section>
                    <h4>Add you first job offer</h4>
                    <Link className='btn btn-primary' to='/add-job'>Add Job</Link>
                </section>
            }
            <div className={styles['table-wrapper']}>
                <h5>All jobs you have applied for</h5>
                <table className={styles.table}>
                    <thead className={styles['table-header']}>
                        <tr>
                            <th>No</th>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appliedJobs.length > 0 && appliedJobs.map((job, index) => (
                            <tr key={job._id}>
                                <td>{index + 1}</td>
                                <td>{job.position}</td>
                                <td>{job.company}</td>
                                <td><Link to={`/all-jobs/${job._id}`}>Link</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Profile;