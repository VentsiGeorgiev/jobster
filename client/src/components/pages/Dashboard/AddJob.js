import FormRow from '../../shared/FormInputRow/FormInputRow';
import styles from './AddJob.module.css';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { useState } from 'react';

function AddJob() {

    const initialState = {
        company: '',
        position: '',
        status: 'Interview',
        jobType: 'Full-Time',
        jobLocation: 'sdf1',
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
        console.log(formData);
    };

    return (
        <section className={styles['add-job-section']}>
            <h2>Create Job Offer</h2>

            <form onSubmit={submitHandler}>
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
                        <option value='interview'>Interview</option>
                        <option value='declined'>Declined</option>
                        <option value='pending'>Pending</option>
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
                        <option value='full-time'>Full Time</option>
                        <option value='part-time'>Part Time</option>
                        <option value='remote'>Remote</option>
                        <option value='internship'>Internship</option>
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