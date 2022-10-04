import { useAppContext } from '../../../context/appContext';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import styles from './Alert.module.css';

function Alert() {

    const { message, alertType } = useAppContext();
    const { message: jobMessage, alertType: jobAlertType } = useJobsContext();

    if (message) {
        return (
            <div className={`alert ${styles[alertType]}`}>
                <p className='alert-message'>{message}</p>
            </div>
        );
    }
    if (jobMessage) {
        return (
            <div className={`alert ${styles[jobAlertType]}`}>
                <p className='alert-message'>{jobMessage}</p>
            </div>
        );
    }


}

export default Alert;