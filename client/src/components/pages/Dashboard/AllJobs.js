import { useEffect } from 'react';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { FormRow, Job } from '../../shared';
import styles from './AllJobs.module.css';

function AllJobs() {

    const { allJobs, fetchJobs } = useJobsContext();

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <>
            <section className={styles['all-jobs-search-container']}>
                <h3>Search</h3>
                <form>
                    <div>
                        <label htmlFor='type'>Type</label>
                        <select id='type'>
                            <option value='Full-time'>Full-time</option>
                            <option value='Part-time'>Part-time</option>
                            <option value='Remote'>Remote</option>
                            <option value='Internship'>Internship</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='status'>Status</label>
                        <select id='status'>
                            <option value='Interview'>Interview</option>
                            <option value='Declined'>Declined</option>
                            <option value='Pending'>Pending</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='sort'>Sort</label>
                        <select id='sort'>
                            <option value='latest'>Latest</option>
                            <option value='oldest'>Oldest</option>
                        </select>
                    </div>
                </form>
            </section>
            <section className={styles['all-jobs-container']}>
                {allJobs.map((job) => (
                    <Job key={job._id} job={job} />
                ))}
            </section>
        </>

    );
}

export default AllJobs;