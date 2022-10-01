import { useEffect } from 'react';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { Job, PageButtons } from '../../shared';
import styles from './AllJobs.module.css';

function AllJobs() {

    const { allJobs, fetchJobs, searchCriteria, handleSearch, page } = useJobsContext();
    const { type, status, sort, term } = searchCriteria;

    useEffect(() => {

        const setTimeoutId = setTimeout(() => {
            fetchJobs({ type, status, sort, term, page });
        }, 500);

        return () => {
            clearTimeout(setTimeoutId);
        };

    }, [type, status, sort, term, page]);

    const handleChange = (e) => {
        const name = [e.target.name];
        const value = [e.target.value];
        handleSearch({ name, value });
    };

    return (
        <>
            <section className={styles['all-jobs-search-container']}>
                <h3>Search</h3>
                <form>
                    <div>
                        <label className='label' htmlFor='search'>Search Position</label>
                        <input
                            id='search'
                            name='term'
                            type='text'
                            value={term}
                            onChange={handleChange}
                            className='form-input'
                        />
                    </div>
                    <div>
                        <label htmlFor='type'>Type</label>
                        <select
                            name='type'
                            id='type'
                            value={type}
                            onChange={handleChange}
                        >
                            <option value='all'>all</option>
                            <option value='Full-time'>Full-time</option>
                            <option value='Part-time'>Part-time</option>
                            <option value='Remote'>Remote</option>
                            <option value='Internship'>Internship</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='status'>Status</label>
                        <select
                            name='status'
                            id='status'
                            value={status}
                            onChange={handleChange}
                        >
                            <option value='all'>all</option>
                            <option value='Interview'>Interview</option>
                            <option value='Declined'>Declined</option>
                            <option value='Pending'>Pending</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='sort'>Sort</label>
                        <select
                            id='sort'
                            name='sort'
                            value={sort}
                            onChange={handleChange}
                        >
                            <option value='latest'>Latest</option>
                            <option value='oldest'>Oldest</option>
                        </select>
                    </div>
                </form>
            </section>
            <section className={styles['all-jobs-container']}>

                {allJobs.length > 0 ? allJobs.map((job) => (
                    <Job key={job._id} job={job} />
                ))
                    : <h3>No Jobs Matching Criteria</h3>
                }
            </section>
            <PageButtons />
        </>

    );
}

export default AllJobs;