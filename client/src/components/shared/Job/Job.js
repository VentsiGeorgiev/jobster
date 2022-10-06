import styles from './Job.module.css';
import { BiBriefcase, BiCalendar, BiCurrentLocation } from 'react-icons/bi';
import { useAppContext } from '../../../context/appContext';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

function Job({ job }) {

    const { user } = useAppContext();
    const { loadJob, isModalOpen, toggleDeleteModal } = useJobsContext();
    const isOwner = job.createdBy === user._id;
    const navigate = useNavigate();
    const editHandler = (id) => {
        navigate('/add-job');
        loadJob(id);
    };

    return (

        <article className={styles['job-section']}>
            {isModalOpen && <ConfirmationModal />}
            <header className={styles['header']}>
                <h3 className={styles['header-job-position']}>
                    <span className={styles['title']}>Job position:</span>  {job.position}
                </h3>
                <h4 className={styles['header-job-company']}><span className={styles['title']}>Company:</span> {job.company}</h4>
                <h4 className={styles['header-job-company']}>
                    <span className={styles['title']}>
                        Skills:
                    </span>
                    {job.skills === 'c-sharp' ? `${job.skills.split('-')[0]}#` : `${job.skills}`}
                </h4>
                <h4 className={styles['header-job-company']}><span className={styles['title']}>Level:</span> {job.seniority}</h4>

            </header>
            <main className={styles['job-content']}>
                <div className={styles['job-row']}>
                    <p>
                        <span className={styles['title']}>
                            <BiCurrentLocation className={styles['job-icon']} />
                            Location:
                        </span>
                        {job.jobLocation}

                    </p>
                </div>
                <div className={styles['job-row']}>
                    <p>
                        <span className={styles['title']}>
                            <BiBriefcase className={styles['job-icon']} />
                            Type:
                        </span>
                        {job.type}
                    </p>
                </div>
                <div className={styles['job-row']}>
                    <p>
                        <span className={styles['title']}>
                            <BiCalendar className={styles['job-icon']} />
                            Date:
                        </span>
                        {job.createdAt.split('T')[0]
                        }
                    </p>
                </div>

            </main>

            <footer className={styles.footer}>
                {isOwner
                    ?
                    <>
                        <Link
                            to={`/all-jobs/${job._id}`}
                            className='btn btn-primary'>View
                        </Link>
                        <button
                            onClick={() => editHandler(job._id)}
                            className='btn btn-edit'
                        >
                            Edit</button>
                        <button
                            onClick={() => toggleDeleteModal(job._id)}
                            className='btn btn-delete'
                        >
                            Delete
                        </button>
                        {/* <button
                            onClick={() => deleteJob(job._id)}
                            className='btn btn-delete'
                        >
                            Delete
                        </button> */}
                    </>
                    :
                    <>
                        <Link
                            to={job._id}
                            className='btn btn-primary'>Read More</Link>
                    </>
                }
            </footer>

        </article>

    );
}

export default Job;