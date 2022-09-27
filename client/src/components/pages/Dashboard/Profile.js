import { useAppContext } from '../../../context/appContext';
import styles from './Profile.module.css';

function Profile() {
    const { user } = useAppContext();

    return (
        <section className={styles['profile-container']}>
            <h2>{user.name}</h2>
        </section>
    );
}

export default Profile;