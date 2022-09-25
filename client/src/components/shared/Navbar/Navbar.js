import { useAppContext } from '../../../context/appContext';
import styles from './Navbar.module.css';
import { AiOutlineMenuFold, AiOutlineLogout } from 'react-icons/ai';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { useEffect } from 'react';

function Navbar() {
    const { user } = useAppContext();
    const { toggleSidebar } = useJobsContext();

    useEffect(() => {
        if (toggleSidebar) {

        }
    }, []);

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

            <div>
                <h2 className={styles['nav-text']}>Welcome to Jobster, {user.name}!</h2>
            </div>
            <div>
                <button className={styles['nav-btn']}>
                    Logout
                    <AiOutlineLogout className={styles['nav-icon']} />
                </button>
            </div>

        </section>
    );
}

export default Navbar;