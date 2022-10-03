export const validateInput = (name, value) => {
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
        default:
            break;
    }

    return { hasError, error };
};
