import FormRow from '../../shared/FormInputRow/FormInputRow';
import styles from './AddJob.module.css';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useState } from 'react';
import { useJobsContext } from '../../../context/jobsContext/jobsContext';
import { useAppContext } from '../../../context/appContext';
import { Alert } from '../../shared';

function AddJob() {
    const { createJob } = useJobsContext();
    const { displayAlert, isError } = useAppContext();
    const initialState = {
        company: '',
        position: '',
        status: 'Interview',
        jobType: 'Full-time',
        jobLocation: '',
    };
    const [formData, setFormData] = useState(initialState);
    const { company, position, status, jobType, jobLocation } = formData;


    const handleChange = (e) => {
        setFormData(() => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = (e) => {
        e.preventDefault();

        const isFieldEmpty = Object.values(formData).some(x => x.trim() === '');
        if (isFieldEmpty) {
            displayAlert('All Fields Are Required', 'danger');
        }

        createJob(formData);
        console.log(formData);

    };

    return (
        <section className={styles['add-job-section']}>
            <h2>Create Job Offer</h2>

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

                <button className='btn btn-primary'>Create</button>

            </form>
        </section>
    );
}

export default AddJob;