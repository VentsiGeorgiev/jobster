import styles from './LargeSidebar.module.css';

function LargeSidebar() {
    return (
        <aside className={styles['sidebar-container']}>
            <div className={styles.content}>
                <h1>Sidebar</h1>
            </div>
        </aside>
    );
}

export default LargeSidebar;