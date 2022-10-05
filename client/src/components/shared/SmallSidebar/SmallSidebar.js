import { Link, NavLink } from 'react-router-dom';
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
                <div className={styles['logo-section']}>
                    <Link to='/' onClick={toggleSidebar}>
                        <Logo />
                    </Link>
                </div>
                <nav>
                    <menu className={styles['nav-menu']}>
                        <li>
                            <NavLink
                                onClick={toggleSidebar}
                                to='/'
                                end
                                className={({ isActive }) =>
                                    isActive ? `${styles.activeStyle} btn-center` : 'btn-center'
                                }
                            >
                                <ImStatsBars />
                                Stats
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebar}
                                to='all-jobs'
                                className={({ isActive }) =>
                                    isActive ? `${styles.activeStyle} btn-center` : 'btn-center'
                                }
                            >
                                <AiOutlineFileSearch />
                                All Jobs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebar}
                                to='add-job'
                                className={({ isActive }) =>
                                    isActive ? `${styles.activeStyle} btn-center` : 'btn-center'
                                }
                            >
                                <AiOutlineFileAdd />
                                Add Job
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={toggleSidebar}
                                to='profile'
                                className={({ isActive }) =>
                                    isActive ? `${styles.activeStyle} btn-center` : 'btn-center'
                                }
                            >
                                <AiOutlineUser />
                                Profile
                            </NavLink>
                        </li>
                    </menu>
                </nav>
            </div>
        </section>
    );
}

export default SmallSidebar;