import heroImage from '../../../assets/images/hero-illustration.png';
import { Logo } from '../../shared';
import styles from './Landing.module.css';

function Landing() {
    return (
        <main className='container'>
            <Logo />
            <section className={`${styles.hero}`}>
                <div className={`${styles.info}`}>
                    <h1>Find the perfect job for you</h1>
                    <p>Search your career opportunity through 10,000+ jobs</p>
                    <button className={`btn ${styles['hero-btn']}`}>Login / Register</button>
                </div>
                <div>
                    <img className={`img ${styles['hero-image']}`} src={heroImage} alt="jobster" />
                </div>
            </section>
        </main>

    );
}
export default Landing;