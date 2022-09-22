function FormRow({ id, labelText, type, name, value, handleChange }) {

    return (
        <div className='form-row'>
            <label className='label' htmlFor={name}>{labelText}</label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                className='form-input'
            />
        </div>
    );
}
export default FormRow;