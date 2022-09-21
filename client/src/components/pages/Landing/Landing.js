import heroImage from '../../../assets/hero-illustration.png';
import styles from './Landing.module.css';

function Landing() {
    return (
        <main className='container'>
            <section className={styles['logo-wrapper']}>
                <h2 className={styles.logo}>Jobster</h2>
            </section>
            <section className={`${styles.hero}`}>
                <div>
                    <h1>Find the perfect job for you</h1>
                    <p>Search your career opportunity through 10,000+ jobs</p>
                    <button className={`btn ${styles['hero-btn']}`}>Login / Register</button>
                </div>
                <div>
                    <img src={heroImage} alt="jobster" />
                </div>
            </section>
        </main>

    );
}
export default Landing;