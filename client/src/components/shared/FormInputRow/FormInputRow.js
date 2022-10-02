function FormRow({ id, labelText, type, name, value, handleChange, handleBlur }) {

    return (
        <div className='form-row'>
            <label className='label' htmlFor={name}>{labelText}</label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className='form-input'
            />
        </div>
    );
}
export default FormRow;