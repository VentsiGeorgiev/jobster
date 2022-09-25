import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import styles from './SmallSidebar.module.css';
import { AiOutlineClose, AiOutlineFileSearch, AiOutlineFileAdd, AiOutlineUser } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';

function SmallSidebar() {
    const { showSidebar, toggleSidebar } = useJobsContext();

    return (
        <section className={showSidebar ? `${styles['small-sidebar']}` : `${styles['small-sidebar']} ${styles.show}`}>
            <div className={styles['sidebar-content']}>

                <div className={styles['btn-wrapper']}>
                    <button
                        onClick={toggleSidebar}
                        className={styles['btn-close']}>
                        <AiOutlineClose className={styles['close-icon']} />
                    </button>
                </div>
                <Logo />
                <nav>
                    <menu className={styles['nav-menu']}>
                        <li>
                            <NavLink to='/'><ImStatsBars /> Stats</NavLink>
                        </li>
                        <li>
                            <NavLink to='all-jobs'><AiOutlineFileSearch /> All Jobs</NavLink>
                        </li>
                        <li>
                            <NavLink to='add-job'><AiOutlineFileAdd /> Add Job</NavLink>
                        </li>
                        <li>
                            <NavLink to='profile'><AiOutlineUser /> Profile</NavLink>
                        </li>
                    </menu>
                </nav>
            </div>
        </section>
    );
}

export default SmallSidebar;