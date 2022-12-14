import heroImage from '../../../assets/images/hero-illustration.png';
import { Logo } from '../../shared';
import styles from './Landing.module.css';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <main className='container'>
            <Logo />
            <section className={`${styles.hero}`}>
                <div className={`${styles.info}`}>
                    <h1 data-testid="heading" >Find the perfect job for you</h1>
                    <p>Search your career opportunity through 10,000+ jobs</p>
                    <Link to='/register' className={`btn ${styles['hero-btn']} btn-primary`}>Login / Register</Link>
                </div>
                <div>
                    <img className={`img ${styles['hero-image']}`} src={heroImage} alt="jobster" />
                </div>
            </section>
        </main>

    );
}
export default Landing;