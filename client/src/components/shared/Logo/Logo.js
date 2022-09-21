import logo from '../../../assets/images/jobster-logo.png';
import styles from './Logo.module.css';

function Logo() {
    return (
        <section className={styles['logo-wrapper']}>
            <img className={`img ${styles['logo-img']}`} src={logo} alt="jobster logo" />
        </section>
    );
}
export default Logo;