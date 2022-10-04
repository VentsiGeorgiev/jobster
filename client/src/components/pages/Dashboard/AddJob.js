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

    const { company, position, seniority, type, jobLocation, skills, description } = job;
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = [e.target.name];
        const value = [e.target.value];
        handleJobChange({ name, value });
    };

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(job);

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

                <FormRow
                    id='job-location'
                    type='text'
                    labelText='Job Location'
                    name='jobLocation'
                    value={jobLocation}
                    handleChange={handleChange}
                />
                <div className='form-row form-row-select'>
                    <label className='label' htmlFor='type'>Description</label>
                    <textarea
                        name='description'
                        id='description'
                        onChange={handleChange}
                        className='form-input'
                        value={description}
                    />
                </div>
                <div className={styles['wrap-inputs']}>
                    <div className='form-row form-row-select'>
                        <label className='label' htmlFor='type'>Type</label>
                        <select
                            name='type'
                            id='type'
                            value={type}
                            onChange={handleChange}
                        >

                            <option value='full-time'>Full-time</option>
                            <option value='part-time'>Part-time</option>
                        </select>
                        <IoIosArrowDropdownCircle className='dropdown-icon' />
                    </div>

                    <div className='form-row form-row-select'>
                        <label className='label' htmlFor='seniority'>Seniority</label>
                        <select
                            name='seniority'
                            id='seniority'
                            value={seniority}
                            onChange={handleChange}
                        >

                            <option value='intern'>Intern</option>
                            <option value='junior'>Junior</option>
                            <option value='mid-level'>Mid-Level</option>
                            <option value='senior'>Senior</option>
                            <option value='team-lead'>Team Lead</option>
                        </select>
                        <IoIosArrowDropdownCircle className='dropdown-icon' />
                    </div>
                    <div className='form-row form-row-select'>
                        <label className='label' htmlFor='skills'>Skills</label>
                        <select
                            name='skills'
                            id='skills'
                            value={skills}
                            onChange={handleChange}
                        >

                            <option value='javascript'>JavaScript</option>
                            <option value='java'>Java</option>
                            <option value='c-sharp'>C#</option>
                            <option value='python'>Python</option>
                        </select>
                        <IoIosArrowDropdownCircle className='dropdown-icon' />
                    </div>
                </div>


                <button className='btn btn-primary'>{isEditing ? 'Update' : 'Create'}</button>

            </form>
        </section>
    );
}

export default AddJob;