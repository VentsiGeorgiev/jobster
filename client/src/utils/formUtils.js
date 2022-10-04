export const validateInput = (name, value, password) => {
    let hasError = false;
    let error = '';
    const NAME_INPUT_REGEX = /^[a-zA-Z ]+$/;
    const EMAIL_INPUT_REGEX = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    switch (name) {
        case 'name':
            if (value.trim() === '') {
                hasError = true;
                error = 'Name input is required';
            } else if (!NAME_INPUT_REGEX.test(value)) {
                hasError = true;
                error = 'Name cannot contain any special characters';
            } else if (value.length < 2) {
                hasError = true;
                error = 'Name must be at least 2 characters long';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'email':
            if (value.trim() === '') {
                hasError = true;
                error = 'Email input is required';
            } else if (!EMAIL_INPUT_REGEX.test(value)) {
                hasError = true;
                error = 'Invalid email';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'password':
            if (value.trim() === '') {
                hasError = true;
                error = 'Please enter your password';
            } else if (value.trim().length < 6) {
                hasError = true;
                error = 'Password must have at least 6 characters';
            } else {
                hasError = false;
                error = '';
            }
            break;
        case 'repass':
            if (value.trim() === '') {
                hasError = true;
                error = 'Please repeat your password';
            } else if (value.trim() !== password.value.trim()) {
                hasError = true;
                error = 'Password don\'t match';
            } else {
                hasError = false;
                error = '';
            }
            break;
        default:
            break;
    }

    return { hasError, error };
};
