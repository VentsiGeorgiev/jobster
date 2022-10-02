export const validateInput = (name, value) => {
    let hasError = false;
    let error = '';
    switch (name) {
        case 'name':
            if (value.trim() === '') {
                hasError = true;
                error = 'Name input is required';
            } else if (value.length < 3) {
                hasError = true;
                error = 'Name must be at least 3 characters long';
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
