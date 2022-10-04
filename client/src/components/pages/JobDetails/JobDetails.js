import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { FaRegPaperPlane } from 'react-icons/fa';
import styles from './JobDetails.module.css';
import { Spinner } from '../../shared';

function JobDetails() {

    const { getCurrentJob, currentJob, isLoading } = useJobsContext();
    const { company, position, type, skills, description, jobLocation } = currentJob;
    const { id } = useParams();

    useEffect(() => {
        getCurrentJob(id);
    }, []);


    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className={styles['job-details-container']}>
                <h3>{position}</h3>
                <p>{jobLocation}</p>
            </section>
            <section className={styles['job-details-container']}>
                <h4>Skills: {skills}</h4>
                <h4>Description:</h4>
                <p>{description}</p>
                <p>{type}</p>
                <p>Company: {company}</p>
            </section>
        </>
    );
}

export default JobDetails;