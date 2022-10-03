import javascriptImage from '../../../assets/svg/javascript.svg';
import javaImage from '../../../assets/svg/java.svg';
import cImage from '../../../assets/svg/c.svg';
import pythonImage from '../../../assets/svg/python.svg';
import styles from './Stats.module.css';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { useEffect } from 'react';

function Stats() {

    const { fetchStatsJobs, jobStats } = useJobsContext();

    useEffect(() => {
        fetchStatsJobs();
    }, []);

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
        </>
    );
}

export default Stats;