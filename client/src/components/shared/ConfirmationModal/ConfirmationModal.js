import ReactDOM from 'react-dom';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import styles from './ConfirmationModal.module.css';

const BackDrop = () => {
    const { toggleDeleteModal, isModalOpen, currentJob } = useJobsContext();
    const { deleteJob } = useJobsContext();
    return <section className={isModalOpen ? `${styles['modal-background']} ${styles.hide}` : ''}>
        <div className={styles['job-section']}>
            <p>Are you sure you want to delete the job position? </p>
            <div className={styles['btn-wrapper']}>
                <button
                    onClick={toggleDeleteModal}
                    className='btn'
                >
                    Cancel
                </button>
                <button
                    onClick={() => deleteJob(currentJob)}
                    className='btn btn-delete'
                >
                    Delete
                </button>
            </div>
        </div>
    </section >;
};

function ConfirmationModal() {
    return (
        <>
            {ReactDOM.createPortal(<BackDrop />, document.getElementById('overlay-root'))}
        </>
    );
}

export default ConfirmationModal;