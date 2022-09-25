import { Outlet } from 'react-router-dom';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { SmallSidebar, LargeSidebar, Navbar } from '../../shared';
import styles from './SharedLayout.module.css';

function SharedLayout() {

    const { showSidebar } = useJobsContext();

    return (
        <main className={showSidebar ? `${styles.dashboard}` : styles['full-dashboard']}   >
            <SmallSidebar />
            <LargeSidebar />
            <div>
                <Navbar />
                <div className={styles['dashboard-page']}>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}

export default SharedLayout;