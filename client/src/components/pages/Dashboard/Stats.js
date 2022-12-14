import javascriptImage from '../../../assets/svg/javascript.svg';
import javaImage from '../../../assets/svg/java.svg';
import cImage from '../../../assets/svg/csharp.svg';
import pythonImage from '../../../assets/svg/python.svg';
import styles from './Stats.module.css';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { useEffect } from 'react';
import { Spinner } from '../../shared';
import { Link } from 'react-router-dom';

function Stats() {

    const { fetchStatsJobs, jobStats, isLoading } = useJobsContext();

    useEffect(() => {
        fetchStatsJobs();
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className={styles['all-stats-container']}>
                <h3>Total jobs: {jobStats.totalJobs}</h3>
                <div className={styles['stats-wrapper']}>
                    <div className={styles['stats-card']}>
                        <img className='img' src={javascriptImage} alt="" />
                        <h4>Open jobs: {jobStats.jsTotalJobs}</h4>
                    </div>
                    <div className={styles['stats-card']}>
                        <img className='img' src={javaImage} alt="" />
                        <h4>Open jobs: {jobStats.javaTotalJobs}</h4>
                    </div>
                    <div className={styles['stats-card']}>
                        <img className='img' src={cImage} alt="" />
                        <h4>Open jobs: {jobStats.cSharpTotalJobs}</h4>
                    </div>
                    <div className={styles['stats-card']}>
                        <img className='img' src={pythonImage} alt="" />
                        <h4>Open jobs: {jobStats.pythonTotalJobs}</h4>
                    </div>
                </div>
            </section>
            <section className={styles['all-stats-container']}>
                {jobStats.myJobs
                    ? <h3>Your Jobs: {jobStats.myJobs}</h3>
                    : <>
                        <h4>Add you first job offer</h4>
                        <Link className='btn btn-primary' to='/add-job'>Add Job</Link>
                    </>
                }

            </section>
        </>
    );
}

export default Stats;