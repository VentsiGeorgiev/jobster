import { useAppContext } from '../../../context/appContext';
import styles from './Navbar.module.css';
import { AiOutlineMenuFold, AiOutlineLogout } from 'react-icons/ai';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import Logo from '../Logo/Logo';

function Navbar() {
    const { user, logout } = useAppContext();
    const { toggleSidebar } = useJobsContext();


    return (
        <section className={styles['nav-center']}>
            <div>
                <button
                    className={styles['nav-btn']}
                    onClick={toggleSidebar}
                >
                    <AiOutlineMenuFold className={styles['nav-icon']} />
                </button>
            </div>

            <div className={styles['nav-logo']}>
                <Logo />
            </div>
            <div className={styles['nav-text-wrapper']}>
                <h2 className={styles['nav-text']}>Welcome to Jobster, {user.name}!</h2>
            </div>
            <div>
                <button
                    onClick={logout}
                    className={styles['nav-btn']}>
                    Logout
                    <AiOutlineLogout className={styles['nav-icon']} />
                </button>
            </div>

        </section>
    );
}

export default Navbar;