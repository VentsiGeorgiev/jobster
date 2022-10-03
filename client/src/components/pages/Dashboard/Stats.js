import javascriptImage from '../../../assets/svg/javascript.svg';
import javaImage from '../../../assets/svg/java.svg';
import cImage from '../../../assets/svg/c.svg';
import pythonImage from '../../../assets/svg/python.svg';
import styles from './Stats.module.css';
function Stats() {
    return (
        <section className={styles['all-stats-container']}>
            <h3>Total jobs: 999</h3>
            <div className={styles['stats-wrapper']}>
                <div className={styles['stats-card']}>
                    <img className='img' src={javascriptImage} alt="" />
                    <h4>Open jobs: 999</h4>
                </div>
                <div className={styles['stats-card']}>
                    <img className='img' src={javaImage} alt="" />
                    <h4>Open jobs: 999</h4>
                </div>
                <div className={styles['stats-card']}>
                    <img className='img' src={cImage} alt="" />
                    <h4>Open jobs: 999</h4>
                </div>
                <div className={styles['stats-card']}>
                    <img className='img' src={pythonImage} alt="" />
                    <h4>Open jobs: 999</h4>
                </div>
            </div>
        </section>
    );
}

export default Stats;