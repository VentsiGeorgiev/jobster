import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import styles from './LargeSidebar.module.css';

function LargeSidebar() {
    const { showSidebar } = useJobsContext();

    return (
        <>
            {showSidebar &&
                <aside className={showSidebar ? `${styles['sidebar-container']}` : styles.show}>
                    <div className={styles.content}>
                        <h1>Sidebar</h1>
                    </div>
                </aside>
            }
        </>
    );
}

export default LargeSidebar;