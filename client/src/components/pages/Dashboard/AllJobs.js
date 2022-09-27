import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import styles from './AllJobs.module.css';

function AllJobs() {

    const { allJobs } = useJobsContext();

    return (
        <>
            <section className={styles['all-jobs-search-container']}>
                <h3>Search</h3>
            </section>
            <section className={styles['all-jobs-container']}>
                {allJobs.map((x) => (
                    <h4>{x.company}</h4>
                ))}
            </section>
        </>

    );
}

export default AllJobs;