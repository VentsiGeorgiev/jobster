import styles from './Job.module.css';
import { BiBriefcase, BiCalendar, BiCurrentLocation } from 'react-icons/bi';

function Job({ job }) {

    return (
        <article className={styles['job-section']}>
            <header className={styles['header']}>
                <h3 className={styles['header-job-position']}>
                    <span className={styles['title']}>Job position:</span>  {job.position}
                </h3>
                <h4 className={styles['header-job-company']}><span className={styles['title']}>Company:</span> {job.company}</h4>

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
                        {job.jobType}
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
                <button className='btn btn-edit'>Edit</button>
                <button className='btn btn-delete'>Delete</button>
            </footer>
        </article>
    );
}

export default Job;