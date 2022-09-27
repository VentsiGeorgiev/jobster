import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { Job } from '../../shared';
import styles from './AllJobs.module.css';

function AllJobs() {

    const { allJobs } = useJobsContext();

    return (
        <>
            <section className={styles['all-jobs-search-container']}>
                <h3>Search</h3>
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