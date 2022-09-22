import { useAppContext } from '../../../context/appContext';
import styles from './Alert.module.css';

function Alert() {

    const { message, alertType } = useAppContext();

    return (
        <div className={`alert ${styles[alertType]}`}>
            <p className='alert-message'>{message}</p>
        </div>
    );
}

export default Alert;