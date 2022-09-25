import { NavLink } from 'react-router-dom';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { AiOutlineFileSearch, AiOutlineFileAdd, AiOutlineUser } from 'react-icons/ai';
import { ImStatsBars } from 'react-icons/im';
import styles from './LargeSidebar.module.css';

function LargeSidebar() {
    const { showSidebar } = useJobsContext();

    return (
        <>
            {showSidebar &&
                <aside className={showSidebar ? `${styles['sidebar-container']}` : styles.show}>
                    <div className={styles.content}>
                        <h2>Jobster</h2>
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

                </aside>
            }
        </>
    );
}

export default LargeSidebar;