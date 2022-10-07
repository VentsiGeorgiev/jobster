import { useEffect } from 'react';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { Job, PageButtons, Spinner } from '../../shared';
import styles from './AllJobs.module.css';

function AllJobs() {

    const { allJobs, fetchJobs, searchCriteria, handleSearch, page, totalJobs, isLoading } = useJobsContext();
    const { type, sort, term, seniority, skills } = searchCriteria;

    useEffect(() => {

        const setTimeoutId = setTimeout(() => {
            fetchJobs({ type, sort, term, page, seniority, skills });
        }, 500);

        return () => {
            clearTimeout(setTimeoutId);
        };

    }, [type, sort, term, page, seniority, skills]);

    const handleChange = (e) => {
        const name = [e.target.name];
        const value = [e.target.value];
        handleSearch({ name, value });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className={styles['all-jobs-search-container']}>
                <h3>Search</h3>
                <form>
                    <div className='form-row'>
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
                    <div className={styles['filter-jobs']}>
                        <div className='form-row'>
                            <label className='label' htmlFor='type'>Type</label>
                            <select
                                name='type'
                                id='type'
                                value={type}
                                onChange={handleChange}
                            >
                                <option value='all'>All</option>
                                <option value='full-time'>Full-time</option>
                                <option value='part-time'>Part-time</option>
                            </select>
                        </div>
                        <div className='form-row'>
                            <label className='label' htmlFor='seniority'>Seniority</label>
                            <select
                                name='seniority'
                                id='seniority'
                                value={seniority}
                                onChange={handleChange}
                            >
                                <option value='all'>All</option>
                                <option value='intern'>Intern</option>
                                <option value='junior'>Junior</option>
                                <option value='mid-level'>Mid-Level</option>
                                <option value='senior'>Senior</option>
                                <option value='team-lead'>Team Lead</option>
                            </select>
                        </div>
                        <div className='form-row'>
                            <label className='label' htmlFor='skills'>Skills</label>
                            <select
                                name='skills'
                                id='skills'
                                value={skills}
                                onChange={handleChange}
                            >
                                <option value='all'>All</option>
                                <option value='javascript'>JavaScript</option>
                                <option value='java'>Java</option>
                                <option value='c-sharp'>C#</option>
                                <option value='python'>Python</option>
                            </select>
                        </div>
                        <div className='form-row'>
                            <label className='label' htmlFor='sort'>Sort</label>
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
                    </div>
                </form>
            </section>

            <h4>Total Jobs: {totalJobs}</h4>

            <section className={styles['all-jobs-container']}>

                {allJobs.length > 0 ? allJobs.map((job) => (
                    <Job key={job._id} job={job} />
                ))
                    : <h3>No Jobs Matching Criteria</h3>
                }
            </section>
            {allJobs.length > 0 && <PageButtons />}
        </>

    );
}

export default AllJobs;