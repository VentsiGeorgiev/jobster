import { Link, NavLink } from 'react-router-dom';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { AiOutlineFileSearch, AiOutlineFileAdd, AiOutlineUser } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';
import styles from './LargeSidebar.module.css';
import Logo from '../Logo/Logo';

function LargeSidebar() {
    const { showSidebar } = useJobsContext();

    return (
        <>
            {showSidebar &&
                <aside className={showSidebar ? `${styles['sidebar-container']}` : styles.show}>
                    <div className={styles.content}>
                        <div className={styles['logo-section']}>
                            <Link to='/'>
                                <Logo />
                            </Link>
                        </div>
                        <nav>
                            <menu className={styles['nav-menu']}>
                                <li>
                                    <NavLink
                                        to=''
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
                                        className={({ isActive }) =>
                                            isActive ? `${styles.activeStyle} btn-center` : 'btn-center'
                                        }
                                        to='profile'
                                    >
                                        <AiOutlineUser />
                                        Profile
                                    </NavLink>
                                </li>
                            </menu>
                        </nav>
                    </div>

                </aside>
            }
        </>
    );
}

export default LargeSidebar;