import FormRow from '../../shared/FormInputRow/FormInputRow';
import styles from './AddJob.module.css';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { useAppContext } from '../../../context/appContext';
import { Alert } from '../../shared';
import { useNavigate } from 'react-router-dom';

function AddJob() {
    const { createJob, handleJobChange, job, isEditing, editJob, editJobId } = useJobsContext();
    const { displayAlert, isError } = useAppContext();

    const { company, position, status, jobType, jobLocation, } = job;
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = [e.target.name];
        const value = [e.target.value];
        handleJobChange({ name, value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const isFieldEmpty = Object.values(job).some(x => x.trim() === '');
        if (isFieldEmpty) {
            displayAlert('All Fields Are Required', 'danger');
        }
        if (isEditing) {
            editJob(editJobId, job);
        } else {
            createJob(job);

        }
        navigate('/profile');

    };

    return (
        <section className={styles['add-job-section']}>
            <h2>{isEditing ? 'Update Job Offer' : 'Create Job Offer'}</h2>

            <form onSubmit={submitHandler}>
                {isError && <Alert />}
                <FormRow
                    id='company'
                    name='company'
                    type='text'
                    labelText='Company'
                    value={company}
                    handleChange={handleChange}
                />

                <FormRow
                    id='position'
                    name='position'
                    type='text'
                    labelText='Position'
                    value={position}
                    handleChange={handleChange}
                />

                <div className='form-row form-row-select'>
                    <label className='label' htmlFor='status'>Status</label>
                    <select
                        id='status'
                        type='select'
                        name='status'
                        value={status}
                        onChange={handleChange}
                    >
                        <option value='Interview'>Interview</option>
                        <option value='Declined'>Declined</option>
                        <option value='Pending'>Pending</option>
                    </select>
                    <IoIosArrowDropdownCircle className='dropdown-icon' />
                </div>

                <div className='form-row form-row-select'>
                    <label className='label' htmlFor='job-type'>Job Type</label>
                    <select
                        id='job-type'
                        type='select'
                        name='jobType'
                        value={jobType}
                        onChange={handleChange}
                    >
                        <option value='Full-time'>Full time</option>
                        <option value='Part-time'>Part time</option>
                        <option value='Remote'>Remote</option>
                        <option value='Internship'>Internship</option>
                    </select>
                    <IoIosArrowDropdownCircle className='dropdown-icon' />
                </div>

                <FormRow
                    id='job-location'
                    type='text'
                    labelText='Job Location'
                    name='jobLocation'
                    value={jobLocation}
                    handleChange={handleChange}
                />

                <button className='btn btn-primary'>{isEditing ? 'Update' : 'Create'}</button>

            </form>
        </section>
    );
}

export default AddJob;