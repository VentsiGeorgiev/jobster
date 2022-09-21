import { Link } from 'react-router-dom';
import notFoundImage from '../../../assets/svg/page-not-found.svg';
import styles from './NotFound.module.css';

function NotFound() {
    return (
        <section className='container'>
            <div className={styles['not-found']}>
                <div className={styles.image}>
                    <img className='img' src={notFoundImage} alt="404" />
                </div>
                <h1>Ohh! Page Not Found</h1>
                <p>We can't seem to find the page you're looking for</p>
                <Link className='btn' to='/'>Back Home</Link>
            </div>
        </section>
    );
}
export default NotFound;