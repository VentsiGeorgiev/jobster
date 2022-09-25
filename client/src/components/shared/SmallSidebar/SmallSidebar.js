import { NavLink } from 'react-router-dom';
import styles from './SmallSidebar.module.css';

function SmallSidebar() {
    return (
        <section className={styles['small-sidebar']}>
            <h3>SMALL SIDEBAR</h3>
            <nav>
                <menu>
                    <li><NavLink to='add-job'>Add Job</NavLink></li>
                    <li><NavLink to='all-jobs'>All Jobs</NavLink></li>
                </menu>
            </nav>
        </section>
    );
}

export default SmallSidebar;