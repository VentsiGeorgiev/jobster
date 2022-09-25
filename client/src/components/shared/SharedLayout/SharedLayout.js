import { Outlet } from 'react-router-dom';
import { SmallSidebar, LargeSidebar, Navbar } from '../../shared';
import styles from './SharedLayout.module.css';

function SharedLayout() {
    return (
        <main className={styles.dashboard}>
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