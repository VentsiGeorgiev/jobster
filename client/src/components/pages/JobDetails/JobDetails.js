import { useEffect, } from 'react';
import { useParams } from 'react-router-dom';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { FaRegPaperPlane } from 'react-icons/fa';
import styles from './JobDetails.module.css';
import { Alert, Spinner } from '../../shared';

function JobDetails() {

    const { getCurrentJob, currentJob, isLoading, applyForJob, showAlert, hasApplied, isOwner } = useJobsContext();
    const { company, position, type, skills, description, jobLocation, seniority, candidates } = currentJob;
    const { id } = useParams();

    useEffect(() => {
        getCurrentJob(id);
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            {showAlert && <Alert />}

            <section className={styles['job-details-container']}>
                <div>
                    <h4><span className={styles['title']}>position: </span>{position}</h4>
                </div>
                <p><span className={styles['title']}>location: </span>{jobLocation}</p>
                <h4><span className={styles['title']}>skills: </span> {skills}</h4>
                <h4><span className={styles['title']}>description: </span></h4>
                <p>{description}</p>
                <p className={styles['title']}>{type}</p>
                <p><span className={styles['title']}>company: </span> {company}</p>
                {!isOwner &&
                    <button
                        disabled={hasApplied}
                        onClick={() => applyForJob(id)}
                        className='btn btn-primary btn-center'
                    >
                        <FaRegPaperPlane className={styles['apply-icon']} />
                        Apply
                    </button>}

            </section>
        </>
    );
}

export default JobDetails;